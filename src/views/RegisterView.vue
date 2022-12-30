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
