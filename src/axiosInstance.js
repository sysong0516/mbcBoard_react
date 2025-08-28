import axios from "axios";
const token = sessionStorage.getItem("jwt");
const axiosInstance = axios.create({
  baseURL:`${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Authorization': token,
    'Content-Type':'application/json; charset=utf-8'
  }
});

export default axiosInstance;