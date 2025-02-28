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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 text-white text-2xl hover:text-red-500"
        title="Close"
      >
        ✖
      </button>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-yellow-400">LOGIN</h1>

        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mt-3">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-4">
            <label className="block text-white text-left">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold py-2 rounded hover:bg-yellow-400 transition"
            disabled={isSignIn}
          >
            {isSignIn ? "Signing in..." : "Submit"}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-white">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-red-400 hover:text-red-500 underline"
          >
            Register
          </button>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="mt-5 w-full bg-white text-gray-800 font-medium py-2 flex items-center justify-center rounded-lg hover:bg-gray-200 transition"
          disabled={isSignIn}
        >
          <img
            src={GoogleIcon}
            alt="Google"
            className="w-8 h-8 mr-2"
          />
          {isSignIn ? "Signing in with Google..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
