<script setup>
defineProps({
  text: {
    type: String,
  },
});
</script>

<template>
  <div class="divider-text">
    <span class="line"></span>
    <span class="content">{{ text }}</span>
    <span class="line"></span>
  </div>
</template>

<style scoped lang="sass">
.divider-text
  display: flex
  align-items: center
  margin: 32px 0

.line
  background: linear-gradient(90deg, #CCCCCC 0%, #A6DFC7 52.6%, #94BBD0 100%)
  height: 2px
  flex-grow: 1

.content
  flex-shrink: 0
  font-size: 14px
  margin: 0 20px
</style>
