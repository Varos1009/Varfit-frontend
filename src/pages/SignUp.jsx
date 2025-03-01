import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Validate if fields are empty
    if (!email || !password) {
      if (!email) setEmailError("Email must be provided");
      if (!password) setPasswordError("Password must be provided");
      return;
    }

    setIsRegister(true);
    try {
      const userCredential = await Register(email, password);
      const user = userCredential.user;
      console.log("User Registered:", user);
      navigate("/workout");
    } catch (error) {
      console.error("Error registering user:", error);
      setEmailError(`Error: ${error.message}`);
      setIsRegister(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">


      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Create an Account</h2>

        {emailError && (
          <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">
            {emailError}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="text-sm text-blue-500 mt-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="text-sm text-blue-500 mt-1"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide Password" : "Show Password"}
            </button>
            {confirmPasswordError && (
              <div className="text-red-500 text-sm">{confirmPasswordError}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-all"
            onClick={handleSubmit}
            disabled={isRegister}
          >
            {isRegister ? "Signing up..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center text-red-600">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
