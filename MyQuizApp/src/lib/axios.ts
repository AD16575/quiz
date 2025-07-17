// src/lib/axios.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://myquiz-backend-producation.up.railway.app/api"; // 👈 Replace with your API root

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token management functions
export const TokenManager = {
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};

// Add interceptors for auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip token for auth endpoints
    const isAuthEndpoint = config.url?.includes("/auth/");

    if (!isAuthEndpoint) {
      const token = await TokenManager.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    console.log(
      `🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`,
    );
    console.log("📦 Request data:", config.data);

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
