// store/slice/chargingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/charging-stations/";

export const fetchStations = createAsyncThunk(
  "charging/fetchStations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { access } = getState().auth;
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${access}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch stations");
    }
  }
);

export const createStation = createAsyncThunk(
  "charging/createStation",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { access } = getState().auth;
      const res = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${access}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create station");
    }
  }
);

const chargingSlice = createSlice({
  name: "charging",
  initialState: {
    stations: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.stations = action.payload;
      })
      .addCase(createStation.fulfilled, (state, action) => {
        state.stations.push(action.payload);
      });
  },
});

export default chargingSlice.reducer;
