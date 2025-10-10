import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { signInUser } from "../../features/authSlice";
import Picture from "./picture";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  useEffect(() => {
    if (currentUser) navigate("/shoppingList");
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left half: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2 sm:gap-0">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-purple-500" />
                <span>Remember me</span>
              </label>
              <a
                href="/forgot"
                className="text-purple-600 hover:text-purple-800 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
            >
              {status === "loading" ? "Signing In..." : "Sign In"}
            </button>

            {/* Error/Success Messages */}
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
            {currentUser && (
              <p className="text-green-600 text-sm mt-2 text-center">
                Logged in as {currentUser.username}
              </p>
            )}
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>

      {/* Right half: Picture */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-50 p-6 md:p-12">
        <Picture />
      </div>
    </div>
  );
};

export default LoginForm;
