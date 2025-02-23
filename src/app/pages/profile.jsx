"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "preferences", label: "Preferences" },
    { id: "experience", label: "Experience" },
  ];

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior",
    "Manager",
    "Director",
    "Executive",
  ];

  const jobSearchStatus = [
    "I'm actively looking for a job",
    "I'm open to new opportunities",
    "I'm closed to job offers",
  ];

  const Overview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-4">Profile Picture</h3>
        <p className="text-gray-500 mb-4">
          This will be displayed on your profile
        </p>
        <div className="flex items-center gap-8">
          <div className="relative w-24 h-24">
            <Image
              src="/users/profile.png"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="border-2 border-dashed rounded-lg p-4 w-72">
            <div className="text-center">
              <p>Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="+91 1234567890"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            placeholder="25"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <input
            type="text"
            placeholder="E.g. Pune"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Location
          </label>
          <input
            type="text"
            placeholder="E.g. Pune"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          placeholder="@johndoe123"
          className="w-full p-3 border rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-1">
          This will also act as your profile URL slug (Nghr/@username)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your bio</label>
        <textarea
          placeholder="Tell us about your career and interests..."
          className="w-full p-3 border rounded-lg h-32"
        />
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your career and interests. The more detailed you provide
          about yourself and your achievements, the better we can match you with
          companies that are hiring.
        </p>
      </div>

      <button className="bg-[#004D6D] text-white px-6 py-3 rounded-lg">
        Update Profile
      </button>
    </div>
  );

  const Preferences = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg mb-2">Preferences</h3>
        <p className="text-gray-500">
          Share your skills, experience, and salary expectations. These details
          will help employers discover your profile.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          What are you looking for in a job?
        </label>
        <textarea
          placeholder="E.g. I love to travel..."
          className="w-full p-3 border rounded-lg h-32"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Primary role</label>
        <input
          type="text"
          placeholder="E.g. Frontend Developer"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Experience level
        </label>
        <div className="grid grid-cols-3 gap-4">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Job search status
        </label>
        <div className="space-y-3">
          {jobSearchStatus.map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input type="radio" name="jobStatus" />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="bg-[#004D6D] text-white px-6 py-3 rounded-lg">
        Update Profile
      </button>
    </div>
  );

  const Experience = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg mb-2">Experience</h3>
          <p className="text-gray-500">
            Add your experience to your profile to help us match you with the
            right opportunities.
          </p>
        </div>
        <button className="bg-[#004D6D] text-white px-6 py-3 rounded-lg flex items-center gap-2">
          + Add Experience
        </button>
      </div>

      <div className="space-y-4">
        <ExperienceCard
          company="Infrasync Technology and services"
          role="Administrative Assistant"
          period="Jan 2024 - Present"
          location="Pune, Maharashtra"
          type="Hybrid"
          workTime="Full time"
          ctc="CTC 6 LPA"
          current
        />
        <ExperienceCard
          company="Infrasync Technology and services"
          role="Administrative Assistant"
          period="Jan 2024 - Nov 2024 (11 months)"
          location="Pune, Maharashtra"
          type="Hybrid"
          workTime="Full time"
          ctc="CTC 6 LPA"
        />
      </div>
    </div>
  );

  const ExperienceCard = ({
    company,
    role,
    period,
    location,
    type,
    workTime,
    ctc,
    current,
  }) => (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full"></div>
          <div>
            <h4 className="font-medium flex items-center gap-2">
              {role}
              {current && (
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  Current
                </span>
              )}
            </h4>
            <p className="text-gray-600">{company}</p>
            <p className="text-gray-500 text-sm">{period}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {location}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {type}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {workTime}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {ctc}
              </span>
            </div>
          </div>
        </div>
        <button className="text-gray-600 flex items-center gap-1">
          <span className="text-sm">Edit</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - same as dashboard */}
      <nav className="border-b">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#004D6D]">NGHR</h1>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/jobs" className="text-gray-700">
                Jobs
              </Link>
              <Link href="/companies" className="text-gray-700">
                Companies
              </Link>
              <Link href="/consultants" className="text-gray-700">
                Consultants
              </Link>
              <Link href="/create-cv" className="text-gray-700">
                Create CV
              </Link>
              <Link href="/pricing" className="text-gray-700">
                Pricing
              </Link>
              <div className="flex items-center space-x-2">
                <span>Job Seaker</span>
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image
                    src="/users/profile.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer ${
                    item.active ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span>{item.icon}</span>
                    <span
                      className={
                        item.active ? "text-blue-600" : "text-gray-700"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {activeTab === "overview"
                  ? "Overview"
                  : activeTab === "preferences"
                  ? "Preferences"
                  : "Experience"}
              </h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 border rounded-lg">
                  Copy link
                </button>
                <button className="px-4 py-2 bg-[#004D6D] text-white rounded-lg">
                  View Public Profile
                </button>
              </div>
            </div>

            <div className="border-b mb-8">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-4 relative ${
                      activeTab === tab.id
                        ? "text-[#004D6D] border-b-2 border-[#004D6D]"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "overview" && <Overview />}
            {activeTab === "preferences" && <Preferences />}
            {activeTab === "experience" && <Experience />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
