import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddVehicle from './pages/AddVehicle';
import MyVehicles from './pages/MyVehicles';
import ChargingStations from './pages/ChargingStations';
import RoadsideServices from './pages/RoadsideServices';
import RoadUpdates from './pages/RoadUpdates';
import PublicVehicle from './pages/PublicVehicle';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/vehicle/public/:vehicleId" element={<PublicVehicle />} />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/*" element={
              user ? (
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 ml-64">
                    <Navbar />
                    <main className="p-6 mt-16">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-vehicle" element={<AddVehicle />} />
                        <Route path="/my-vehicles" element={<MyVehicles />} />
                        <Route path="/charging-stations" element={<ChargingStations />} />
                        <Route path="/roadside-services" element={<RoadsideServices />} />
                        <Route path="/road-updates" element={<RoadUpdates />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            } />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
