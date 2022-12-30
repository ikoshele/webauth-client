<script setup>
import SignUpForm from "@/components/forms/SignUpForm.vue";
</script>

<template>
  <div class="sign-up-block panel-decoration">
    <h2>Or sign up</h2>
    <hr class="hr-gradient" />
    <sign-up-form></sign-up-form>
  </div>
</template>

<style scoped lang="sass">
.sign-up-form
  margin-top: clamp(40px, get-vw(60px), 60px)
</style>
