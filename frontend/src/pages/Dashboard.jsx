import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { vehicles, chargingStations, roadsideServices, roadUpdates } from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    vehicles: 0,
    stations: 0,
    services: 0,
    updates: 0
  });
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, stationsRes, servicesRes, updatesRes] = await Promise.all([
          vehicles.getAll(),
          chargingStations.getAll(),
          roadsideServices.getAll(),
          roadUpdates.getAll()
        ]);

        setStats({
          vehicles: vehiclesRes.data.length,
          stations: stationsRes.data.length,
          services: servicesRes.data.length,
          updates: updatesRes.data.length
        });

        setRecentUpdates(updatesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'My Vehicles', value: stats.vehicles, icon: '🚗', link: '/my-vehicles', color: 'bg-blue-50' },
    { label: 'Charging Stations', value: stats.stations, icon: '⚡', link: '/charging-stations', color: 'bg-green-50' },
    { label: 'Roadside Services', value: stats.services, icon: '🚨', link: '/roadside-services', color: 'bg-red-50' },
    { label: 'Road Updates', value: stats.updates, icon: '🛣️', link: '/road-updates', color: 'bg-yellow-50' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, {user?.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className={`${card.color} p-6 rounded-xl hover:shadow-md transition-shadow`}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="text-3xl font-bold text-gray-800">{card.value}</div>
            <div className="text-gray-600">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              to="/add-vehicle"
              className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <span className="text-xl mr-3">🚗</span>
              <span className="text-primary-700 font-medium">Register New Vehicle</span>
            </Link>
            <Link
              to="/charging-stations"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-xl mr-3">⚡</span>
              <span className="text-green-700 font-medium">Find Charging Station</span>
            </Link>
            <Link
              to="/road-updates"
              className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <span className="text-xl mr-3">📢</span>
              <span className="text-yellow-700 font-medium">Post Road Update</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Road Updates</h2>
            <Link to="/road-updates" className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentUpdates.length > 0 ? (
              recentUpdates.map((update) => (
                <div key={update.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{update.title}</div>
                  <div className="text-sm text-gray-500 flex justify-between mt-1">
                    <span>{update.district}</span>
                    <span>{new Date(update.date_posted).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent updates</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
