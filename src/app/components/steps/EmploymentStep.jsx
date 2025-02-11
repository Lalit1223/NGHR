// app/components/steps/EmploymentStep.jsx
"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const EmploymentStep = ({ employment, handleEmploymentChange, setStep }) => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(1);

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

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  const employeeTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];

  // Reusable Components
  const FormHeader = () => (
    <>
      <p className="text-[#004D6D] font-medium mb-4">Step 5 out of 5</p>
      <h2 className="text-2xl font-bold text-[#004D6D] mb-2">
        Fill in the Details to help us build your profile and land perfect job
        opportunities
      </h2>
      <p className="text-gray-600 mb-6">Fill up Employment details</p>
    </>
  );

  const StarRating = ({ name, value, onChange }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(name, star)}
          className={`text-2xl ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  // Initial Selection Form
  const renderEmploymentTypeForm = () => (
    <>
      <FormHeader />
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            id: "experienced",
            title: "I'm experienced",
            desc: "I have work experience",
          },
          { id: "fresher", title: "I'm a fresher", desc: "Recent Graduate" },
          {
            id: "intern",
            title: "I'm an intern",
            desc: "Currently pursuing studies",
          },
          {
            id: "freelancer",
            title: "I'm a freelancer",
            desc: "Working on projects",
          },
        ].map((type) => (
          <div
            key={type.id}
            onClick={() => {
              handleEmploymentChange({ type: type.id });
              if (type.id === "experienced") {
                setCurrentForm(2);
              } else {
                setCurrentForm(4);
              }
            }}
            className={`p-4 border rounded-lg cursor-pointer hover:border-teal-600 ${
              employment.type === type.id ? "border-teal-600 bg-teal-50" : ""
            }`}
          >
            <h3 className="font-medium">{type.title}</h3>
            <p className="text-sm text-gray-600">{type.desc}</p>
          </div>
        ))}
      </div>
    </>
  );

  // Add Experience Button Form
  const renderAddExperienceForm = () => (
    <>
      <FormHeader />
      <div className="text-center py-8">
        <button
          onClick={() => setCurrentForm(3)}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>
    </>
  );

  // Company Details Form
  const renderCompanyDetailsForm = () => (
    <>
      <FormHeader />
      <div className="space-y-6">
        <p className="font-medium text-[#004D6D]">Company 1</p>

        {/* Start Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              Start month <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={employment.startMonth}
              onChange={(e) =>
                handleEmploymentChange({ startMonth: e.target.value })
              }
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
              value={employment.startYear}
              onChange={(e) =>
                handleEmploymentChange({ startYear: e.target.value })
              }
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

        {/* End Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              End month <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              value={employment.endMonth}
              onChange={(e) =>
                handleEmploymentChange({ endMonth: e.target.value })
              }
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
              value={employment.endYear}
              onChange={(e) =>
                handleEmploymentChange({ endYear: e.target.value })
              }
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

        {/* Company Details */}
        <div>
          <label className="block mb-1">
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.companyName}
            onChange={(e) =>
              handleEmploymentChange({ companyName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.title}
            onChange={(e) => handleEmploymentChange({ title: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">
            Employee type <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.employeeType}
            onChange={(e) =>
              handleEmploymentChange({ employeeType: e.target.value })
            }
          >
            <option value="">Select Type</option>
            {employeeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Country"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.country}
            onChange={(e) =>
              handleEmploymentChange({ country: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.state}
            onChange={(e) => handleEmploymentChange({ state: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={employment.city}
            onChange={(e) => handleEmploymentChange({ city: e.target.value })}
          />
        </div>

        {/* Key Skills */}
        <div>
          <label className="block mb-1">
            Key skills <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Key skills"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {["Design", "Creative thinking", "UI Design", "UX Design"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Company Rating */}
        <div>
          <h3 className="font-medium mb-4">
            Rate the Company on the following criteria
          </h3>
          <div className="space-y-4">
            {["Overall Rating", "Work - Life Balance"].map((criteria) => (
              <div key={criteria} className="flex justify-between items-center">
                <label>
                  {criteria} <span className="text-red-500">*</span>
                </label>
                <StarRating
                  name={criteria.toLowerCase().replace(/\s+/g, "_")}
                  value={
                    employment.ratings?.[
                      criteria.toLowerCase().replace(/\s+/g, "_")
                    ] || 0
                  }
                  onChange={(name, value) => {
                    handleEmploymentChange({
                      ratings: {
                        ...(employment.ratings || {}),
                        [name]: value,
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={() => setCurrentForm(2)}
            className="px-6 py-2 border border-gray-300 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentForm(4)}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderSuccesForm = () => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-8">
        You have successfully created your account
      </p>
      <button
        style={{
          background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
        }}
        className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
        onClick={() => router.push("/dashboard")}
      >
        Continue
      </button>
    </div>
  );

  return (
    <div className="max-w-md">
      {currentForm === 1 && renderEmploymentTypeForm()}
      {currentForm === 2 && renderAddExperienceForm()}
      {currentForm === 3 && renderCompanyDetailsForm()}
      {currentForm === 4 && renderSuccesForm()}
    </div>
  );
};

export default EmploymentStep;
