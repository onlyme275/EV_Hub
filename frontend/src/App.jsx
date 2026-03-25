import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./dashboard/AdminDashboard";
import PassengerDashboard from "./dashboard/PassengerDashboard";
import DriverDashboard from "./dashboard/DriverDashboard";
import Home from "./components/home/Home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

