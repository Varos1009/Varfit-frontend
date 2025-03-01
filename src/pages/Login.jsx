import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login, signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "../assets/Google_Icon.webp";

function LoginPage() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      setError(null);
      try {
        await Login(email, password);
      } catch (err) {
        setError("Invalid login or password.");
      } finally {
        setIsSignIn(false);
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      setError(null);
      try {
        await signInWithGoogle();
      } catch (err) {
        setError("Google sign-in failed. Please try again.");
      } finally {
        setIsSignIn(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Login</h2>

        {error && (
          <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-all"
            disabled={isSignIn}
          >
            {isSignIn ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center text-red-600">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Create one
          </button>
        </div>

        {/* Google Sign-In Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 font-semibold py-3 rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-all"
            disabled={isSignIn}
          >
            <img src={GoogleIcon} alt="Google" className="w-8 h-8 mr-3" />
            {isSignIn ? "Signing in with Google..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
