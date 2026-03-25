import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, success } = useSelector(
    (state) => state.auth
  );

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 px-4">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Register to get your QR ID
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {typeof error === "string"
              ? error
              : "Registration failed"}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm text-center">
            Registration successful 🎉
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="P">Passenger</option>
              <option value="D">Driver</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
