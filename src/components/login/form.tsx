import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ added for navigation
import type { AppDispatch, RootState } from "../../store";
import { signInUser } from "../../features/authSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // ✅ initialize navigation

  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInUser({ username, password }));
  };

  // ✅ Redirect to shoppingList.tsx after successful login
  useEffect(() => {
    if (currentUser) {
      navigate("/shoppingList");
    }
  }, [currentUser, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-140  h-150 p-8 bg-white rounded-lg shadow-md ml-110 mt-33"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
      <p className="text-gray-500 text-sm mb-6">
        Enter your details to access the features of the app
      </p>

      {/* Username */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username :
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password :
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <a href="/forgot" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        {status === "loading" ? "Signing In..." : "Sign In"}
      </button>

      {/* Messages */}
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      {currentUser && (
        <p className="text-green-600 mt-3 text-sm">
          Logged in as {currentUser.username}
        </p>
      )}

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
