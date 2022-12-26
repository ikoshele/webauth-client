<script setup>
import { reactive } from "vue";

const formState = reactive({
  username: "",
  password: "",
  name: "",
  webAuthState: "",
});
import { useAuthStore } from "@/stores/auth.store.js";
import { webAuthSignUp } from "@/services/webauth.service.js";

async function formHandler() {
  const authStore = useAuthStore();
  const { username, password, name } = formState;
  const res = await authStore.userRegister(username, password, name);
}

async function startWebAuthSignUp() {
  const authStore = useAuthStore();
  const userRecord = await webAuthSignUp(formState.username);
  if (userRecord.accessToken) {
    authStore.userManualLogin(userRecord.accessToken);
  }
}
</script>

<template>
  <section>
    <div class="container">
      <h2>Register page</h2>
      <div>
        <span>username: {{ formState.username }}</span>
        <br />
        <span>password: {{ formState.password }}</span>
        <br />
        <span>status: {{ formState.webAuthState }}</span>
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
          <input type="text" placeholder="name" v-model="formState.name" />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            name="password"
            autocomplete="webauthn password"
            v-model="formState.password"
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <form action="#" @submit.prevent="startWebAuthSignUp">
        <input
          type="text"
          placeholder="Username"
          v-model="formState.username"
        />
        <button type="submit">Sign in passwordless</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
