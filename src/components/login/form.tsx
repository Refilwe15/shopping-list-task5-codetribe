import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { signInUser } from "../../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import loginIcon from "../../assets/loginIcon.png";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInUser({ email: email.trim(), password: password.trim() }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/shoppingList");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>

          <p className="text-gray-500 mb-6">
            Sign in to continue to your shopping list
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              {status === "loading" ? "Signing In..." : "Sign In"}
            </button>

            {status === "failed" && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-50 p-10">
        <img src={loginIcon} alt="Login illustration" className="max-w-sm" />
      </div>
    </div>
  );
};

export default LoginForm;
