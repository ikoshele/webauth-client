<script setup>
import { RouterView } from "vue-router";
import HeaderMain from "@/components/generic/HeaderMain.vue";
import GradientBackground from "@/components/includes/GradientBackground.vue";
</script>

<template>
  <div class="background">
    <gradient-background></gradient-background>
  </div>
  <HeaderMain></HeaderMain>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="sass">
.background
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  overflow: hidden
  z-index: -1

main
  margin-top: clamp(18px, get-vw(32px), 32px)
  margin-bottom: clamp(30px, get-vw(60px), 60px)
</style>
