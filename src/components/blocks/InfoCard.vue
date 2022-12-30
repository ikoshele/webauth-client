<script setup></script>

<template>
  <div class="info-card">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
.info-card
  padding: clamp(10px, get-vw(16px), 16px)
  border: 2px solid
  border-image-source: radial-gradient(92.76% 76.25% at 7.24% 21%, #B5D39D 0%, #F1ACAC 25.66%, #BF98C6 54.47%, #7179EF 86.04%, #2833D0 100%)
  border-image-slice: 1
</style>
