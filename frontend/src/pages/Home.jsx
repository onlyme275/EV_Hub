import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-primary-700">EV Hub Nepal</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="py-20 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Your Complete EV Solution
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Find charging stations, roadside assistance, and connect with the EV community in Nepal.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-primary-600 text-white text-lg rounded-xl hover:bg-primary-700 font-semibold transition-colors shadow-lg"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Charging Stations</h3>
            <p className="text-gray-600">Find EV charging stations across Nepal with real-time availability.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Roadside Assistance</h3>
            <p className="text-gray-600">Quick access to emergency towing and mechanic services.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🛣️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Road Updates</h3>
            <p className="text-gray-600">Stay informed about road conditions and community updates.</p>
          </div>
        </div>

        <div className="py-12 text-center text-gray-500">
          <p>© 2024 EV Hub Nepal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
