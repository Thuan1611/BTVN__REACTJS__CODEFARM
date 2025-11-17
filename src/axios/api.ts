import axios from "axios";
const url = "https://api-class-o1lo.onrender.com/api/thuannh/";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: url,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
