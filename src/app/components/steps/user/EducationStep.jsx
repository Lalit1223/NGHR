"use client";
import React, { useState } from "react";

const EducationStep = ({ education, handleEducationChange, setStep }) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Shared data for dropdowns and options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const streams = ["Science", "Commerce", "Arts"];
  const courseTypes = ["Full Time", "Part Time", "Distance"];
  const gradingSystems = ["Scale 10", "Scale 4", "% out of 100", "Pass"];
  const qualifications = [
    "Doctorate/PhD",
    "Masters/ Post-Graduation",
    "Graduation/ Diploma",
    "12th",
    "ITI",
  ];
  const specializations = ["BTech", "BE", "BSc", "BCA", "Other"];

  // Date validation helpers
  const getAvailableEndYears = (startYear) => {
    if (!startYear) return years;
    const startYearNum = parseInt(startYear);
    return years.filter((year) => year >= startYearNum);
  };

  const getAvailableEndMonths = (startMonth, startYear, endYear) => {
    if (!startMonth || !startYear || !endYear) return months;
    if (startYear === endYear) {
      return months.slice(months.indexOf(startMonth));
    }
    return months;
  };

  const isValidDateRange = (startMonth, startYear, endMonth, endYear) => {
    if (!startMonth || !startYear || !endMonth || !endYear) return false;

    const start = new Date(startYear, months.indexOf(startMonth));
    const end = new Date(endYear, months.indexOf(endMonth));
    return end >= start;
  };

  // Components
  const FormHeader = () => (
    <div className="mb-8">
      <p className="text-[#004D6D] font-medium mb-4">Step 4 out of 5</p>
      <h2 className="text-2xl font-bold text-[#004D6D] mb-2">
        Fill in the Details to help us build your profile
      </h2>
      <p className="text-gray-600">Fill up Educational details</p>
    </div>
  );

  const handleQualificationSubmit = async () => {
    if (!education.qualification) {
      setApiError("Please select your highest qualification");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "https://nghr.onrender.com/user/higher-qualifications",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            highestQualification: education.qualification,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit qualification");
      }

      setCurrentForm(2);
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message || "Failed to submit qualification");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm1 = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <div className="mb-6">
        <label className="block mb-2">
          Highest qualification/ Degree currently pursuing{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {qualifications.map((qual) => (
            <button
              type="button"
              key={qual}
              className={`p-3 border rounded-lg hover:bg-teal-50 transition-colors ${
                education.qualification === qual
                  ? "border-teal-600 bg-teal-50"
                  : "border-gray-300"
              }`}
              onClick={() => handleEducationChange({ qualification: qual })}
              disabled={isSubmitting}
            >
              {qual}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleQualificationSubmit}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1 disabled:opacity-50 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
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
              Submitting...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </>
  );
  const handleClass10Submit = async () => {
    if (!education.classX) {
      setApiError("Please enter your Class X percentage");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("https://nghr.onrender.com/user/class-10", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          percentage_10th: education.classX,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit Class X details");
      }

      setCurrentForm(3);
    } catch (error) {
      setApiError(error.message || "Failed to submit Class X details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm2 = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <div className="mb-6">
        <label className="block mb-2">
          Add class X percentage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Percentage Scored/ CGPA"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
          value={education.classX}
          onChange={(e) => handleEducationChange({ classX: e.target.value })}
          disabled={isSubmitting}
        />
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
          onClick={handleClass10Submit}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1 disabled:opacity-50 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
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
              Submitting...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </>
  );

  const handleClass12Submit = async () => {
    if (!education.stream) {
      setApiError("Please select a stream");
      return;
    }
    if (!education.classXII) {
      setApiError("Please enter your Class XII percentage");
      return;
    }
    if (education.stream === "Other" && !education.otherStream) {
      setApiError("Please specify your stream");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("https://nghr.onrender.com/user/class-12", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stream: education.stream === "Other" ? "Other" : education.stream,
          other_stream:
            education.stream === "Other" ? education.otherStream : "N/A",
          percentage_12th: education.classXII,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit Class XII details");
      }

      setCurrentForm(4);
    } catch (error) {
      setApiError(error.message || "Failed to submit Class XII details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm3 = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <label className="block mb-2">
            Select stream <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[...streams, "Other"].map((stream) => (
              <button
                key={stream}
                type="button"
                className={`p-3 border rounded-lg hover:bg-teal-50 transition-colors ${
                  education.stream === stream
                    ? "border-[#004D6D] bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  handleEducationChange({
                    stream,
                    ...(stream !== "Other" && { otherStream: "" }),
                  })
                }
                disabled={isSubmitting}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {education.stream === "Other" && (
          <div>
            <label className="block mb-2">
              Specify your stream <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your stream"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
              value={education.otherStream || ""}
              onChange={(e) =>
                handleEducationChange({ otherStream: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>
        )}

        <div>
          <label className="block mb-2">
            Add class XII percentage <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Percentage Scored/ CGPA"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            value={education.classXII}
            onChange={(e) =>
              handleEducationChange({ classXII: e.target.value })
            }
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <button
          type="button"
          onClick={() => setCurrentForm(2)}
          className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleClass12Submit}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1 disabled:opacity-50 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
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
              Submitting...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </>
  );
  const handleGraduationSubmit = async () => {
    // Validate all required fields
    if (!education.specialization) {
      setApiError("Please select your graduation specialization");
      return;
    }

    if (
      !education.graduationScaling ||
      !education.graduationMarks ||
      !education.graduationCourseType
    ) {
      setApiError("Please fill all graduation details");
      return;
    }

    // Validate marks based on scaling system
    if (
      education.graduationScaling === "CGPA" &&
      parseFloat(education.graduationMarks) > 10
    ) {
      setApiError("CGPA cannot be greater than 10");
      return;
    }

    if (
      education.graduationScaling === "Percentage" &&
      parseFloat(education.graduationMarks) > 100
    ) {
      setApiError("Percentage cannot be greater than 100");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        "https://nghr.onrender.com/user/graduation",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            graduation: education.specialization,
            graduationScaling: education.graduationScaling,
            graduationMarks: education.graduationMarks,
            graduationCourseType: education.graduationCourseType,
            masters: education.higherDegree || "N/A",
            mastersScaling: education.mastersScaling || "N/A",
            mastersMarks: education.mastersMarks || "N/A",
            mastersCourseType: education.mastersCourseType || "N/A",
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit graduation details");
      }

      setCurrentForm(5);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm4 = () => {
    const scalingOptions = ["CGPA", "Percentage", "Grade"];
    const courseTypes = ["Full-time", "Part-time", "Distance Learning"];

    return (
      <>
        <FormHeader />
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{apiError}</p>
          </div>
        )}
        <div className="space-y-6">
          {/* Graduation Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Graduation Details
            </h3>

            <div>
              <label className="block mb-2">
                Specialization in graduation/diploma{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.specialization || ""}
                onChange={(e) =>
                  handleEducationChange({ specialization: e.target.value })
                }
                disabled={isSubmitting}
              >
                <option value="">e.g. BTech</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Scaling System <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.graduationScaling || ""}
                onChange={(e) =>
                  handleEducationChange({
                    graduationScaling: e.target.value,
                    graduationMarks: "", // Clear marks when scaling changes
                  })
                }
                disabled={isSubmitting}
              >
                <option value="">Select Scaling System</option>
                {scalingOptions.map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Marks <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={education.graduationScaling === "CGPA" ? "10" : "100"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                placeholder={
                  education.graduationScaling === "CGPA"
                    ? "Enter CGPA (e.g., 8.5)"
                    : education.graduationScaling === "Percentage"
                    ? "Enter Percentage (e.g., 85)"
                    : "Enter Marks"
                }
                value={education.graduationMarks || ""}
                onChange={(e) =>
                  handleEducationChange({ graduationMarks: e.target.value })
                }
                disabled={isSubmitting || !education.graduationScaling}
              />
              {education.graduationScaling && (
                <p className="text-sm text-gray-500 mt-1">
                  {education.graduationScaling === "CGPA"
                    ? "Enter value between 0 and 10"
                    : education.graduationScaling === "Percentage"
                    ? "Enter value between 0 and 100"
                    : ""}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">
                Course Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.graduationCourseType || ""}
                onChange={(e) =>
                  handleEducationChange({
                    graduationCourseType: e.target.value,
                  })
                }
                disabled={isSubmitting}
              >
                <option value="">Select Course Type</option>
                {courseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Masters Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Masters Details (Optional)
            </h3>

            <div>
              <label className="block mb-2">Higher Degree Qualification</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                placeholder="e.g., MCA, MTech"
                value={education.higherDegree || ""}
                onChange={(e) =>
                  handleEducationChange({ higherDegree: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            {education.higherDegree && (
              <>
                <div>
                  <label className="block mb-2">Scaling System</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                    value={education.mastersScaling || ""}
                    onChange={(e) =>
                      handleEducationChange({
                        mastersScaling: e.target.value,
                        mastersMarks: "", // Clear marks when scaling changes
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <option value="">Select Scaling System</option>
                    {scalingOptions.map((scale) => (
                      <option key={scale} value={scale}>
                        {scale}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Marks</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={education.mastersScaling === "CGPA" ? "10" : "100"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                    placeholder={
                      education.mastersScaling === "CGPA"
                        ? "Enter CGPA (e.g., 9.0)"
                        : education.mastersScaling === "Percentage"
                        ? "Enter Percentage (e.g., 85)"
                        : "Enter Marks"
                    }
                    value={education.mastersMarks || ""}
                    onChange={(e) =>
                      handleEducationChange({ mastersMarks: e.target.value })
                    }
                    disabled={isSubmitting || !education.mastersScaling}
                  />
                  {education.mastersScaling && (
                    <p className="text-sm text-gray-500 mt-1">
                      {education.mastersScaling === "CGPA"
                        ? "Enter value between 0 and 10"
                        : education.mastersScaling === "Percentage"
                        ? "Enter value between 0 and 100"
                        : ""}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2">Course Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                    value={education.mastersCourseType || ""}
                    onChange={(e) =>
                      handleEducationChange({
                        mastersCourseType: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <option value="">Select Course Type</option>
                    {courseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => setCurrentForm(3)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleGraduationSubmit}
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
            className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1 disabled:opacity-50 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
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
                Submitting...
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </>
    );
  };
  // Star Rating Component
  const StarRating = ({ name, value, onChange }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(name, star)}
          className={`text-2xl ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          } hover:scale-110 transition-transform`}
        >
          ★
        </button>
      ))}
    </div>
  );

  // Key Skills Component
  const KeySkills = ({ skills, onAdd, onRemove }) => (
    <div>
      <input
        type="text"
        placeholder="Enter skill and press Enter"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value.trim()) {
              onAdd(e.target.value.trim());
              e.target.value = "";
            }
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  const handleEducationDetailsSubmit = async () => {
    // Validate all required fields
    if (!education.universityName?.trim()) {
      setApiError("Please enter university name");
      return;
    }

    // Validate dates
    if (
      !education.startMonth ||
      !education.startYear ||
      !education.passMonth ||
      !education.passYear
    ) {
      setApiError("Please fill all date fields");
      return;
    }

    // Validate date range
    if (
      !isValidDateRange(
        education.startMonth,
        education.startYear,
        education.passMonth,
        education.passYear
      )
    ) {
      setApiError("End date cannot be before start date");
      return;
    }

    // Validate extra curricular activities
    if (!education.skills?.length) {
      setApiError("Please add at least one extra curricular activity");
      return;
    }

    // Validate ratings
    const requiredRatings = [
      "extra_curricular_activities",
      "working_environment",
      "job_guarantee",
      "skill_development",
      "faculty",
    ];

    const hasAllRatings = requiredRatings.every(
      (rating) => education.ratings?.[rating]
    );

    if (!hasAllRatings) {
      setApiError("Please rate all experience criteria");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const payload = {
        university: education.universityName,
        starting_month: education.startMonth,
        starting_year: education.startYear,
        passing_month: education.passMonth,
        passing_year: education.passYear,
        extra_curricular: education.skills,
        extra_curriclar_activity_rating:
          education.ratings?.extra_curricular_activities || 0,
        campus_enviornment_rating: education.ratings?.working_environment || 0,
        placement_guarantee_rating: education.ratings?.job_guarantee || 0,
        skill_development_rating: education.ratings?.skill_development || 0,
        faculty_rating: education.ratings?.faculty || 0,
        feedback: "Good experience",
        like: "Campus environment",
        dislike: "None",
      };

      const response = await fetch(
        "https://nghr.onrender.com/user/education-details",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit education details");
      }

      setStep(5);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm5 = () => {
    const availableEndYears = getAvailableEndYears(education.startYear);
    const availableEndMonths = getAvailableEndMonths(
      education.startMonth,
      education.startYear,
      education.passYear
    );

    return (
      <>
        <FormHeader />
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{apiError}</p>
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label className="block mb-2">
              University/Institute name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
              value={education.universityName || ""}
              onChange={(e) =>
                handleEducationChange({ universityName: e.target.value })
              }
              placeholder="Enter university name"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                Starting Month <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.startMonth || ""}
                onChange={(e) => {
                  handleEducationChange({
                    startMonth: e.target.value,
                    passMonth: "",
                    passYear: "",
                  });
                }}
                disabled={isSubmitting}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">
                Starting Year <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.startYear || ""}
                onChange={(e) => {
                  handleEducationChange({
                    startYear: e.target.value,
                    passMonth: "",
                    passYear: "",
                  });
                }}
                disabled={isSubmitting}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                Passing Month <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.passMonth || ""}
                onChange={(e) =>
                  handleEducationChange({ passMonth: e.target.value })
                }
                disabled={
                  isSubmitting || !education.startYear || !education.passYear
                }
              >
                <option value="">Select Month</option>
                {availableEndMonths.map((month) => (
                  <option
                    key={month}
                    value={month}
                    disabled={
                      education.startYear === education.passYear &&
                      months.indexOf(month) <
                        months.indexOf(education.startMonth)
                    }
                  >
                    {month}
                  </option>
                ))}
              </select>
              {!education.startYear && (
                <p className="text-sm text-gray-500 mt-1">
                  Please select start date first
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2">
                Passing Year <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
                value={education.passYear || ""}
                onChange={(e) => {
                  handleEducationChange({
                    passYear: e.target.value,
                    passMonth: "",
                  });
                }}
                disabled={isSubmitting || !education.startYear}
              >
                <option value="">Select Year</option>
                {availableEndYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Extra Curricular Activities{" "}
              <span className="text-red-500">*</span>
            </label>
            <KeySkills
              skills={education.skills || []}
              onAdd={(skill) => {
                const updatedSkills = [...(education.skills || []), skill];
                handleEducationChange({ skills: updatedSkills });
              }}
              onRemove={(index) => {
                const updatedSkills = education.skills.filter(
                  (_, i) => i !== index
                );
                handleEducationChange({ skills: updatedSkills });
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Rate your university experience
            </h3>
            <div className="space-y-4">
              {[
                "Extra Curricular activities",
                "Working environment",
                "Job guarantee",
                "Skill Development",
                "Faculty",
              ].map((criteria) => (
                <div
                  key={criteria}
                  className="flex justify-between items-center"
                >
                  <label>
                    {criteria} <span className="text-red-500">*</span>
                  </label>
                  <StarRating
                    name={criteria.toLowerCase().replace(/\s+/g, "_")}
                    value={
                      education.ratings?.[
                        criteria.toLowerCase().replace(/\s+/g, "_")
                      ] || 0
                    }
                    onChange={(name, value) => {
                      handleEducationChange({
                        ratings: {
                          ...(education.ratings || {}),
                          [name]: value,
                        },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => setCurrentForm(4)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleEducationDetailsSubmit}
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
            className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1 disabled:opacity-50 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
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
                Submitting...
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </>
    );
  };

  // Return final render based on current form
  return (
    <div className="max-w-md">
      {currentForm === 1 && renderForm1()}
      {currentForm === 2 && renderForm2()}
      {currentForm === 3 && renderForm3()}
      {currentForm === 4 && renderForm4()}
      {currentForm === 5 && renderForm5()}
    </div>
  );
};

export default EducationStep;
