import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo / Brand */}
        <h1
          onClick={() => navigate("/")}
          className="text-white text-xl font-bold cursor-pointer tracking-wide hover:opacity-90"
        >
          MyApp
        </h1>

        {/* Menu Items */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 text-white border border-white rounded-lg 
                       hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1.5 bg-white text-blue-600 rounded-lg font-medium 
                       hover:bg-blue-100 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
