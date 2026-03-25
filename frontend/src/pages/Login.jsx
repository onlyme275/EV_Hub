import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";


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

    if (user.role === "A") {
      navigate("/admin");
    } else if (user.role === "P") {
      navigate("/passenger");
    } else if (user.role === "D") {
      navigate("/driver");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      if (user.role === "A") navigate("/admin");
      if (user.role === "P") navigate("/passenger");
      if (user.role === "D") navigate("/driver");
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {typeof error === "string" ? error : "Invalid email or password"}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
