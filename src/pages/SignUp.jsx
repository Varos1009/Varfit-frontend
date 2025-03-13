import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setIsRegister(true);
    try {
      await Register(email, password);
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      console.error("Registration/Login error:", error);
      setEmailError("Error: Email already in use");
      setIsRegister(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-0 mt-2 md:mb-3">Create an Account</h2>

        {emailError &&  <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">{emailError}</div>}
        {passwordError && <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">{passwordError}</div>}

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
              type="password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError && <div className="text-red-500 text-sm">{confirmPasswordError}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-all"
            disabled={isRegister}
          >
            {isRegister ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-red-600">
          <p>Already have an account?</p>
          <button onClick={() => navigate("/login")} className="text-blue-500 hover:text-blue-600 underline">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
