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
    if (!formData.place || !formData.price) return;
    dispatch(createStation(formData));
    setFormData({
      place: "",
      price: "",
      charger_type: "AC",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 text-white font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 animate-fade-in">
          Charging Stations ⚡
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Manage and discover the nearest charging points. High-speed EV infrastructure at your fingertips.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= ADMIN FORM (LEFT) ================= */}
        {isAdmin && (
          <div className="lg:col-span-4 lg:sticky lg:top-8 self-start">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl overflow-hidden relative group">
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 blur-3xl group-hover:bg-cyan-500/40 transition-all duration-700"></div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="p-2 bg-cyan-500/20 rounded-lg">➕</span> Add Station
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Location Name</label>
                  <input
                    value={formData.place}
                    placeholder="e.g. Central Charging Hub"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                    onChange={(e) =>
                      setFormData({ ...formData, place: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Price (20 min session)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">Rs.</span>
                    <input
                      value={formData.price}
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Charger Type</label>
                  <select
                    value={formData.charger_type}
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, charger_type: e.target.value })
                    }
                  >
                    <option value="AC">⚡ AC (Standard)</option>
                    <option value="DC">🚀 DC (Fast Charging)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Detailed Description</label>
                  <textarea
                    value={formData.description}
                    placeholder="Accessibility details, open hours, etc."
                    rows="3"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500 resize-none"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2">
                  Register Station
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= STATIONS LIST (RIGHT) ================= */}
        <div className={`${isAdmin ? "lg:col-span-8" : "lg:col-span-12"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="p-2 bg-blue-500/20 rounded-lg">📋</span> Global Network
            </h2>
            <div className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
              {stations.length} Units Active
            </div>
          </div>

          {stations.length === 0 ? (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-12 rounded-3xl text-center space-y-4">
              <div className="text-6xl animate-bounce">📡</div>
              <h3 className="text-xl font-semibold text-slate-200">No Stations Found</h3>
              <p className="text-slate-400">Be the first to register a new charging hub in the network.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {stations.map((s) => (
                <div 
                  key={s.id} 
                  className="group backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full shadow-lg"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-green-500/20">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Operational
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 rounded-2xl border border-white/10">
                      <span className="text-2xl">🏙️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase truncate max-w-[180px]">
                        {s.place}
                      </h3>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                         Type: <span className={s.charger_type === 'DC' ? 'text-orange-400 font-bold' : 'text-blue-400 font-bold'}>{s.charger_type}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">
                      "{s.description || 'No additional details provided for this location.'}"
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Standard Rate</span>
                      <p className="text-2xl font-black text-white">
                        <span className="text-cyan-400 text-sm font-medium mr-1">Rs.</span>
                        {s.price}
                      </p>
                    </div>
                    <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 group-hover:border-cyan-500/20">
                      View Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
