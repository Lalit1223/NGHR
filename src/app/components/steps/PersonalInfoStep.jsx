import React, { useState, useEffect } from "react";

import { Country, State, City } from "country-state-city";

const PersonalInfoStep = ({ formData, handleChange, setStep }) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Russian",
    "Korean",
    "Italian",
  ];

  useEffect(() => {
    // Load all countries on component mount
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    // Load states when country changes
    if (formData.country) {
      setStates(State.getStatesOfCountry(formData.country));
      // Reset state and city when country changes
      if (formData.state) {
        handleChange({ target: { name: "state", value: "" } });
      }
    } else {
      setStates([]);
    }
  }, [formData.country]);

  useEffect(() => {
    // Load cities when state changes
    if (formData.country && formData.state) {
      setCities(City.getCitiesOfState(formData.country, formData.state));
      // Reset city when state changes
      if (formData.city) {
        handleChange({ target: { name: "city", value: "" } });
      }
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);
  // Form Header Component
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

  // Validation function for first form
  const validateBasicInfo = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation function for second form
  const validateAdditionalInfo = () => {
    const newErrors = {};

    if (!formData.bio?.trim()) {
      newErrors.bio = "Bio is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      // Calculate age
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old";
      }
    }

    if (!formData.language) {
      newErrors.language = "Language is required";
    }
    if (!formData.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.state?.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode?.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/[^0-9]/g, ""))) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentForm === 1) {
      if (validateBasicInfo()) {
        setCurrentForm(2);
      }
    } else {
      if (validateAdditionalInfo()) {
        setStep(2);
      }
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) =>
    error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null;

  // Basic Info Form (Form 1)
  const renderBasicInfoForm = () => (
    <>
      <FormHeader />
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
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="w-full py-3 px-4 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Next
        </button>
      </form>
    </>
  );

  // Additional Info Form (Form 2)
  const renderAdditionalInfoForm = () => (
    <>
      <FormHeader />
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
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.dateOfBirth} />
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
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
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
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.country}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.state ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              !formData.country ? "bg-gray-100" : ""
            }`}
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
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              !formData.state ? "bg-gray-100" : ""
            }`}
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
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
          <ErrorMessage error={errors.pincode} />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setCurrentForm(1);
              setErrors({});
            }}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
            className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );

  return (
    <div className="max-w-md">
      {currentForm === 1 ? renderBasicInfoForm() : renderAdditionalInfoForm()}
    </div>
  );
};

export default PersonalInfoStep;
