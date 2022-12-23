import axios from "axios";
import { useAuthStore } from "@/stores/auth.store.js";
import { refreshTokenHandler } from "@/services/auth.service.js";
import authHeader from "@/services/api/authHeader.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  credentials: "include",
});
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
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url !== "/token-refresh") {
    const newAccessToken = await refreshTokenHandler();
    if (newAccessToken) {
      const newAuthHeader = authHeader();
      delete config.headers.Authorization;
      config.headers = { ...config.headers, ...newAuthHeader };
    }
  }
  return config;
});

export { axiosInstance };
