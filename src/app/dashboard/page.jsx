// app/dashboard/page.jsx
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashboardPage = () => {
  // Mock data - replace with actual data
  const stats = {
    appliedJobs: 500,
    savedJobs: 50,
    messages: "05",
    reviewCV: 100,
  };

  const appliedJobs = [
    {
      company: "Ecom Softwares",
      role: "Front End Developer",
      date: "06/Dec/2023",
      status: "Shortlisted",
      logo: "/infra.png",
    },
    {
      company: "HW kalt",
      role: "Sales Head",
      date: "08/Mar/2024",
      status: "In Review",
      logo: "/hicom.png",
    },
    // ... more jobs
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "text-teal-500";
      case "In Review":
        return "text-blue-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#004D6D]">NGHR</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/jobs" className="text-gray-700 hover:text-gray-900">
                Jobs
              </Link>
              <Link
                href="/companies"
                className="text-gray-700 hover:text-gray-900"
              >
                Companies
              </Link>
              <Link
                href="/consultants"
                className="text-gray-700 hover:text-gray-900"
              >
                Consultants
              </Link>
              <Link
                href="/create-cv"
                className="text-gray-700 hover:text-gray-900"
              >
                Create CV
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-gray-900"
              >
                Pricing
              </Link>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <span>Job Seaker</span>
                  <img
                    src="/avatar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 pr-8">
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-900">Dashboard</span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Your Profile</span>
                </div>
              </div>
              {/* Add other sidebar items */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back Jack</h2>
                  <p className="text-gray-600">Overview your profile</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: "Applied Jobs", value: stats.appliedJobs, icon: "📁" },
                { label: "Saved Jobs", value: stats.savedJobs, icon: "📑" },
                { label: "Messages", value: stats.messages, icon: "💬" },
                { label: "Review CV", value: stats.reviewCV, icon: "📝" },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <span>{stat.label}</span>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Applied Jobs Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Current Applied Jobs
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">Company Name & Job Title</th>
                    <th className="pb-4">Applied Date</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{job.company}</p>
                            <p className="text-gray-600">{job.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{job.date}</td>
                      <td className={`py-4 ${getStatusColor(job.status)}`}>
                        {job.status}
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
