<script setup></script>

<template>
  <div class="bg-content"></div>
</template>

<style scoped lang="sass">
.bg-content:before
  filter: blur(5px)
  left: 0px
  top: 0px
  content: ""
  display: block
  position: absolute
  z-index: -1
  background-image: linear-gradient(217deg, rgba(255,0,0,0.8), rgba(255,0,0,0) 50.71%),linear-gradient(127deg, rgba(0,255,0,0.5), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,0.8), rgba(0,0,255,0) 70.71%)
  width: 150%
  height: 150%

.bg-content
  position: absolute
  height: 100%
  width: 100%
  animation-name: granimate
  animation-duration: 12s
  animation-timing-function: linear
  animation-iteration-count: infinite
  animation-fill-mode: both

@keyframes granimate
  0%,100%
    transform: translateX(-10%) translateY(-25%)
  25%,75%
    transform: translateX(-25%) translateY(-25%)
  50%
    transform: translateX(-40%) translateY(-40%)
</style>
