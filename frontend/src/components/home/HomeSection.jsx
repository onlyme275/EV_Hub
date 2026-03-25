import React from "react";

export default function HomeSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-white">

      {/* BACKGROUND BUS IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1920&auto=format&fit=crop"
          alt="bus background"
          className="w-full h-full object-cover opacity-30 scale-110"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* TEXT */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Smart Transport & Ride System
          </h1>

          <p className="text-gray-300 mb-6">
            A modern platform for managing passengers and drivers with QR-based
            identification, secure authentication, and smooth ride operations.
            Built for efficiency, safety, and convenience.
          </p>

          <div className="flex gap-4">
            <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition">
              Get Started
            </button>
            <button className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>

        {/* CAR IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
            alt="car"
            className="w-[300px] md:w-[420px] drop-shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>

      </div>
    </section>
  );
}

