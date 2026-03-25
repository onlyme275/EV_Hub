import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer tracking-wide hover:opacity-80 transition"
        >
          EV Hub
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-blue-600 border border-blue-600 rounded-lg 
                       hover:bg-blue-600 hover:text-white transition duration-300 
                       shadow-sm hover:shadow-md"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium 
                       hover:bg-blue-700 transition duration-300 
                       shadow-md hover:shadow-lg"
          >
            Register
          </button>

        </div>
      </div>
    </nav>
  );
}
