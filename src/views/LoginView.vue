<script setup>
import LoginBlock from "@/components/blocks/LoginBlock.vue";
</script>

<template>
  <section>
    <div class="container-main">
      <login-block class="login-block"></login-block>
    </div>
    <!--    <div class="container">
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
    </div>-->
  </section>
</template>

<style scoped lang="sass">
.login-block
  width: 100%
  max-width: 536px
  margin: 0 auto
</style>
