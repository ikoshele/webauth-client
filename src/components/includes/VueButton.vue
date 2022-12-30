<script setup>
defineProps({
  htmlTag: {
    type: String,
    default: "button",
  },
  buttonType: {
    type: String,
  },
});
</script>

<template>
  <component :is="htmlTag" :type="buttonType" class="vue-button">
    <slot></slot>
  </component>
</template>

<style scoped lang="sass">
.vue-button
  background: var(--accent-color)
  color: white
  font-size: 14px
  font-weight: 700
  text-align: center
  padding: 13px
  border-radius: 30px
  z-index: 0
  position: relative
  transition: color .2s ease-in-out
  overflow: hidden

.vue-button:before
  content: ''
  position: absolute
  left: 0
  top: 0
  bottom: 0
  width: 100%
  z-index: -1
  border-radius: inherit
  //background: linear-gradient(68.94deg, #C3AAB2 -4.77%, #99EECC 46.72%, #80C0C8 90.23%, #4B8BFA 134.46%)
  background: linear-gradient(90deg, #698BE2 0%, #C8A6FF 40.1%, #D5A4A4 75%, #E0BF7E 100%)
  opacity: 0
  transition: opacity .2s ease-in-out

.vue-button:hover:before,
.vue-button:focus:before
  opacity: 1

button :deep(svg)
  width: 1.45em
  height: 1.45em
</style>
