// app/components/steps/SuccessStep.jsx
"use client";

const SuccessStep = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-8">
        You have successfully created your account
      </p>
      <button
        className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        onClick={() => (window.location.href = "/dashboard")} // or your desired redirect
      >
        Continue
      </button>
    </div>
  );
};

export default SuccessStep;
