"use client";
import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

const PersonalInfoStep = ({
  formData,
  handleChange,
  handleSkillChange,
  addSkill,
  removeSkill,
  setStep,
}) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(180);
  const [isResending, setIsResending] = useState(false);

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Portuguese",
    "Russian",
  ];

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.location?.country) {
      setStates(State.getStatesOfCountry(formData.location.country));
    }
  }, [formData.location?.country]);

  useEffect(() => {
    if (formData.location?.country && formData.location?.state) {
      setCities(
        City.getCitiesOfState(
          formData.location.country,
          formData.location.state
        )
      );
    }
  }, [formData.location?.country, formData.location?.state]);

  useEffect(() => {
    let timer;
    if (currentForm === 2 && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [currentForm, otpTimer]);

  const validateBasicInfo = () => {
    const newErrors = {};
    if (!formData.fullName?.trim())
      newErrors.fullName = "Full Name is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async (email) => {
    const response = await fetch("https://nghr.onrender.com/user/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_id: email }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to send OTP");
    }
    return response.json();
  };

  const submitBasicInfo = async () => {
    if (!validateBasicInfo()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const registerResponse = await fetch(
        "https://nghr.onrender.com/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      if (!registerResponse.ok) {
        const data = await registerResponse.json();
        throw new Error(data.message || "Registration failed");
      }

      setCurrentForm(2);
      setOtpTimer(180);

      // Send OTP in background
      sendOtp(formData.email).catch((error) => {
        setApiError("Failed to send OTP. Click resend to try again.");
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const verifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setApiError("Please enter complete OTP");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch(
        "https://nghr.onrender.com/user/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_id: formData.email,
            otp: otpValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      localStorage.setItem("token", data.user.token);
      setCurrentForm(3);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (otpTimer > 0) return;

    setIsResending(true);
    setApiError(null);

    try {
      await sendOtp(formData.email);
      setOtpTimer(180);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      setApiError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleLocationChange = (field, value) => {
    handleChange({
      target: {
        name: field,
        value: value,
      },
    });
  };

  const validateAdditionalInfo = () => {
    const newErrors = {};
    if (!formData.bio?.trim()) newErrors.bio = "Bio is required";
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
      }
    }
    if (!formData.language) newErrors.language = "Language is required";
    if (!formData.key_skills?.length || !formData.key_skills[0].name) {
      newErrors.key_skills = "At least one skill is required";
    }
    if (!formData.location?.country) newErrors.country = "Country is required";
    if (!formData.location?.state) newErrors.state = "State is required";
    if (!formData.location?.city) newErrors.city = "City is required";
    if (!formData.location?.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (
      !/^\d{6}$/.test(
        formData.location.pincode.toString().replace(/[^0-9]/g, "")
      )
    ) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitAdditionalInfo = async (token) => {
    if (!validateAdditionalInfo()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("https://nghr.onrender.com/user/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: formData.bio?.trim(),
          key_skills: formData.key_skills.map((skill) => ({
            name: skill.name.trim(),
            level: parseInt(skill.level),
          })),
          location: {
            country: formData.location?.country?.trim(),
            state: formData.location?.state?.trim(),
            city: formData.location?.city?.trim(),
            pincode: parseInt(formData.location?.pincode || "0"),
          },
          dob: formData.dob,
          language: formData.language?.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      setStep(2);
    } catch (error) {
      setApiError(
        error.message || "Failed to submit details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentForm === 1) {
      submitBasicInfo();
    } else if (currentForm === 2) {
      verifyOtp();
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        setApiError("Session expired. Please start over.");
        setCurrentForm(1);
        return;
      }
      submitAdditionalInfo(token);
    }
  };

  const FormHeader = () => (
    <div className="mb-6">
      <p className="text-gray-600 mb-2">Step 1 out of 5</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Enter a few details to get started
      </h2>
      <p className="text-gray-600">
        Fill in the details to create your account
      </p>
    </div>
  );

  const ErrorMessage = ({ error }) =>
    error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null;

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderBasicInfoForm = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.fullName} />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Email Id <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.email} />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.phone} />
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="w-full py-3 px-4 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Processing...
            </>
          ) : (
            "Next"
          )}
        </button>
      </form>
    </>
  );

  const renderOtpVerification = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Enter 6 digit NGHR OTP sent on {formData.email}
          </h3>
          <div className="flex gap-2 justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {otpTimer > 0 ? (
                <span>
                  Resend OTP in {Math.floor(otpTimer / 60)}:
                  {String(otpTimer % 60).padStart(2, "0")}
                </span>
              ) : (
                <button
                  onClick={resendOtp}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={verifyOtp}
          disabled={isSubmitting || otp.join("").length !== 6}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>
      </div>
    </>
  );

  const renderAdditionalInfoForm = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-gray-700 mb-2">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.bio ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-32`}
          />
          <ErrorMessage error={errors.bio} />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.dob} />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Primary Language <span className="text-red-500">*</span>
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.language ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          >
            <option value="">Select Language</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <ErrorMessage error={errors.language} />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Key Skills <span className="text-red-500">*</span>
          </label>
          {formData.key_skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Skill"
                value={skill.name}
                onChange={(e) =>
                  handleSkillChange(index, "name", e.target.value)
                }
                className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <input
                type="range"
                min="1"
                max="10"
                value={skill.level}
                onChange={(e) =>
                  handleSkillChange(index, "level", e.target.value)
                }
                className="w-full"
              />
              <span>{skill.level}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>
          ))}
          <ErrorMessage error={errors.key_skills} />
          <button
            type="button"
            onClick={addSkill}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Add Skill
          </button>
        </div>

        <div className="location-fields space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.location?.country || ""}
              onChange={(e) => handleLocationChange("country", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.country} />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.location?.state || ""}
              onChange={(e) => handleLocationChange("state", e.target.value)}
              disabled={!formData.location?.country}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.state} />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={formData.location?.city || ""}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              disabled={!formData.location?.state}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.city} />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.location?.pincode || ""}
              onChange={(e) => handleLocationChange("pincode", e.target.value)}
              placeholder="Enter pincode"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            />
            <ErrorMessage error={errors.pincode} />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentForm(1)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
            className="flex-1 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Saving...
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </form>
    </>
  );

  return (
    <div className="max-w-md">
      {currentForm === 1 && renderBasicInfoForm()}
      {currentForm === 2 && renderOtpVerification()}
      {currentForm === 3 && renderAdditionalInfoForm()}
    </div>
  );
};

export default PersonalInfoStep;
