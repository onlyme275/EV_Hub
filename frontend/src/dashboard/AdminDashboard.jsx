import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

import Info from "../components/info/Info";
import Vechicle from "../components/vechicle/Vechicle";
import ChargeStation from "../components/chargingStation/ChargeStation";

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

      {/* ================= NAVBAR ================= */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-gray-800">
          Admin Dashboard 🛠️
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {user?.username}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* ================= WELCOME ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">
            Welcome Admin 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Manage system data, approvals, vehicles, and charging stations.
          </p>
        </div>

        {/* ================= INFO SECTION ================= */}
        <Info />

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Drivers</h3>
            <p className="text-2xl font-bold mt-2">35</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-600">Passengers</h3>
            <p className="text-2xl font-bold mt-2">85</p>
          </div>

        </div>

        {/* ================= VEHICLE MANAGEMENT ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Vehicle Approval Management 🚗
          </h3>
          <Vechicle />
        </div>

        {/* ================= CHARGING STATION ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Charging Station Management ⚡
          </h3>
          <ChargeStation />
        </div>

        {/* ================= SYSTEM MANAGEMENT ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
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

        {/* ================= ACTIVITY LOG ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Recent Activities
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>✔ New user registered</li>
            <li>✔ Vehicle approved</li>
            <li>✔ Charging station added</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
