// app/page.jsx
"use client";

import React, { useState } from "react";
import PersonalInfoStep from "../../components/steps/user/PersonalInfoStep";
import DocumentUploadStep from "../../components/steps/user/DocumentUploadStep";
// import PlanSelectionStep from "./components/steps/PlanSelectionStep"; // Will be added later
import EducationStep from "../../components/steps/user/EducationStep";
import EmploymentStep from "../../components/steps/user/EmploymentStep";
import SuccessStep from "../../components/steps/user/SuccessStep";
import Navbar from "../../components/Navbar";

const Page = () => {
  const [step, setStep] = useState(1);

  // Add documents state here
  const [documents, setDocuments] = useState({
    aadhar: "",
    pan: "",
    degree: null,
  });

  // Remove documents from formData
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      dob: "",
      language: "",
      key_skills: [{ name: "", level: "1" }],
      location: {
        country: "",
        state: "",
        city: "",
        pincode: "",
      },
    },
    education: {
      qualification: "",
      classX: "",
      classXII: "",
      stream: "",
      specialization: "",
      graduationScaling: "",
      graduationMarks: "",
      graduationCourseType: "",
      mastersScaling: "",
      mastersMarks: "",
      mastersCourseType: "",

      universityName: "", // will be sent as "university"
      startMonth: "", // will be sent as "starting_month"
      startYear: "", // will be sent as "starting_year"
      passMonth: "", // will be sent as "passing_month"
      passYear: "", // will be sent as "passing_year"
      skills: [], // will be sent as "extra_curricular"
      ratings: {
        extra_curricular_activities: 0, // maps to extra_curriclar_activity_rating
        working_environment: 0, // maps to campus_enviornment_rating
        job_guarantee: 0, // maps to placement_guarantee_rating
        skill_development: 0, // maps to skill_development_rating
        faculty: 0, // maps to faculty_rating
      },
      feedback: "", // Add this
      like: "", // Add this
      dislike: "", // Add this
    },
    employment: {
      employmentStatus: "", // for first API
      experiences: [
        {
          start_month: "",
          start_year: "",
          currently_working: false,
          company: "",
          role: "",
          employmentType: "",
          country: "",
          state: "",
          job_skills: [],
          ctc: "",
          ctc_display: false,
          overall_rating: 0,
          work_life_rating: 0,
          salary_benifits_rating: 0,
          promotions_appraisal_rating: 0,
          job_security_rating: 0,
          skill_development_rating: 0,
          work_satisfaction_rating: 0,
          company_culture_rating: 0,
          like: "",
          dislike: "",
          work_policy: "",
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
        ...(name === "country" ||
        name === "state" ||
        name === "city" ||
        name === "pincode"
          ? {
              location: {
                ...prev.personalInfo.location,
                [name]: value,
              },
            }
          : { [name]: value }),
      },
    }));
  };
  const handleSkillChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.personalInfo.key_skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };

      return {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          key_skills: updatedSkills,
        },
      };
    });
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        key_skills: [...prev.personalInfo.key_skills, { name: "", level: "" }],
      },
    }));
  };
  const removeSkill = (index) => {
    setFormData((prev) => {
      const updatedSkills = prev.personalInfo.key_skills.filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          key_skills: updatedSkills,
        },
      };
    });
  };

  const handleInputChange = (field, value) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (type, file) => {
    console.log("Uploading file:", type, file);
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
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
      // If updating employment status
      if (updates.employmentStatus) {
        return {
          ...prev,
          employment: {
            ...prev.employment,
            employmentStatus: updates.employmentStatus,
            experiences:
              updates.employmentStatus.toLowerCase() === "experienced"
                ? prev.employment.experiences
                : [],
          },
        };
      }

      // If updating experiences
      if (updates.experiences) {
        return {
          ...prev,
          employment: {
            ...prev.employment,
            experiences: updates.experiences,
          },
        };
      }

      // For single experience updates
      const currentIndex = prev.employment.currentCompanyIndex;
      const updatedExperiences = [...prev.employment.experiences];
      updatedExperiences[currentIndex] = {
        ...updatedExperiences[currentIndex],
        ...updates,
      };

      return {
        ...prev,
        employment: {
          ...prev.employment,
          experiences: updatedExperiences,
        },
      };
    });
  };
  const addNewCompany = () => {
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        experiences: [
          ...prev.employment.experiences,
          {
            start_month: "",
            start_year: "",
            currently_working: false,
            company: "",
            role: "",
            employmentType: "",
            country: "",
            state: "",
            job_skills: [],
            ctc: "",
            ctc_display: false,
            overall_rating: 0,
            work_life_rating: 0,
            salary_benifits_rating: 0,
            promotions_appraisal_rating: 0,
            job_security_rating: 0,
            skill_development_rating: 0,
            work_satisfaction_rating: 0,
            company_culture_rating: 0,
            like: "",
            dislike: "",
            work_policy: "",
          },
        ],
        currentCompanyIndex: prev.employment.experiences.length,
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
            handleSkillChange={handleSkillChange} // ✅ Fix: Pass function
            addSkill={addSkill} // ✅ Fix: Pass function
            removeSkill={removeSkill} // ✅ Pass removeSkill
            setStep={setStep}
          />
        );
      case 2:
        return (
          <DocumentUploadStep
            documents={documents} // Changed from formData.documents
            handleInputChange={handleInputChange}
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
            handleSkillChange={handleSkillChange} // ✅ Fix: Pass function
            addSkill={addSkill} // ✅ Fix: Pass function
            removeSkill={removeSkill} // ✅ Pass removeSkill
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
