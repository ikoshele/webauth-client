<script setup>
import { useAuthStore } from "@/stores/auth.store.js";

const authStore = useAuthStore();
console.log(authStore.authenticated, "isAuthed");
</script>

<template>
  <header>
    <div class="container-main">
      <nav>
        <ul>
          <li>
            <RouterLink class="underline" to="/">Home</RouterLink>
          </li>
          <li v-if="!authStore.authenticated">
            <RouterLink class="underline" to="/login"> Login </RouterLink>
          </li>
          <li v-if="!authStore.authenticated">
            <RouterLink class="underline" to="/register"> Register </RouterLink>
          </li>
          <li>
            <RouterLink class="underline" to="/profile">Profile</RouterLink>
          </li>
          <li v-if="authStore.authenticated">
            <button @click="authStore.userLogout" type="button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="sass">
header
  padding: clamp(14px, get-vw(28px), 28px) 0
  color: var(--accent-color)
  font-size: 14px

nav ul
  display: flex
  align-items: center
  +mediaSize($mobile-width)
    width: 100%
    justify-content: space-between

nav ul li + li
  margin-left: 60px
  +mediaSize($mobile-width)
    margin-left: 0

a,
button
  position: relative

a:hover:before,
a:focus:before,
button:hover:before,
button:focus:before,
.router-link-active:before
  content: ''
  position: absolute
  left: 0
  right: 0
  top: 100%
  height: 2px
  background-color: black
</style>
