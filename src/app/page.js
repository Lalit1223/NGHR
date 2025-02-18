// app/page.jsx
"use client";

import React, { useState } from "react";
import PersonalInfoStep from "./components/steps/PersonalInfoStep";
import DocumentUploadStep from "./components/steps/DocumentUploadStep";
// import PlanSelectionStep from "./components/steps/PlanSelectionStep"; // Will be added later
import EducationStep from "./components/steps/EducationStep";
import EmploymentStep from "./components/steps/EmploymentStep";
import SuccessStep from "./components/steps/SuccessStep";
import Navbar from "./components/Navbar";

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      dateOfBirth: "",
      language: "",

      keySkills: [],
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    documents: {
      aadhar: "", // Now storing as a string instead of null
      pan: "", // Now storing as a string instead of null
      degree: null,
    },
    // plan: {  // Will be added later
    //   type: "", // "free" or "paid"
    // },
    education: {
      qualification: "",
      classX: "",
      classXII: "",
      stream: "",
      specialization: "",
      higherDegree: "",
      courseType: "",
      gradingSystem: "",
      universityName: "",
      startMonth: "",
      startYear: "",
      passMonth: "",
      passYear: "",
      skills: [],
      ratings: {},
    },
    employment: {
      type: "",
      companies: [
        {
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
          companyName: "",
          title: "",
          employeeType: "",
          country: "",
          state: "",
          city: "",
          skills: [],
          ratings: {
            overall_rating: 0,
            work_life_balance: 0,
          },
        },
      ],
      currentCompanyIndex: 0,
    },
  });
  // Handle text input changes for personal info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: value,
      },
    }));
  };

  // ✅ Function to handle file uploads
  const handleFileUpload = (type, file) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file,
      },
    }));
  };

  const handleEducationChange = (updates) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        ...updates,
      },
    }));
  };

  const handleEmploymentChange = (updates) => {
    setFormData((prev) => {
      if (updates.type) {
        return {
          ...prev,
          employment: {
            ...prev.employment,
            type: updates.type,
            companies:
              updates.type === "experienced" ? prev.employment.companies : [],
          },
        };
      }

      const currentCompany = prev.employment.currentCompanyIndex;
      const updatedCompanies = [...prev.employment.companies];
      updatedCompanies[currentCompany] = {
        ...updatedCompanies[currentCompany],
        ...updates,
      };

      return {
        ...prev,
        employment: {
          ...prev.employment,
          companies: updatedCompanies,
        },
      };
    });
  };

  const addNewCompany = () => {
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        companies: [
          ...prev.employment.companies,
          {
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            companyName: "",
            title: "",
            employeeType: "",
            country: "",
            state: "",
            city: "",
            skills: [],
            ratings: {
              overall_rating: 0,
              work_life_balance: 0,
            },
          },
        ],
        currentCompanyIndex: prev.employment.companies.length,
      },
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData.personalInfo}
            handleChange={handleChange}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <DocumentUploadStep
            documents={formData.documents}
            handleInputChange={handleInputChange} // ✅ Ensure it's passed
            handleFileUpload={handleFileUpload}
            setStep={setStep}
          />
        );
      // case 3: Plan Selection - skipped for now
      case 4:
        return (
          <EducationStep
            education={formData.education}
            handleEducationChange={handleEducationChange}
            setStep={setStep}
          />
        );
      case 5:
        return (
          <EmploymentStep
            employment={formData.employment}
            handleEmploymentChange={handleEmploymentChange}
            addNewCompany={addNewCompany}
            setStep={setStep}
          />
        );
      default:
        return (
          <PersonalInfoStep
            formData={formData.personalInfo}
            handleChange={handleChange}
            setStep={setStep}
          />
        );
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url("/BG .svg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Content Container */}
        <div className="flex w-full max-w-7xl mx-auto">
          {/* Left side - Form */}
          <div className="w-1/2 flex flex-col justify-center backdrop-blur-sm bg-white/10 rounded-lg my-8 ml-8">
            <div className="max-w-md mx-auto">{renderStep()}</div>
          </div>

          {/* Right side - Empty space for pattern visibility */}
          <div className="w-1/2" />
        </div>
      </div>
    </>
  );
};

export default Page;
