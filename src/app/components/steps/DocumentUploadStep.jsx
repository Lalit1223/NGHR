// app/components/steps/DocumentUploadStep.jsx
"use client";
import { Upload } from "lucide-react";

const DocumentUploadStep = ({ documents, handleFileUpload, setStep }) => {
  const handleDrop = (type, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(type, file);
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
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop("aadhar", e)}
          onClick={() => document.getElementById("aadhar-upload").click()}
        >
          <input
            type="file"
            id="aadhar-upload"
            className="hidden"
            onChange={(e) => handleFileUpload("aadhar", e.target.files[0])}
          />
          <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
          <p className="text-gray-600">Upload Aadhar card front</p>
          {documents.aadhar && (
            <p className="text-sm text-teal-600 mt-2">
              {documents.aadhar.name}
            </p>
          )}
        </div>

        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop("pan", e)}
          onClick={() => document.getElementById("pan-upload").click()}
        >
          <input
            type="file"
            id="pan-upload"
            className="hidden"
            onChange={(e) => handleFileUpload("pan", e.target.files[0])}
          />
          <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
          <p className="text-gray-600">Upload PAN card</p>
          {documents.pan && (
            <p className="text-sm text-teal-600 mt-2">{documents.pan.name}</p>
          )}
        </div>

        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop("degree", e)}
          onClick={() => document.getElementById("degree-upload").click()}
        >
          <input
            type="file"
            id="degree-upload"
            className="hidden"
            onChange={(e) => handleFileUpload("degree", e.target.files[0])}
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
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={() => setStep(4)}
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
