import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

import Info from "../components/info/Info";
import Vehicle from "../components/vechicle/Vechicle";
import ChargeStation from "../components/chargingStation/ChargeStation";

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

      {/* ================= NAVBAR ================= */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-gray-800">
          Driver Dashboard 🚗
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:block">
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
      <div className="p-6 max-w-7xl mx-auto space-y-8">

        {/* ================= WELCOME ================= */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Welcome back, {user?.username || "Driver"} 👋
            </h2>
            <p className="text-blue-100 mt-2">
              Manage your vehicles, view stations, and track your activity.
            </p>
          </div>

          <div className="bg-white text-gray-800 px-5 py-3 rounded-xl shadow">
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-bold text-lg">Driver</p>
          </div>
        </div>

        {/* ================= INFO SECTION ================= */}
        <Info />

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-500 text-sm">Total Rides</h3>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-500 text-sm">Earnings</h3>
            <p className="text-2xl font-bold mt-2">$320</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-500 text-sm">Rating</h3>
            <p className="text-2xl font-bold mt-2">4.8 ⭐</p>
          </div>

        </div>

        {/* ================= VEHICLE SECTION ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Vehicle Management 🚘
          </h2>

          <Vehicle />
        </div>

        {/* ================= CHARGING STATIONS (VIEW ONLY) ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Charging Stations ⚡
          </h2>

          <ChargeStation />
        </div>

      </div>
    </div>
  );
}
