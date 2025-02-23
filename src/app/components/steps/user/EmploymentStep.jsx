"use client";
import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const EmploymentStep = ({ employment, handleEmploymentChange, setStep }) => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

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

  const employeeTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];

  const workPolicies = ["Remote", "Hybrid", "On-site"];

  // Get available end years based on start year
  const getAvailableEndYears = (startYear) => {
    if (!startYear) return years;
    const startYearNum = parseInt(startYear);
    return years.filter((year) => year >= startYearNum);
  };

  const FormHeader = () => (
    <>
      <p className="text-[#004D6D] font-medium mb-4">Step 5 out of 5</p>
      <h2 className="text-2xl font-bold text-[#004D6D] mb-2">
        Fill in the Details to help us build your profile
      </h2>
      <p className="text-gray-600 mb-6">Fill up Employment details</p>
    </>
  );

  const StarRating = ({ name, value, onChange, disabled = false }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && onChange(name, star)}
          className={`text-2xl ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          } ${
            disabled ? "cursor-not-allowed opacity-50" : "hover:text-yellow-400"
          }`}
          disabled={disabled}
        >
          ★
        </button>
      ))}
    </div>
  );

  const handleEmploymentStatus = async (status) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        "https://nghr.onrender.com/user/employment-status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employmentStatus: status }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update status");

      handleEmploymentChange({ employmentStatus: status });
      setCurrentForm(status === "Experienced" ? 2 : 4);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanySubmit = async () => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const experience = employment.experiences[employment.currentCompanyIndex];

      // Validate required fields including end date if not currently working
      if (
        !experience.currently_working &&
        (!experience.end_month || !experience.end_year)
      ) {
        throw new Error("Please fill in end date");
      }

      const response = await fetch(
        "https://nghr.onrender.com/user/employment-details",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiences: [
              {
                start_month: experience.start_month,
                start_year: experience.start_year,
                currently_working: experience.currently_working,
                ...(experience.currently_working
                  ? {}
                  : {
                      end_month: experience.end_month,
                      end_year: experience.end_year,
                    }),
                company: experience.company,
                role: experience.role,
                employmentType: experience.employmentType,
                country: experience.country,
                state: experience.state,
                job_skills: experience.job_skills,
                ctc: experience.ctc,
                ctc_display: experience.ctc_display,
                overall_rating: experience.overall_rating,
                work_life_rating: experience.work_life_rating,
                salary_benifits_rating: experience.salary_benifits_rating,
                promotions_appraisal_rating:
                  experience.promotions_appraisal_rating,
                job_security_rating: experience.job_security_rating,
                skill_development_rating: experience.skill_development_rating,
                work_satisfaction_rating: experience.work_satisfaction_rating,
                company_culture_rating: experience.company_culture_rating,
                like: experience.like || "Good work environment",
                dislike: experience.dislike || "None",
                work_policy: experience.work_policy,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit details");

      setCurrentForm(4);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExperienceChange = (updates) => {
    // If updating start_year, clear end dates
    if (updates.start_year) {
      updates = {
        ...updates,
        end_month: "",
        end_year: "",
      };
    }

    handleEmploymentChange({
      experiences: employment.experiences.map((exp, index) =>
        index === employment.currentCompanyIndex ? { ...exp, ...updates } : exp
      ),
    });
  };

  const renderEmploymentTypeForm = () => (
    <>
      <FormHeader />
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{apiError}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            id: "Experienced",
            title: "I'm experienced",
            desc: "I have work experience",
          },
          { id: "Fresher", title: "I'm a fresher", desc: "Recent Graduate" },
          {
            id: "Intern",
            title: "I'm an intern",
            desc: "Currently pursuing studies",
          },
          {
            id: "Freelancer",
            title: "I'm a freelancer",
            desc: "Working on projects",
          },
        ].map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleEmploymentStatus(type.id)}
            disabled={isSubmitting}
            className={`p-4 border rounded-lg cursor-pointer hover:border-teal-600 
              ${
                employment.employmentStatus === type.id
                  ? "border-teal-600 bg-teal-50"
                  : ""
              } 
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <h3 className="font-medium">{type.title}</h3>
            <p className="text-sm text-gray-600">{type.desc}</p>
          </button>
        ))}
      </div>
    </>
  );

  const renderAddExperienceForm = () => (
    <>
      <FormHeader />
      <div className="text-center py-8">
        <button
          onClick={() => setCurrentForm(3)}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 
            bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>
    </>
  );

  const renderCompanyDetailsForm = () => {
    const experience = employment.experiences[employment.currentCompanyIndex];
    const availableEndYears = getAvailableEndYears(experience.start_year);

    return (
      <>
        <FormHeader />
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{apiError}</p>
          </div>
        )}
        <div className="space-y-6">
          <p className="font-medium text-[#004D6D]">
            Company {employment.currentCompanyIndex + 1}
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  Start month <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={experience.start_month}
                  onChange={(e) =>
                    handleExperienceChange({ start_month: e.target.value })
                  }
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
                <label className="block mb-1">
                  Start year <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={experience.start_year}
                  onChange={(e) =>
                    handleExperienceChange({ start_year: e.target.value })
                  }
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

            <div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={experience.currently_working}
                  onChange={(e) =>
                    handleExperienceChange({
                      currently_working: e.target.checked,
                      ...(e.target.checked && {
                        end_month: "",
                        end_year: "",
                      }),
                    })
                  }
                  disabled={isSubmitting}
                />
                <span>I currently work here</span>
              </label>
            </div>

            {!experience.currently_working && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">
                    End month <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    value={experience.end_month || ""}
                    onChange={(e) =>
                      handleExperienceChange({ end_month: e.target.value })
                    }
                    disabled={isSubmitting || !experience.start_year}
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
                  <label className="block mb-1">
                    End year <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    value={experience.end_year || ""}
                    onChange={(e) =>
                      handleExperienceChange({ end_year: e.target.value })
                    }
                    disabled={isSubmitting || !experience.start_year}
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
            )}
          </div>

          <div>
            <label className="block mb-1">
              Company name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={experience.company}
              onChange={(e) =>
                handleExperienceChange({ company: e.target.value })
              }
              disabled={isSubmitting}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={experience.role}
              onChange={(e) => handleExperienceChange({ role: e.target.value })}
              disabled={isSubmitting}
              placeholder="Enter your role"
            />
          </div>

          <div>
            <label className="block mb-1">
              Employment type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={experience.employmentType}
              onChange={(e) =>
                handleExperienceChange({ employmentType: e.target.value })
              }
              disabled={isSubmitting}
            >
              <option value="">Select Type</option>
              {employeeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">
              Work Policy <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={experience.work_policy}
              onChange={(e) =>
                handleExperienceChange({ work_policy: e.target.value })
              }
              disabled={isSubmitting}
            >
              <option value="">Select Work Policy</option>
              {workPolicies.map((policy) => (
                <option key={policy} value={policy}>
                  {policy}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter country"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={experience.country}
                onChange={(e) =>
                  handleExperienceChange({ country: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter state"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={experience.state}
                onChange={(e) =>
                  handleExperienceChange({ state: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">
              CTC <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter CTC (e.g., 12 LPA)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={experience.ctc}
              onChange={(e) => handleExperienceChange({ ctc: e.target.value })}
              disabled={isSubmitting}
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={experience.ctc_display}
                onChange={(e) =>
                  handleExperienceChange({ ctc_display: e.target.checked })
                }
                disabled={isSubmitting}
              />
              <span>Display my CTC publicly</span>
            </label>
          </div>

          <div>
            <label className="block mb-1">
              Job Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Add skills (comma separated)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={
                experience.job_skills ? experience.job_skills.join(", ") : ""
              }
              onChange={(e) =>
                handleExperienceChange({
                  job_skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              disabled={isSubmitting}
            />
          </div>

          <div>
            <h3 className="font-medium mb-4">Rate your experience</h3>
            <div className="space-y-4">
              {[
                { key: "overall_rating", label: "Overall Rating" },
                { key: "work_life_rating", label: "Work-Life Balance" },
                { key: "salary_benifits_rating", label: "Salary & Benefits" },
                {
                  key: "promotions_appraisal_rating",
                  label: "Promotions & Appraisal",
                },
                { key: "job_security_rating", label: "Job Security" },
                { key: "skill_development_rating", label: "Skill Development" },
                { key: "work_satisfaction_rating", label: "Work Satisfaction" },
                { key: "company_culture_rating", label: "Company Culture" },
              ].map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center">
                  <label>
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <StarRating
                    name={key}
                    value={experience[key] || 0}
                    onChange={(name, value) =>
                      handleExperienceChange({ [name]: value })
                    }
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1">
              What did you like? <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Share what you liked about working here"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 min-h-[100px]"
              value={experience.like || ""}
              onChange={(e) => handleExperienceChange({ like: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block mb-1">What could be improved?</label>
            <textarea
              placeholder="Share what could be improved"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 min-h-[100px]"
              value={experience.dislike || ""}
              onChange={(e) =>
                handleExperienceChange({ dislike: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <button
              onClick={() => setCurrentForm(2)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              onClick={handleCompanySubmit}
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderSuccessForm = () => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-8">
        You have successfully completed your profile
      </p>
      <button
        style={{
          background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
        }}
        className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
        onClick={() => router.push("/dashboard")}
        disabled={isSubmitting}
      >
        Go to Dashboard
      </button>
    </div>
  );

  return (
    <div className="max-w-md">
      {currentForm === 1 && renderEmploymentTypeForm()}
      {currentForm === 2 && renderAddExperienceForm()}
      {currentForm === 3 && renderCompanyDetailsForm()}
      {currentForm === 4 && renderSuccessForm()}
    </div>
  );
};

export default EmploymentStep;
