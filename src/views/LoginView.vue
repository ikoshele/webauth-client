<script setup>
import { onMounted, reactive } from "vue";

const formState = reactive({
  username: "",
  password: "",
  webAuthState: {
    status: "",
  },
});
import { useAuthStore } from "@/stores/auth.store.js";
const authStore = useAuthStore();
async function formHandler() {
  const { username, password } = formState;
  const user = await authStore.userLogin(username, password);
}

import { webAuthLogin } from "@/services/webauth.service.js";

onMounted(async () => {
  await startWebAuthLogin(true);
});
async function startWebAuthLogin(preflight) {
  const userRecord = await webAuthLogin(preflight);
  if (userRecord.accessToken) {
    authStore.userManualLogin(userRecord.accessToken);
  }
}
</script>

<template>
  <section>
    <div class="container">
      <h2>Login page</h2>
      <div>
        <span>username: {{ formState.username }}</span>
        <br />
        <span>password: {{ formState.password }}</span>
      </div>
      <form action="#" @submit.prevent="formHandler">
        <label>
          <input
            type="text"
            required
            placeholder="username"
            name="username"
            autocomplete="webauthn username"
            v-model="formState.username"
          />
        </label>
        <label>
          <input
            type="password"
            required
            placeholder="password"
            name="password"
            autocomplete="webauthn password"
            v-model="formState.password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button @click="startWebAuthLogin(false)">Sign in with WebAuth</button>
      <div>{{ formState.webAuthState.status }}</div>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
