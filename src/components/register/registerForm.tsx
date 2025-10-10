import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Picture from "../../components/login/picture";

const RegisterForm: React.FC = () => {
  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row  ">
      {/* Left half: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 text-sm md:text-base mb-8">
            Fill in your details to create a new account
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="surname"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Full Name
              </label>
              <input
                type="text"
                id="surname"
                placeholder="Enter your full name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm md:text-base"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm md:text-base"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm md:text-base"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm md:text-base"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition text-sm md:text-base"
            >
              {status === "loading" ? "Registering..." : "Register"}
            </button>

            {/* Status messages */}
            {error && (
              <p className="text-red-600 text-sm md:text-base mt-2 text-center">
                {error}
              </p>
            )}
            {currentUser && (
              <p className="text-green-600 text-sm md:text-base mt-2 text-center">
                Account created for {currentUser.email}
              </p>
            )}
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600 text-sm md:text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>

    
      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-50 p-6 sm:p-8 md:p-12 lg:p-16">
        <Picture />
      </div>
    </div>
  );
};

export default RegisterForm;
