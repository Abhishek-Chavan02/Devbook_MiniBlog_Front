import axios from "axios";
import Swal from "sweetalert2";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");

      if (store) {
        store.dispatch({ type: "USER_LOGOUT" });
      }

      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your login session has expired. Redirecting to login...",
        showConfirmButton: false,
        timer: 2000, 
        timerProgressBar: true
      });

      setTimeout(() => {
        window.location.pathname = "/login";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
