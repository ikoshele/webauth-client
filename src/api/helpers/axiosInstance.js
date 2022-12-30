import axios from "axios";
import { useAuthStore } from "@/stores/auth.store.js";
import { refreshTokenHandler } from "@/services/auth.service.js";
import authHeader from "@/api/helpers/authHeader.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true,
  credentials: "include",
  //TODO: Remove Ngrok header
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

function errorHandler(e) {
  const { status, data } = e.response;
  return {
    status,
    data,
  };
}
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const { userLogout, user } = useAuthStore();
    if ([401, 403].includes(error.response?.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      userLogout();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.warn(error, "original error");
    const modifiedError = errorHandler(error);
    return Promise.reject(modifiedError);
  }
);

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url !== "/token-refresh") {
    await refreshTokenHandler();
  }
  const authHeadersObj = authHeader();
  config.headers = { ...config.headers, ...authHeadersObj };
  return config;
});

export { axiosInstance };
