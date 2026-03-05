import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { signUpUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Picture from "../../components/login/picture";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.auth
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
    if (currentUser) navigate("/shoppingList");
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-500 mb-8">Fill in your details</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            <button className="w-full py-3 bg-purple-600 text-white rounded-xl">
              {status === "loading" ? "Registering..." : "Register"}
            </button>

            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>

          <p className="mt-4 text-center">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-50 p-8">
        <Picture />
      </div>
    </div>
  );
};

export default RegisterForm;