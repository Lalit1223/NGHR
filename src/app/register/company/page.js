"use client";
import { useState } from "react";
import EmailVerificationStep from "../../components/steps/company/EmailVerificationStep";
import OTPVerificationStep from "../../components/steps/company/OTPVerificationStep";
import CompanyInfoStep from "../../components/steps/company/CompanyInfoStep";
import Navbar from "@/app/components/Navbar";

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });

  const renderInitialLayout = (content) => (
    <div className="flex w-full max-w-7xl mx-auto">
      <div className="w-1/2">
        <img
          src="/image.png"
          alt="NGHR Jobs"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-3">{content}</div>
      </div>
    </div>
  );

  const renderCompanyInfoLayout = (content) => (
    <>
      <Navbar />
      <div className="flex w-full min-h-[calc(100vh-64px)]">
        <div className="w-1/2 p-8">
          <div className="backdrop-blur-sm bg-white/30 rounded-lg p-8">
            {content}
          </div>
        </div>
        <div className="w-1/2" />
      </div>
    </>
  );

  const handleEmailSubmit = (email) => {
    setFormData((prev) => ({ ...prev, email }));
    setStep(2);
  };

  const handleOTPSubmit = (token) => {
    setFormData((prev) => ({ ...prev, token }));
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderInitialLayout(
          <EmailVerificationStep onNext={handleEmailSubmit} />
        );
      case 2:
        return renderInitialLayout(
          <OTPVerificationStep
            email={formData.email}
            onBack={() => setStep(1)}
            onNext={handleOTPSubmit}
          />
        );
      case 3:
        return renderCompanyInfoLayout(
          <CompanyInfoStep token={formData.token} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: step > 2 ? `url("/BG .svg")` : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {renderStep()}
    </div>
  );
};

export default Page;
