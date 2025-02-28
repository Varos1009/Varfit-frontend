import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError(null);
    setPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

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
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setEmailError(`Error: ${error.message}`);
      setIsRegister(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
