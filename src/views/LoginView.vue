<script setup>
import { onMounted, reactive } from "vue";
import { webAuthLogin } from "@/services/webauth.service.js";
import { useAuthStore } from "@/stores/auth.store.js";

const formState = reactive({
  username: "",
  password: "",
});
const authStore = useAuthStore();
async function basicAuthHandler() {
  const { username, password } = formState;
  try {
    await authStore.userLogin(username, password);
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await startWebAuthLogin(true);
});
async function startWebAuthLogin(preflight) {
  try {
    const userRecord = await webAuthLogin(preflight);
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
      <h2>Login page</h2>
      <div>
        <span>username: {{ formState.username }}</span>
        <br />
        <span>password: {{ formState.password }}</span>
      </div>
      <form action="#" @submit.prevent="basicAuthHandler">
        <label>
          <input
            type="text"
            placeholder="username"
            name="username"
            autocomplete="webauthn username"
            v-model="formState.username"
          />
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
        <button type="submit">Login</button>
      </form>
      <button @click="startWebAuthLogin(false)">Sign in with WebAuth</button>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
