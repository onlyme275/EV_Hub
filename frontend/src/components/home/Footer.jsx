import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-12 mt-10">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              EV Hub
            </h2>
            <p className="text-sm leading-relaxed">
              A smart transport management system connecting passengers and drivers
              with QR-based identification, secure login, and seamless operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Home</li>
              <li className="hover:text-green-600 cursor-pointer">About</li>
              <li className="hover:text-green-600 cursor-pointer">Services</li>
              <li className="hover:text-green-600 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Contact
            </h3>
            <p className="text-sm">Email: mama@gmail.com</p>
            <p className="text-sm">Phone: +977-9839477138</p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-xl">
              <span className="cursor-pointer hover:text-blue-500">🌐</span>
              <span className="cursor-pointer hover:text-blue-600">📘</span>
              <span className="cursor-pointer hover:text-pink-500">📸</span>
              <span className="cursor-pointer hover:text-sky-500">🐦</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EV Hub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
