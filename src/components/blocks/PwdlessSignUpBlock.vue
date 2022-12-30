<script setup>
import PwdlessSignUpForm from "@/components/forms/PwdlessSignUpForm.vue";
</script>

<template>
  <div class="pwdless-signup-block">
    <h2>Register passwordless</h2>
    <pwdless-sign-up-form></pwdless-sign-up-form>
  </div>
</template>

<style scoped lang="sass">
form
  margin-top: clamp(40px, get-vw(60px), 60px)
</style>
