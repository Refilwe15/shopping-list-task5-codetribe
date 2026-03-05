import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { signInUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Picture from "../../components/login/picture";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Handle login submit ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // trim input to avoid whitespace errors
    dispatch(signInUser({ email: email.trim(), password: password.trim() }));
  };

  // --- Navigate on successful login ---
  useEffect(() => {
    console.log("Login status:", status);
    console.log("Current user:", currentUser);
    console.log("Error:", error);

    if (currentUser) {
      navigate("/shoppingList");
    } else if (status === "failed") {
      // clear password field if login failed
      setPassword("");
    }
  }, [currentUser, status, error, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-gray-500 mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-3 rounded-xl text-white ${
                status === "loading"
                  ? "bg-gray-400"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {status === "loading" ? "Signing In..." : "Sign In"}
            </button>

            {status === "failed" && (
              <p className="text-red-600 text-center mt-2">{error}</p>
            )}
          </form>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600">
              Register here
            </a>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-50 p-8">
        <Picture />
      </div>
    </div>
  );
};

export default LoginForm;
