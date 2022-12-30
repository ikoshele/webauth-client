<script setup>
import BaseInput from "@/components/formParts/BaseInput.vue";
import VueButton from "@/components/includes/VueButton.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import { useValidator } from "@/composables/validator.js";

const fieldsToValidate = {
  username: "",
  name: "",
  password: "",
};
const { errorsState, validateFields, resetErrors } =
  useValidator(fieldsToValidate);

async function basicAuthHandler(event) {
  resetErrors();
  const authStore = useAuthStore();
  const { username, password, name } = Object.fromEntries(
    new FormData(event.currentTarget)
  );
  try {
    await authStore.userRegister(username, password, name);
  } catch (e) {
    console.log(e);
    validateFields(e.data?.errors || []);
  }
}
</script>

<template>
  <form action="#" @submit.prevent="basicAuthHandler" class="sign-up-form">
    <base-input
      placeholder="Username"
      name="username"
      type="text"
      :error-message="errorsState['username']"
      label="Username"></base-input>
    <base-input
      placeholder="Name"
      name="name"
      type="text"
      :error-message="errorsState['name']"
      label="Name"></base-input>
    <base-input
      placeholder="Password"
      name="password"
      type="password"
      :error-message="errorsState['password']"
      label="Password"></base-input>
    <VueButton html-tag="button" class="submit-btn">Sign Up</VueButton>
    <div class="secondary-link">
      <router-link to="/login"> Have an account? Sign in </router-link>
    </div>
  </form>
</template>

<style scoped lang="sass">
.submit-btn
  margin-top: 16px
  width: 100%

.secondary-link
  font-size: 14px
  margin-top: 20px
  text-align: center
</style>
