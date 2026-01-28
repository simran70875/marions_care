import axios from "axios";
import { BASE_URL } from "../utils/config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = JSON.parse(
    localStorage.getItem("persist:root") || "{}"
  );

  const auth = state.auth ? JSON.parse(state.auth) : null;
  const token = auth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
