<script setup></script>

<template>
  <p class="error-message">
    <slot></slot>
  </p>
</template>

<style scoped lang="sass">
p
  color: var(--error-color)
  font-size: 12px
</style>
