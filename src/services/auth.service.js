import jwtDecode from "jwt-decode";
import { useAuthStore } from "@/stores/auth.store.js";
import {
  loginRequest,
  signupRequest,
  tokenRefreshRequest,
} from "@/api/auth.api.js";

const ACCESS_TOKEN_KEY = "access_token";

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

export async function login(username, password) {
  const data = await loginRequest(username, password);
  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
  return data;
}

export async function signup(username, password, name) {
  const data = await signupRequest(username, password, name);
  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
  return data;
}

export function logout() {
  removeAccessToken();
}

export async function refreshAccessToken() {
  try {
    const accessToken = await tokenRefreshRequest();
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
  const refreshThreshold = tokenPayload.exp - tokenPayload.iat - 60; // refresh 1 minute before expiration
  if (currentTime > tokenPayload.exp + refreshThreshold) {
    return await authStore.userRefreshAccessToken();
  }
  return null;
}
