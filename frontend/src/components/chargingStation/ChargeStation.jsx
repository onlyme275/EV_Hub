import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStations, createStation } from "../../store/slice/chargingSlice";

export default function ChargeStation() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { stations = [] } = useSelector((state) => state.charging || {});

  const [formData, setFormData] = useState({
    place: "",
    price: "",
    charger_type: "AC",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  const isAdmin = user?.role === "A";
  const isDriver = user?.role === "D";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStation(formData));
    setFormData({
      place: "",
      price: "",
      charger_type: "AC",
      description: "",
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      {/* ================= ADMIN FORM ================= */}
      {isAdmin && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Add Charging Station ⚡
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              value={formData.place}
              placeholder="Place"
              className="border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
            />

            <input
              value={formData.price}
              type="number"
              placeholder="Price - 20 min"
              className="border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <select
              value={formData.charger_type}
              className="border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, charger_type: e.target.value })
              }
            >
              <option value="AC">AC</option>
              <option value="DC">DC</option>
            </select>

            <textarea
              value={formData.description}
              placeholder="Description"
              className="border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add Station
            </button>
          </form>
        </div>
      )}

      {/* ================= LIST ================= */}
      {(isDriver || isAdmin) && (
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Charging Stations List</h2>

          {stations.length === 0 ? (
            <p className="text-gray-500">No stations available</p>
          ) : (
            stations.map((s) => (
              <div key={s.id} className="border p-3 rounded mb-2">
                <p>
                  <b>Place:</b> {s.place}
                </p>
                <p>
                  <b>Price:</b> {s.price}
                </p>
                <p>
                  <b>Type:</b> {s.charger_type}
                </p>
                <p>
                  <b>Description:</b> {s.description}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
