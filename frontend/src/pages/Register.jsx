import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "P",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) return;
    dispatch(registerUser(form));
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setForm({
        username: "",
        email: "",
        password: "",
        role: "P",
      });
    }
  }, [success]);

  return (
    <>
      <Navbar />

      {/* BACKGROUND */}
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* CARD */}
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account 🚀
          </h2>

          <p className="text-center text-gray-200 mb-6">
            Register to get your QR ID
          </p>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/80 text-white p-3 rounded mb-4 text-sm text-center">
              {typeof error === "string" ? error : "Registration failed"}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-500/80 text-white p-3 rounded mb-4 text-sm text-center">
              Registration successful 🎉
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-green-400 outline-none text-white placeholder-gray-300"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-green-400 outline-none text-white placeholder-gray-300"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-green-400 outline-none text-white placeholder-gray-300"
              />
            </div>

            {/* Role */}
            <div className="mb-6">
              <label className="block mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-green-400 text-white"
              >
                <option value="P">Passenger</option>
                <option value="D">Driver</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-200 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-300 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
