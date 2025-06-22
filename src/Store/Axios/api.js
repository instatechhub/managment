import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://instaconnect-backend.onrender.com/api/v1",
  // baseURL: "https://app.instaconnects.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
