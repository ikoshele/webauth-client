<script setup>
import { reactive } from "vue";
const formState = reactive({ username: "", password: "" });
import { useAuthStore } from "@/stores/auth.store.js";
import router from "@/router/index.js";

async function formHandler() {
  const { username, password } = formState;
  const authStore = useAuthStore();
  const user = await authStore.userLogin(username, password);
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
            v-model="formState.username"
          />
        </label>
        <label>
          <input
            type="password"
            required
            placeholder="password"
            v-model="formState.password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
