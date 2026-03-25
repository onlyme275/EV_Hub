import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import vehicleReducer from "./slice/vehicleSlice"; 
import chargingReducer from "./slice/chargingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer, 
    charging: chargingReducer,
  }
});