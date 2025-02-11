// app/components/StepIndicator.jsx
const StepIndicator = ({ currentStep }) => {
  return (
    <div className="mb-6">
      <div className="text-gray-600 mb-2">Step {currentStep} out of 5</div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
