<script setup>
import BaseErrorMessage from "@/components/formParts/BaseErrorMessage.vue";

defineProps({
  label: {
    type: String,
  },
  stylingType: {
    type: String,
    default: "primary",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <label :class="{ ['field--invalid']: errorMessage }">
    <span v-if="label" class="label-text">{{ label }}</span>
    <span
      class="input-wrapper"
      :class="{ [`input-wrapper--${stylingType}`]: stylingType }">
      <input :placeholder="label" v-bind="$attrs" />
    </span>
    <base-error-message v-if="errorMessage">
      {{ errorMessage }}
      error
    </base-error-message>
  </label>
</template>

<style scoped lang="sass">
.label-text
  font-size: 14px
  font-weight: 700
  margin-bottom: 4px
  color: var(--accent-color)
  line-height: 160%

.input-wrapper
  height: 48px
  width: 100%
  border-radius: 30px
  position: relative
  z-index: 0
  background-color: var(--accent-color)
  display: block

.field--invalid .input-wrapper
  background-color: var(--error-color)

.input-wrapper--secondary
  background: none

.input-wrapper:before
  content: ''
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  border-radius: inherit
  background: linear-gradient(90deg, #CCCCCC 0%, #A6DFC7 52.6%, #94BBD0 100%)
  z-index: -1
  opacity: 0
  transition: opacity .15s ease-in-out

input
  color: var(--accent-color)
  border-radius: inherit
  padding: 0 20px
  height: calc(100% - 4px)
  width: calc(100% - 4px)
  margin: 2px

.input-wrapper:hover:before,
.input-wrapper:focus-within:before
  opacity: 1

label
  display: flex
  flex-direction: column
  align-items: flex-start

label + label
  margin-top: 8px
</style>
