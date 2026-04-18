import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    process.env.VITE_API_URL ||
    "https://streamora-6ero.onrender.com/api",
});

export default API;