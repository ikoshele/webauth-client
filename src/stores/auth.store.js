import { defineStore } from "pinia";
import router from "@/router/index.js";
import {
  getAccessToken,
  getAccessTokenPayload,
  isAuthenticated,
  login,
  logout,
  refreshAccessToken,
  setAccessToken,
  signup,
} from "@/services/auth.service.js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticated: isAuthenticated(),
    token: getAccessToken(),
    tokenPayload: getAccessTokenPayload(),
  }),
  actions: {
    async userRegister(username, password, name) {
      const data = await signup(username, password, name);
      console.log(data, "pinia");
      if (data.id) {
        this.successRedirect();
      }
      return data;
    },
    async userLogin(username, password) {
      const data = await login(username, password);
      console.log(data, "pinia");
      if (data.id) {
        this.successRedirect();
      }
      return data;
    },
    userLogout() {
      logout();
      this.authenticated = false;
      this.token = null;
      this.tokenPayload = null;
      router.push("/login");
    },
    async userRefreshAccessToken() {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        this.updateUserData();
        return newAccessToken;
      } else {
        this.userLogout();
      }
    },
    updateUserData() {
      this.authenticated = isAuthenticated();
      this.token = getAccessToken();
      this.tokenPayload = getAccessTokenPayload();
    },
    successRedirect() {
      this.updateUserData();
      router.push("/");
    },
    userManualLogin(accessToken) {
      setAccessToken(accessToken);
      this.updateUserData();
      if (this.authenticated) this.successRedirect();
    },
  },
});
