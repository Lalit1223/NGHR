"use client";
import { useState } from "react";

const EmailVerificationStep = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      // First register the company
      const registerResponse = await fetch(
        "https://nghr.onrender.com/company/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyEmail: email }),
        }
      );

      if (!registerResponse.ok) {
        const data = await registerResponse.json();
        throw new Error(data.message || "Registration failed");
      }

      // Then send OTP
      const otpResponse = await fetch(
        "https://nghr.onrender.com/company/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyEmail: email }),
        }
      );

      if (!otpResponse.ok) {
        const data = await otpResponse.json();
        throw new Error(data.message || "Failed to send OTP");
      }

      onNext(email);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button className="text-gray-600 mb-6">← Back</button>

      <h2 className="text-4xl font-bold mb-2">Welcome</h2>
      <p className="text-gray-600 mb-8">Login and verify your OTP</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-colors mb-6"
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            Login with Google
          </button>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-teal-600">
              Sign Up here!
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmailVerificationStep;
