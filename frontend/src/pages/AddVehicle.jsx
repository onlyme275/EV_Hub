import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicles } from '../services/api';

function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicle_name: '',
    vehicle_model: '',
    vehicle_number: '',
    vehicle_type: 'car'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await vehicles.create(formData);
      setVehicle(response.data.vehicle);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register vehicle');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (vehicle?.qr_code_url) {
      const link = document.createElement('a');
      link.href = vehicle.qr_code_url;
      link.download = `ev-hub-qr-${vehicle.vehicle_id}.png`;
      link.click();
    }
  };

  if (vehicle) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Registered!</h2>
          <p className="text-gray-600 mb-6">Your vehicle has been registered successfully.</p>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-sm text-gray-500 mb-1">Vehicle ID</p>
            <p className="text-lg font-mono font-bold text-primary-600">{vehicle.vehicle_id}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">QR Code</p>
            <img
              src={vehicle.qr_code_url}
              alt="Vehicle QR Code"
              className="mx-auto w-48 h-48 border-2 border-primary-200 rounded-lg"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={downloadQR}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              Download QR Code
            </button>
            <button
              onClick={() => navigate('/my-vehicles')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              View My Vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register New Vehicle</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., My Tesla"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.vehicle_name}
              onChange={(e) => setFormData({ ...formData, vehicle_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Model
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Tesla Model 3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.vehicle_model}
              onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g., BA 1 JA 1234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.vehicle_number}
              onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.vehicle_type}
              onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
            >
              <option value="car">Car</option>
              <option value="scooter">Scooter</option>
              <option value="bike">Bike</option>
              <option value="bus">Bus</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
