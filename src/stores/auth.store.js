import { defineStore } from "pinia";
import router from "@/router/index.js";
import {
  getAccessToken,
  getAccessTokenPayload,
  isAuthenticated,
  login,
  logout,
  refreshAccessToken,
  signup,
} from "@/services/auth.service.js";

function updateUserData(state) {
  state.authenticated = isAuthenticated();
  state.token = getAccessToken();
  state.tokenPayload = getAccessTokenPayload();
}

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
        updateUserData(this);
        await router.push("/");
      }
      return data;
    },
    async userLogin(username, password) {
      const data = await login(username, password);
      console.log(data, "pinia");
      if (data.id) {
        updateUserData(this);
        await router.push("/");
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
        updateUserData(this);
        return newAccessToken;
      } else {
        this.userLogout();
      }
    },
  },
});
