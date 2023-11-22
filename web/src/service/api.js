import axios from "axios";

const api = axios.create({
  baseURL: "https://lottery-api.danielmadureira.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api