import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "A") navigate("/admin");
    else if (user.role === "P") navigate("/passenger");
    else if (user.role === "D") navigate("/driver");
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {/* BACKGROUND SECTION */}
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* LOGIN CARD */}
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-200 mb-6">
            Login to your account
          </p>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/80 text-white p-3 rounded mb-4 text-sm text-center">
              {typeof error === "string" ? error : "Invalid email or password"}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-gray-200 text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-300 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
