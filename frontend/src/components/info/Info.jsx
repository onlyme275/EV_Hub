import React from "react";
import { useSelector } from "react-redux";

export default function Info() {
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-gray-50 text-gray-500 rounded-xl text-sm text-center">
        No user information found. Please login.
      </div>
    );
  }

  const BASE_URL = "http://localhost:8000";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-6">
        <div className="relative group">
          {user.qr_code ? (
            <img
              src={user.qr_code.startsWith("http") ? user.qr_code : `${BASE_URL}${user.qr_code}`}
              alt="My QR Code"
              className="w-50 h-50 rounded-xl border border-gray-200 group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Active
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{user.username}</h3>
             <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                user.role === 'D' ? 'bg-orange-100 text-orange-600' : 
                user.role === 'P' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {user.role === 'D' ? 'Driver' : user.role === 'P' ? 'Passenger' : 'Admin'}
              </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {user.email}
          </p>
          <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-400">
             <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Verified
             </span>
             <span>ID: {user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}