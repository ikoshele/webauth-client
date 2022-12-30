import { axiosInstance } from "@/services/api/axiosInstance.js";

export async function loginRequest(username, password) {
  const { data } = await axiosInstance.post("/login", {
    username,
    password,
  });
  return data;
}

export async function signupRequest(username, password, name) {
  const { data } = await axiosInstance.post("/signup", {
    username,
    password,
    name,
  });
  return data;
}

export async function tokenRefreshRequest() {
  const { data } = await axiosInstance.post("/token-refresh");
  return data;
}
