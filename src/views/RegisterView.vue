<script setup>
import SignUpBlock from "@/components/blocks/SignUpBlock.vue";
import PwdlessSignUpBlock from "@/components/blocks/PwdlessSignUpBlock.vue";
</script>

<template>
  <section>
    <div class="container-main">
      <div class="register-options">
        <pwdless-sign-up-block class="left-block"></pwdless-sign-up-block>
        <sign-up-block class="right-block"></sign-up-block>
      </div>
    </div>
  </section>
  <!--  <section>
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
  </section>-->
</template>

<style scoped lang="sass">
.register-options
  display: grid
  grid-template-columns: 1fr 1fr
  justify-content: space-between
  gap: 42px
  +mediaSize($small-tablet)
    grid-template-columns: 1fr


.left-block
  max-width: 400px
  +mediaSize($small-tablet)
    max-width: 100%

.right-block
  max-width: 536px
  +mediaSize($small-tablet)
    max-width: 100%
  //backdrop-filter: blur(20px) saturate(160%) contrast(45%) brightness(140%)
</style>
