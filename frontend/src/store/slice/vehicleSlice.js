import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/vehicles/";

/* =======================
   GET ALL VEHICLES
======================= */
export const fetchVehicles = createAsyncThunk(
  "vehicle/fetchVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching vehicles");
    }
  }
);

/* =======================
   CREATE VEHICLE
======================= */
export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating vehicle");
    }
  }
);

/* =======================
   UPDATE VEHICLE
======================= */
export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}${id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating vehicle");
    }
  }
);

/* =======================
   DELETE VEHICLE
======================= */
export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting vehicle");
    }
  }
);

/* =======================
   APPROVE VEHICLE
======================= */
export const approveVehicle = createAsyncThunk(
  "vehicle/approveVehicle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}${id}/approve/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error approving vehicle");
    }
  }
);

/* =======================
   SLICE
======================= */
const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetVehicleState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.vehicles.findIndex(
          (v) => v.id === action.payload.id
        );
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })

      /* APPROVE */
      .addCase(approveVehicle.fulfilled, (state, action) => {
        const id = action.payload?.id || action.meta.arg;
        const index = state.vehicles.findIndex((v) => v.id === id);
        if (index !== -1) {
          if (action.payload?.id) {
            state.vehicles[index] = action.payload;
          } else {
            state.vehicles[index].is_approved = true;
          }
        }
      })

      /* DELETE */
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.vehicles = state.vehicles.filter(
          (v) => v.id !== action.payload
        );

        
      });
  },
});

export const { resetVehicleState } = vehicleSlice.actions;
export default vehicleSlice.reducer;
