<script setup>
import BaseInput from "@/components/formParts/BaseInput.vue";
import VueButton from "@/components/includes/VueButton.vue";
import IconFinger from "@/components/icons/iconFinger.vue";
import DividerText from "@/components/includes/DividerText.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import { onMounted, ref } from "vue";
import { webAuthLogin } from "@/services/webauth.service.js";
import BaseFormErrorMessage from "@/components/formParts/BaseFormErrorMessage.vue";

let formError = ref("");

function eraseError() {
  formError.value = "";
}
async function basicAuthHandler() {
  eraseError();
  const authStore = useAuthStore();
  const { username, password } = Object.fromEntries(
    new FormData(event.currentTarget)
  );
  try {
    await authStore.userLogin(username, password);
  } catch (e) {
    formError.value = e.data?.errorMessage;
    console.log(e);
  }
}
async function startWebAuthLogin(preflight = false) {
  eraseError();
  const authStore = useAuthStore();
  try {
    const userRecord = await webAuthLogin(preflight);
    if (userRecord.accessToken) {
      authStore.userManualLogin(userRecord.accessToken);
    }
  } catch (e) {
    formError.value = e.data?.errorMessage;
    console.log(e);
  }
}
onMounted(() => {
  startWebAuthLogin(true);
});
</script>

<template>
  <form action="#" @submit.prevent="basicAuthHandler" class="login-form">
    <BaseFormErrorMessage :error-message="formError"></BaseFormErrorMessage>
    <base-input
      placeholder="Username"
      name="username"
      autocomplete="username webauthn"
      type="text"
      label="Username"></base-input>
    <base-input
      placeholder="Password"
      name="password"
      autocomplete="password webauthn"
      type="password"
      label="Password"></base-input>
    <VueButton html-tag="button" class="submit-btn">Log in</VueButton>
    <div class="secondary-link">
      <router-link to="/register">Don’t have an account? Sign Up</router-link>
    </div>
    <divider-text text="Or"></divider-text>
    <vue-button @click="startWebAuthLogin(false)" button-type="button">
      <icon-finger></icon-finger>
      Passkey
    </vue-button>
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

button
  width: 100%

button svg
  width: 1.45em
  height: 1.45em
  margin-right: 10px
</style>
