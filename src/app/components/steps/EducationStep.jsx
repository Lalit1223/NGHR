// app/components/steps/EducationStep.jsx
"use client";
import React, { useState } from "react";

const EducationStep = ({ education, handleEducationChange, setStep }) => {
  const [currentForm, setCurrentForm] = useState(1);

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

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );
  const streams = ["Science", "Commerce", "Arts"];
  const courseTypes = ["Full Time", "Part Time", "Distance"];
  const gradingSystems = ["Scale 10", "Scale 4", "% out of 100", "Pass"];
  const qualifications = [
    "Doctorate/PhD",
    "Masters",
    "Graduation",
    "12th",
    "10th",
  ];
  const specializations = ["BTech", "BE", "BSc", "BCA", "Other"];

  // Form Header Component
  const FormHeader = () => (
    <div className="mb-8">
      <p className="text-[#004D6D] font-medium mb-4">Step 4 out of 5</p>
      <h2 className="text-2xl font-bold text-[#004D6D] mb-2">
        Fill in the Details to help us build your profile and land perfect job
        opportunities
      </h2>
      <p className="text-gray-600">Fill up Educational details</p>
    </div>
  );

  // Navigation Buttons with gradient
  const NavigationButtons = ({ onBack, onNext }) => (
    <div className="flex justify-between gap-4 mt-6">
      <button
        onClick={onBack}
        className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </button>
      <button
        onClick={onNext}
        style={{
          background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
        }}
        className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex-1"
      >
        Next
      </button>
    </div>
  );

  // Star Rating Component
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

  // Key Skills Component
  const KeySkills = ({ skills, onAdd, onRemove }) => (
    <div>
      <input
        type="text"
        placeholder="Enter Key skills"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-1"
          >
            {skill}
            <button onClick={() => onRemove(index)}>&times;</button>
          </span>
        ))}
      </div>
    </div>
  );

  // Form renders (your existing form renders with the updated NavigationButtons)
  const renderForm1 = () => (
    <>
      <FormHeader />
      <div className="mb-6">
        <label className="block mb-2">
          Highest qualification/ Degree currently pursuing{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {qualifications.map((qual) => (
            <button
              key={qual}
              className={`p-3 border rounded-lg hover:bg-teal-50 ${
                education.qualification === qual
                  ? "border-teal-600 bg-teal-50"
                  : ""
              }`}
              onClick={() => handleEducationChange({ qualification: qual })}
            >
              {qual}
            </button>
          ))}
        </div>
      </div>
      <NavigationButtons
        onBack={() => {
          setStep(1);
          setCurrentForm(2);
        }}
        onNext={() => setCurrentForm(2)}
      />
    </>
  );

  // ... your existing form renders (2-7) with updated NavigationButtons ...

  const renderForm2 = () => (
    <>
      <FormHeader />
      <div className="mb-6">
        <label className="block mb-2">
          Add class X percentage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Percentage Scored/ CGPA"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={education.classX}
          onChange={(e) => handleEducationChange({ classX: e.target.value })}
        />
      </div>
      <NavigationButtons
        onBack={() => setCurrentForm(1)}
        onNext={() => setCurrentForm(3)}
      />
    </>
  );

  const renderForm3 = () => (
    <>
      <FormHeader />
      <div className="space-y-6">
        <div>
          <label className="block mb-2">
            Select stream <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {streams.map((stream) => (
              <button
                key={stream}
                type="button"
                className={`p-3 border rounded-lg hover:bg-teal-50${
                  education.stream === stream
                    ? "border-[#004D6D] bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleEducationChange({ stream })}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2">
            Add class XII percentage <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Percentage Scored/ CGPA"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            value={education.classXII}
            onChange={(e) =>
              handleEducationChange({ classXII: e.target.value })
            }
          />
        </div>
      </div>
      <NavigationButtons
        onBack={() => setCurrentForm(2)}
        onNext={() => setCurrentForm(4)}
      />
    </>
  );

  const renderForm4 = () => (
    <>
      <FormHeader />
      <div className="space-y-6">
        <div>
          <label className="block mb-2">
            Specialization in graduation/diploma{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            value={education.specialization}
            onChange={(e) =>
              handleEducationChange({ specialization: e.target.value })
            }
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
            Any higher degree qualification (if any)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            value={education.higherDegree}
            onChange={(e) =>
              handleEducationChange({ higherDegree: e.target.value })
            }
          />
        </div>
      </div>
      <NavigationButtons
        onBack={() => setCurrentForm(3)}
        onNext={() => setCurrentForm(5)}
      />
    </>
  );

  const renderForm5 = () => (
    <>
      <FormHeader />
      <div>
        <label className="block mb-2">
          Course type <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {courseTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 rounded-lg border ${
                education.courseType === type
                  ? "border-[#004D6D] bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={() => handleEducationChange({ courseType: type })}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <NavigationButtons
        onBack={() => setCurrentForm(4)}
        onNext={() => setCurrentForm(6)}
      />
    </>
  );

  const renderForm6 = () => (
    <>
      <FormHeader />
      <div>
        <label className="block mb-2">
          Grading system <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {gradingSystems.map((system) => (
            <button
              key={system}
              type="button"
              className={`px-4 py-2 rounded-lg border ${
                education.gradingSystem === system
                  ? "border-[#004D6D] bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={() => handleEducationChange({ gradingSystem: system })}
            >
              {system}
            </button>
          ))}
        </div>
      </div>
      <NavigationButtons
        onBack={() => setCurrentForm(5)}
        onNext={() => setCurrentForm(7)}
      />
    </>
  );

  const renderForm7 = () => (
    <>
      <FormHeader />
      <div className="space-y-6">
        <div>
          <label className="block mb-2">
            University/Institute name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            value={education.universityName}
            onChange={(e) =>
              handleEducationChange({ universityName: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              Starting Month<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              value={education.startMonth}
              onChange={(e) =>
                handleEducationChange({ startMonth: e.target.value })
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
            <label className="block mb-2">
              Starting Year<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              value={education.startYear}
              onChange={(e) =>
                handleEducationChange({ startYear: e.target.value })
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              Passing Month<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              value={education.passMonth}
              onChange={(e) =>
                handleEducationChange({ passMonth: e.target.value })
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
            <label className="block mb-2">
              Passing Year<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              value={education.passYear}
              onChange={(e) =>
                handleEducationChange({ passYear: e.target.value })
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

        <div>
          <label className="block mb-2">
            Key skills <span className="text-red-500">*</span>
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
            Rate your university experience on the following criteria
          </h3>
          <div className="space-y-4">
            {[
              "Extra Curricular activities",
              "Working environment",
              "Job guarantee",
              "Skill Development",
              "Faculty",
              "Campus Placements",
            ].map((criteria) => (
              <div key={criteria} className="flex justify-between items-center">
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
      <NavigationButtons
        onBack={() => setCurrentForm(6)}
        onNext={() => setStep(5)}
      />
    </>
  );

  return (
    <div className="max-w-md">
      {currentForm === 1 && renderForm1()}
      {currentForm === 2 && renderForm2()}
      {currentForm === 3 && renderForm3()}
      {currentForm === 4 && renderForm4()}
      {currentForm === 5 && renderForm5()}
      {currentForm === 6 && renderForm6()}
      {currentForm === 7 && renderForm7()}
    </div>
  );
};

export default EducationStep;
