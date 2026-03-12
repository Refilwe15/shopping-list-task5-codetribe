import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { signUpUser } from "../../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import registerIcon from "../../assets/loginIcon.png";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser({ surname, email, phone, password }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/shoppingList");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Side - Register Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>

          <p className="text-gray-500 mb-6">
            Fill in your details to get started
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              {status === "loading" ? "Registering..." : "Register"}
            </button>

            {status === "failed" && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-50 p-10">
        <img
          src={registerIcon}
          alt="Register illustration"
          className="max-w-sm"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
