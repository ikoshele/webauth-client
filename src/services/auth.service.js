import jwtDecode from "jwt-decode";
import { axiosInstance } from "@/services/api/axiosInstance.js";
import { useAuthStore } from "@/stores/auth.store.js";

const ACCESS_TOKEN_KEY = "access_token";

function errorHandler(e) {
  console.log(e);
  const { status, data } = e.response;
  return {
    status,
    ...data,
  };
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getAccessTokenPayload() {
  try {
    const token = getAccessToken();
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  const tokenPayload = getAccessTokenPayload();
  //if (!tokenPayload) return false;
  return !!tokenPayload;
  //const currentTime = Date.now().valueOf() / 1000;
  //return tokenPayload.exp > currentTime;
}

export function requireAuth(nextState, replace) {
  if (!isAuthenticated()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export async function login(username, password) {
  try {
    const { data } = await axiosInstance.post("/login", {
      username,
      password,
    });
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return data;
  } catch (e) {
    return errorHandler(e);
  }
}

export async function signup(username, password) {
  try {
    const { data } = await axiosInstance.post("/signup", {
      username,
      password,
    });
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return data;
  } catch (e) {
    return errorHandler(e);
  }
}

export function logout() {
  removeAccessToken();
}

export async function refreshAccessToken() {
  try {
    const { data: accessToken } = await axiosInstance.post("/token-refresh");
    setAccessToken(accessToken);
    return accessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function refreshTokenHandler() {
  const authStore = useAuthStore();
  const tokenPayload = getAccessTokenPayload();
  if (!tokenPayload) return;
  const currentTime = Date.now().valueOf() / 1000;
  //const refreshThreshold = tokenPayload.exp - tokenPayload.iat - 0; // refresh 1 minute before expiration
  if (currentTime > tokenPayload.exp) {
    return await authStore.userRefreshAccessToken();
  }
  return null;
}
