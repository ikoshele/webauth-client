<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth.store.js";
import { webAuthSignUp } from "@/services/webauth.service.js";

const authState = reactive({
  basicAuth: {
    username: "",
    password: "",
    name: "",
  },
  webAuth: {
    username: "",
  },
});

async function basicAuthHandler() {
  const authStore = useAuthStore();
  const { username, password, name } = authState.basicAuth;
  try {
    await authStore.userRegister(username, password, name);
  } catch (e) {
    console.log(e);
  }
}

async function startWebAuthSignUp() {
  const authStore = useAuthStore();
  try {
    const userRecord = await webAuthSignUp(authState.webAuth.username);
    if (userRecord.accessToken) {
      authStore.userManualLogin(userRecord.accessToken);
    }
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <section>
    <div class="container">
      <h2>Register page</h2>
      <div>
        <span>username: {{ authState.basicAuth.username }}</span>
        <br />
        <span>password: {{ authState.basicAuth.password }}</span>
        <br />
      </div>
      <form action="#" @submit.prevent="basicAuthHandler">
        <label>
          <input
            type="text"
            placeholder="username"
            name="username"
            autocomplete="webauthn username"
            v-model="authState.basicAuth.username"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="name"
            v-model="authState.basicAuth.name"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            name="password"
            autocomplete="webauthn password"
            v-model="authState.basicAuth.password"
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <form action="#" @submit.prevent="startWebAuthSignUp">
        <input
          type="text"
          placeholder="Username"
          name="username"
          v-model="authState.webAuth.username"
        />
        <button type="submit">Sign in passwordless</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
