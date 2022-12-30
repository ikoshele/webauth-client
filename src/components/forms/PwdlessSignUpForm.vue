<script setup>
import BaseInput from "@/components/formParts/BaseInput.vue";
import VueButton from "@/components/includes/VueButton.vue";
import IconFinger from "@/components/icons/iconFinger.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import { webAuthSignUp } from "@/services/webauth.service.js";
import { useValidator } from "@/composables/validator.js";

const fieldsToValidate = {
  username: "",
};
const { errorsState, validateFields, resetErrors } =
  useValidator(fieldsToValidate);
async function startWebAuthSignUp() {
  resetErrors();
  const authStore = useAuthStore();
  const { username } = Object.fromEntries(new FormData(event.currentTarget));
  try {
    const userRecord = await webAuthSignUp(username);
    if (userRecord.accessToken) {
      authStore.userManualLogin(userRecord.accessToken);
    }
  } catch (e) {
    console.log(e);
    validateFields(e.data?.errors || []);
  }
}
</script>

<template>
  <form action="#" @submit.prevent="startWebAuthSignUp">
    <base-input
      placeholder="Username"
      name="username"
      :error-message="errorsState['username']"
      label="Username"
      stylingType="secondary "></base-input>
    <vue-button button-type="submit">
      <icon-finger></icon-finger>
      Sign Up Passwordless
    </vue-button>
  </form>
</template>

<style scoped lang="sass">
button
  margin-top: 16px
  width: 100%

button svg
  margin-right: 10px
</style>
