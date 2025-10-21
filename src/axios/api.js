import axios from "axios";
const url = "https://api-class-o1lo.onrender.com/api/thuannh/";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: url,
});
export default api;
