import { useAuthStore } from "@/stores/auth.store.js";

export default function authHeader() {
  const authStore = useAuthStore();
  if (authStore.authenticated && authStore.token) {
    return { Authorization: "Bearer " + authStore.token };
  } else {
    return {};
  }
}
