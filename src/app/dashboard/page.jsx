"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Avatar Component
const Avatar = ({ src, alt, size = "md" }) => {
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E1'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizes[size]} relative rounded-full overflow-hidden bg-gray-100`}
    >
      <Image
        src={src || defaultAvatar}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 48px) 100vw"
        priority={size === "lg"}
      />
    </div>
  );
};

// Company Logo Component
const CompanyLogo = ({ company, logo }) => {
  const defaultLogo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E1'%3E%3Cpath d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z'/%3E%3C/svg%3E";

  return (
    <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100">
      <Image
        src={logo || defaultLogo}
        alt={company}
        fill
        className="object-cover"
        sizes="(max-width: 40px) 100vw"
      />
    </div>
  );
};

const DashboardPage = () => {
  const router = useRouter();

  const sidebarItems = [
    { label: "Dashboard", icon: "⬚", active: true },
    { label: "Your Profile", icon: "👤" },
    { label: "Applied Jobs", icon: "💼" },
    { label: "Saved Jobs", icon: "🔖" },
    { label: "View Resume", icon: "📄" },
    { label: "Messages", icon: "💬" },
    { label: "Settings", icon: "⚙️" },
  ];

  const stats = [
    {
      label: "Applied Jobs",
      value: "500",
      icon: "💼",
      color: "bg-[#EBF5FF]",
      textColor: "text-[#0B66FF]",
    },
    {
      label: "Saved Jobs",
      value: "50",
      icon: "🔖",
      color: "bg-[#F5F0FF]",
      textColor: "text-[#7B3FF3]",
    },
    {
      label: "Messages",
      value: "05",
      icon: "💬",
      color: "bg-[#E7F7E7]",
      textColor: "text-[#17B31B]",
    },
    {
      label: "Review CV",
      value: "100",
      icon: "🔍",
      color: "bg-[#FFF9EB]",
      textColor: "text-[#FFB800]",
    },
  ];

  const appliedJobs = [
    {
      company: "Zorto",
      role: "UI UX Designer",
      date: "06/Dec/2024",
      status: "In Review",
      logo: "/companies/zorto.png",
    },
    {
      company: "Alexa PVT LTD",
      role: "Web Developer",
      date: "07/Jun/2024",
      status: "In Review",
      logo: "/companies/hicom.png",
    },
    {
      company: "Ecom Softwares",
      role: "Front End Developer",
      date: "06/Dec/2023",
      status: "Shortlisted",
      logo: "/companies/infra.png",
    },
    {
      company: "HW kalt",
      role: "Sales Head",
      date: "08/Mar/2024",
      status: "In Review",
      logo: "/companies/hicom.png",
    },
    {
      company: "Stop.vo",
      role: "Marketing Manager",
      date: "08/Apr/2024",
      status: "Rejected",
      logo: "/companies/stopvo.png",
    },
    {
      company: "Infrared",
      role: "Purchase Head",
      date: "06/Mar/2024",
      status: "In Review",
      logo: "/companies/infra.png",
    },
    {
      company: "Novo",
      role: "Marketing Manager",
      date: "05/Jul/2024",
      status: "IN Review",
      logo: "/companies/infra.png",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return "text-[#17B31B]";
      case "in review":
        return "text-[#0B66FF]";
      case "rejected":
        return "text-[#FF0000]";
      default:
        return "text-[#0B66FF]";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
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
                <Avatar src="/users/user.jpg" alt="Profile" size="md" />
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
            {/* Welcome Section */}
            <div className="flex items-center space-x-4 mb-8">
              <Avatar src="/users/user.jpg" alt="Profile" size="lg" />
              <div>
                <h2 className="text-xl font-semibold">Welcome Back Jack</h2>
                <p className="text-gray-600">Overview your profile</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${stat.color} rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{stat.label}</span>
                    <span className={`text-2xl ${stat.textColor}`}>
                      {stat.icon}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Applied Jobs Table */}
            <div className="bg-white rounded-lg">
              <h3 className="text-lg font-semibold mb-6">
                Current Applied Jobs
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-4">Company Name & Job Title</th>
                    <th className="pb-4">Applied Date</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <CompanyLogo company={job.company} logo={job.logo} />
                          <div>
                            <p className="font-semibold">{job.company}</p>
                            <p className="text-gray-600">{job.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{job.date}</td>
                      <td className="py-4">
                        <span className={getStatusColor(job.status)}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-[#0B66FF]">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center text-gray-600">
                  <span className="mr-2">←</span>
                  Previous
                </button>
                <div className="flex items-center space-x-4">
                  <span className="text-[#0B66FF]">1</span>
                  <span className="text-gray-600">2</span>
                  <span className="text-gray-600">3</span>
                  <span className="text-gray-600">...</span>
                  <span className="text-gray-600">221</span>
                </div>
                <button className="flex items-center text-gray-600">
                  Next
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
