import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function PassengerDashboard() {
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
          Passenger Dashboard 🚶
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

        {/* Welcome Card */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-2xl font-semibold">
            Welcome, {user?.username || "Passenger"} 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Book rides and manage your trips here.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg cursor-pointer">
            <h3 className="text-gray-600">Book a Ride</h3>
            <p className="text-sm text-gray-500 mt-2">
              Request a new ride instantly
            </p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Book Now
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-600">My Trips</h3>
            <p className="text-2xl font-bold mt-2">12</p>
            <p className="text-sm text-gray-500">Completed rides</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-600">Wallet</h3>
            <p className="text-2xl font-bold mt-2">$45</p>
            <p className="text-sm text-gray-500">Available balance</p>
          </div>

        </div>

        {/* Recent Trips */}
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Recent Trips
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>📍 Bharatpur → Kathmandu</li>
            <li>📍 Chitwan → Pokhara</li>
            <li>📍 Local city ride</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
