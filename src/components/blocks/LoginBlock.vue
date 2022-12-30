<script setup>
import LoginForm from "@/components/forms/LoginForm.vue";
</script>

<template>
  <div class="panel-decoration">
    <h2>Log In</h2>
    <hr class="hr-gradient" />
    <login-form></login-form>
  </div>
</template>

<style scoped lang="sass">
.login-form
  margin-top: clamp(40px, get-vw(60px), 60px)
</style>
