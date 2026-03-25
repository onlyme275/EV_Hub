import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
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
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Admin Dashboard 🛠️
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Welcome */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-2xl font-semibold">
            Welcome Admin 👋 {user?.username}
          </h2>
          <p className="text-gray-500 mt-1">
            Manage users, drivers, and system overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-600">Drivers</h3>
            <p className="text-2xl font-bold mt-2">35</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-600">Passengers</h3>
            <p className="text-2xl font-bold mt-2">85</p>
          </div>

        </div>

        {/* Management Section */}
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">
            System Management
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <button className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
              Manage Users
            </button>

            <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition">
              Manage Drivers
            </button>

            <button className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 transition">
              View Reports
            </button>

          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Recent Activities
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>✔ New user registered</li>
            <li>✔ Driver approved</li>
            <li>✔ System backup completed</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
