// app/components/steps/PersonalInfoStep.jsx
import React, { useState } from "react";

const PersonalInfoStep = ({ formData, handleChange, setStep }) => {
  const [currentForm, setCurrentForm] = useState(1);

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

  // Basic Info Form
  const renderBasicInfoForm = () => (
    <>
      <FormHeader />
      <form className="space-y-6">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </div>

        <button
          type="button"
          onClick={() => setCurrentForm(2)}
          className="w-full py-3 px-4 text-white rounded-lg gradient-button"
        >
          Next
        </button>
      </form>
    </>
  );

  // Additional Info Form
  const renderAdditionalInfoForm = () => (
    <>
      <FormHeader />
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-32"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Key Skills <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="keySkills"
            value={formData.keySkills}
            onChange={handleChange}
            placeholder="Enter Key skills"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {["Design", "Creative thinking", "UI Design", "UX Design"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter Country"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
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
              placeholder="Enter Pincode"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentForm(1)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-8 py-3 text-white rounded-lg gradient-button flex-1"
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
