import { NavLink } from 'react-router-dom';
import { useAuth } from '../App';

function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/add-vehicle', label: 'Add Vehicle', icon: '🚗' },
    { path: '/my-vehicles', label: 'My Vehicles', icon: '🔑' },
    { path: '/charging-stations', label: 'Charging Stations', icon: '⚡' },
    { path: '/roadside-services', label: 'Roadside Assistance', icon: '🚨' },
    { path: '/road-updates', label: 'Road Updates', icon: '🛣️' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-600">EV Hub</h1>
        <p className="text-sm text-gray-500">Nepal's EV Platform</p>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 text-center">
          Logged in as {user?.email}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
