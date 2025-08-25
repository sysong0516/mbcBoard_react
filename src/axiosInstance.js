import axios from "axios";

const axiosInstance = axios.create({
  baseURL:`${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type':'application/json; charset=utf-8'
  }
});

export default axiosInstance;