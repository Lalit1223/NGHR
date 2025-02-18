"use client";
import { Upload } from "lucide-react";
import { useState } from "react";

const DocumentUploadStep = ({
  documents,
  handleFileUpload,
  handleInputChange,
  setStep,
}) => {
  const [errors, setErrors] = useState({
    aadhar: "",
    pan: "",
    degree: "",
  });

  const validateAadhar = (value) => {
    if (!value) return "Aadhar number is required.";
    if (!/^\d{12}$/.test(value))
      return "Aadhar number must be exactly 12 digits.";
    return "";
  };

  const validatePan = (value) => {
    if (!value) return "PAN number is required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
      return "PAN must be in format ABCDE1234F.";
    return "";
  };

  const validateUpload = (file) => {
    if (!file) return "Degree certificate is required.";
    return "";
  };

  const handleNext = () => {
    const aadharError = validateAadhar(documents.aadhar);
    const panError = validatePan(documents.pan);
    const degreeError = validateUpload(documents.degree);

    setErrors({
      aadhar: aadharError,
      pan: panError,
      degree: degreeError,
    });

    if (!aadharError && !panError && !degreeError) {
      setStep(4);
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600 mb-2">Step 2 out of 5</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Secure Your Data with Our Easy KYC Process
        </h2>
      </div>

      <div className="space-y-6">
        {/* Aadhar Card Number Input */}
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-2">Enter Aadhar Card Number</p>
          <input
            type="text"
            maxLength="12"
            placeholder="Enter 12-digit Aadhar number"
            className="border p-2 rounded w-full text-center"
            value={documents.aadhar || ""}
            onChange={(e) => {
              handleInputChange("aadhar", e.target.value);
              setErrors((prev) => ({
                ...prev,
                aadhar: validateAadhar(e.target.value),
              }));
            }}
          />
          {errors.aadhar && (
            <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>
          )}
        </div>

        {/* PAN Card Number Input */}
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-2">Enter PAN Card Number</p>
          <input
            type="text"
            maxLength="10"
            placeholder="Enter 10-digit PAN number"
            className="border p-2 rounded w-full text-center uppercase"
            value={documents.pan || ""}
            onChange={(e) => {
              handleInputChange("pan", e.target.value.toUpperCase());
              setErrors((prev) => ({
                ...prev,
                pan: validatePan(e.target.value.toUpperCase()),
              }));
            }}
          />
          {errors.pan && (
            <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
          )}
        </div>

        {/* Degree Certificate Upload */}
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleFileUpload("degree", file);
            setErrors((prev) => ({ ...prev, degree: validateUpload(file) }));
          }}
          onClick={() => document.getElementById("degree-upload").click()}
        >
          <input
            type="file"
            id="degree-upload"
            className="hidden"
            onChange={(e) => {
              handleFileUpload("degree", e.target.files[0]);
              setErrors((prev) => ({
                ...prev,
                degree: validateUpload(e.target.files[0]),
              }));
            }}
          />
          <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
          <p className="text-gray-600">
            Degree Certificate/Final Year Marksheet
          </p>
          {documents.degree && (
            <p className="text-sm text-teal-600 mt-2">
              {documents.degree.name}
            </p>
          )}
          {errors.degree && (
            <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleNext} // ✅ Run validation before navigating
            className="px-8 py-3 text-white rounded-lg gradient-button flex-1"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DocumentUploadStep;
