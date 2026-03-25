import React from "react";

export default function WhyUs() {
  const features = [
    {
      title: "QR-Based Identification",
      desc: "Each user gets a unique QR code for quick and secure identification during travel.",
      icon: "📱",
    },
    {
      title: "Role-Based Access",
      desc: "Separate dashboards for Admin, Driver, and Passenger for better management.",
      icon: "🔐",
    },
    {
      title: "Fast & Efficient",
      desc: "Quick login, registration, and ride management system designed for performance.",
      icon: "⚡",
    },
    {
      title: "Secure System",
      desc: "Authentication ensures your data and identity remain protected.",
      icon: "🛡️",
    },
    {
      title: "User Friendly UI",
      desc: "Simple and intuitive interface for smooth user experience across devices.",
      icon: "🎯",
    },
    {
      title: "Smart Transport Solution",
      desc: "Manage passengers, drivers, and transport operations in one place.",
      icon: "🚗",
    },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <div className="fixed top-200 left-4 w-100 h-14 bg-amber-100 flex items-center justify-center z-50 shadow-md hover:bg-amber-200">
        <span className="text-2xl font-bold">Mama Car's</span>
      </div>

      {/* CONTENT */}
      <section className="pt-24 py-16 bg-gray-100">
        <div className="container mx-auto px-6">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our System?
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}
