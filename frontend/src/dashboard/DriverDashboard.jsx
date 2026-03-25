import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Info from "../components/info/Info";

export default function DriverDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Driver Dashboard 🚗
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">

        {/* Welcome + QR Section */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Welcome Text */}
          <div>
            <h2 className="text-2xl font-semibold">
              Welcome, {user?.username || "Driver"} 👋
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your rides, profile, and QR identity.
            </p>
          </div>
        </div>

        {/* Info Section (Your custom component) */}
        <div className="mb-6">
          <Info />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Total Rides</h3>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Earnings</h3>
            <p className="text-2xl font-bold mt-2">$320</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Rating</h3>
            <p className="text-2xl font-bold mt-2">4.8 ⭐</p>
          </div>

        </div>

      </div>
    </div>
  );
}
