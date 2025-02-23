"use client";
import { useState, useEffect } from "react";

const OTPVerificationStep = ({ email, onBack, onNext }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[name="otp-${index + 1}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp-${index - 1}"]`
      );
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://nghr.onrender.com/company/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyEmail: email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to resend OTP");
      }

      // Reset timer and OTP fields
      setTimeLeft(180);
      setOtp(["", "", "", "", "", ""]);
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://nghr.onrender.com/company/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyEmail: email,
            otp: otpString,
          }),
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || "Invalid OTP");
      }

      if (
        !responseData.success ||
        !responseData.data ||
        !responseData.data.token
      ) {
        throw new Error("Invalid response format");
      }

      const token = responseData.data.token;
      console.log("Token received:", token); // Debug log

      // Store the token and move to next step
      localStorage.setItem("authToken", `Bearer ${token}`);
      onNext(token);
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="mb-6 text-gray-600" type="button">
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-2">Welcome</h1>
      <p className="text-gray-600 mb-2">Login and verify your OTP</p>
      <p className="text-gray-500 mb-8">OTP sent to {email}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-4">Enter OTP</label>
          <div className="flex gap-2 mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border rounded-lg text-lg"
                maxLength={1}
                disabled={loading}
                autoComplete="off"
              />
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="text-teal-600 disabled:text-gray-400"
              disabled={timeLeft > 0 || loading}
              onClick={handleResendOTP}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #05445E 0%, #00A7AC 100%)",
          }}
          className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationStep;
