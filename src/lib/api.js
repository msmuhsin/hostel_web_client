import axios from "axios";

const baseURL = "http://localhost:5000/";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
