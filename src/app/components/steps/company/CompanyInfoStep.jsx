"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const CompanyInfoStep = ({ token }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",

    // Step 2
    fullName: "",
    companyType: "",
    industry: "",
    sector: "",
    foundationYear: "",
    country: "",
    state: "",
    city: "",
    noOfEmployee: "",
    revenue: "",

    // Step 3
    images: [],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://nghr.onrender.com/company/company-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            companyName: formData.companyName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save company name");
      }

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://nghr.onrender.com/company/company-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            companyType: formData.companyType,
            industry: formData.industry,
            sector: formData.sector,
            foundationYear: formData.foundationYear,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            noOfEmployee: formData.noOfEmployee,
            revenue: formData.revenue,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save company details");
      }

      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const renderStep1 = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#05445E] mb-2">
        Tell Us About Your Company to Get Started
      </h2>
      <p className="text-gray-600 mb-8">
        Fill in the details to create your account
      </p>

      <form onSubmit={handleSubmitStep1} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#05445E] mb-2">
        Tell Us About Your Company to Get Started
      </h2>
      <p className="text-gray-600 mb-8">
        Fill in the details to create your account
      </p>

      <form onSubmit={handleSubmitStep2} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Company Type <span className="text-red-500">*</span>
          </label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC] appearance-none bg-white"
            required
          >
            <option value="">Select company type</option>
            <option value="Private">Private Limited</option>
            <option value="Public">Public Limited</option>
            <option value="Startup">Startup</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC] appearance-none bg-white"
            required
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Sector <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            placeholder="Enter sector"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Foundation Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="foundationYear"
            value={formData.foundationYear}
            onChange={handleChange}
            placeholder="Enter foundation year"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Number of Employees <span className="text-red-500">*</span>
          </label>
          <select
            name="noOfEmployee"
            value={formData.noOfEmployee}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC] appearance-none bg-white"
            required
          >
            <option value="">Select employee range</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Revenue <span className="text-red-500">*</span>
          </label>
          <select
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC] appearance-none bg-white"
            required
          >
            <option value="">Select revenue range</option>
            <option value="$0-$1M">$0-$1M</option>
            <option value="$1M-$10M">$1M-$10M</option>
            <option value="$10M+">$10M+</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-3 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep3 = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#05445E] mb-2">
        Tell Us About Your Company to Get Started
      </h2>
      <p className="text-gray-600 mb-8">
        Fill in the details to create your account
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Upload some pictures of your Company{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-gray-600">Upload Images</span>
            </label>
          </div>

          {formData.images.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter company description"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7AC]"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={() => setStep(4)}
            disabled={
              loading || !formData.description || formData.images.length === 0
            }
            className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
            }}
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold text-[#05445E] mb-4">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-8">
        You have successfully created your account
      </p>

      <button
        onClick={() => router.push("/dashboard/company")}
        className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
        style={{
          background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
        }}
      >
        Continue to Dashboard
      </button>
    </div>
  );

  // Render the current step
  switch (step) {
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    case 3:
      return renderStep3();
    case 4:
      return renderStep4();
    default:
      return null;
  }
};

export default CompanyInfoStep;
