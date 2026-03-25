import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const vehicles = {
  getAll: () => api.get('/vehicles/my-vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  delete: (id) => api.delete(`/vehicles/${id}`)
};

export const chargingStations = {
  getAll: (params) => api.get('/charging-stations', { params }),
  getById: (id) => api.get(`/charging-stations/${id}`),
  create: (data) => api.post('/charging-stations', data)
};

export const roadsideServices = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`)
};

export const roadUpdates = {
  getAll: (params) => api.get('/updates', { params }),
  create: (data) => api.post('/updates', data),
  delete: (id) => api.delete(`/updates/${id}`)
};

export default api;
