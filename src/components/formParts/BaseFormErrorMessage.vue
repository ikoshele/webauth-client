<script setup>
defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style scoped lang="sass">
p
  background-color: var(--error-color)
  color: white
  font-size: 12px
  padding: 1px 4px
  display: inline-block
</style>
