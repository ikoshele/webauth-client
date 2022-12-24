<script setup>
import { reactive } from "vue";
const formState = reactive({ username: "", password: "", name: "" });
import { useAuthStore } from "@/stores/auth.store.js";

async function formHandler() {
  const { username, password, name } = formState;
  const authStore = useAuthStore();
  const res = await authStore.userRegister(username, password, name);
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
          <input type="text" placeholder="name" v-model="formState.name" />
        </label>
        <label>
          <input
            type="password"
            required
            placeholder="password"
            v-model="formState.password"
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="sass"></style>
