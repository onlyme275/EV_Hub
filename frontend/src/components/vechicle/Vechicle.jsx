import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVehicles,
  createVehicle,
  approveVehicle,
} from "../../store/slice/vehicleSlice";

export default function Vechicle() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { vehicles = [] } = useSelector((state) => state.vehicle || {});

  const [formData, setFormData] = useState({
    vehicle_name: "",
    vehicle_number: "",
    start_point: "",
    end_point: "",
    start_time: "",
    end_time: "",
    phone_number: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Fetch vehicles once
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  console.log("ALL VEHICLES:", vehicles);
  console.log("USER:", user);

  // Roles
  const isAdmin = user?.is_staff === true || user?.role === "admin" || user?.role === "A";
  const isDriver = user?.role === "driver" || user?.role === "D";
  const isPassenger = !isAdmin && !isDriver;

  // Submit vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      user: user?.id, // attach driver
    };

    await dispatch(createVehicle(data));
    setFormData({
      vehicle_name: "",
      vehicle_number: "",
      start_point: "",
      end_point: "",
      start_time: "",
      end_time: "",
      phone_number: "",
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000); // go back to form after 3 seconds
    dispatch(fetchVehicles());
  };

  // Approve vehicle
  const handleApprove = async (id) => {
    await dispatch(approveVehicle(id));
    dispatch(fetchVehicles());
  };

  const approvedVehicles = vehicles.filter((v) => v.is_approved);

  if (!user) {
    return <div className="p-6">Loading user...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Vehicle Management</h1>

      {/* ================= DRIVER ================= */}
      {isDriver && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Driver Section</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid gap-3">

              <input
                placeholder="Vehicle Name"
                className="border p-2 rounded"
                value={formData.vehicle_name}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle_name: e.target.value })
                }
              />

              <input
                placeholder="Vehicle Number"
                className="border p-2 rounded"
                value={formData.vehicle_number}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle_number: e.target.value })
                }
              />

              <input
                placeholder="Start Point"
                className="border p-2 rounded"
                value={formData.start_point}
                onChange={(e) =>
                  setFormData({ ...formData, start_point: e.target.value })
                }
              />

              <input
                placeholder="End Point"
                className="border p-2 rounded"
                value={formData.end_point}
                onChange={(e) =>
                  setFormData({ ...formData, end_point: e.target.value })
                }
              />

              <input
                type="datetime-local"
                className="border p-2 rounded"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              />

              <input
                type="datetime-local"
                className="border p-2 rounded"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              />

              <input
                placeholder="Phone Number"
                className="border p-2 rounded"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />

              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Submit
              </button>
            </form>
          ) : (
            <div className="text-green-600 font-semibold">
              Vehicle submitted successfully ✅
              <p className="mt-2 text-gray-600">
                Waiting for admin approval... Returning to form...
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= ADMIN ================= */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Admin Approval Panel</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Vehicle</th>
                <th className="border p-2">Route</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="text-center">
                  <td className="border p-2">{v.vehicle_name}</td>
                  <td className="border p-2">
                    {v.start_point} → {v.end_point}
                  </td>
                  <td className="border p-2">
                    {v.is_approved ? "Approved" : "Pending"}
                  </td>
                  <td className="border p-2">
                    {!v.is_approved && (
                      <button
                        onClick={() => handleApprove(v.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= PASSENGER ================= */}
      {isPassenger && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Available Vehicles</h2>

          {approvedVehicles.length === 0 ? (
            <p>No approved vehicles available.</p>
          ) : (
            approvedVehicles.map((v) => (
              <div key={v.id} className="border p-3 rounded mb-2">
                <p><b>Name:</b> {v.vehicle_name}</p>
                <p><b>Route:</b> {v.start_point} → {v.end_point}</p>
                <p><b>Contact:</b> {v.phone_number}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
