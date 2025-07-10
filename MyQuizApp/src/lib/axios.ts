// src/lib/axios.ts
import axios from 'axios';

const API_BASE_URL = 'https://myquiz-backend-producation.up.railway.app/api'; // 👈 Replace with your API root

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors (e.g., for auth token)
axiosInstance.interceptors.request.use(
    async (config) => {
        // If you use tokens:
        // const token = await AsyncStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error:', error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
