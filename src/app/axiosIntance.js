import axios from "axios";
import Swal from "sweetalert2";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "https://devbook-minibolg-backend.onrender.com",
  timeout: 10000,
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
    // Only show session expired for non-login requests
    const isLoginRequest = error.config?.url?.includes('/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("otpToken");


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
