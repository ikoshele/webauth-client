<script setup>
import ProfileBlock from "@/components/blocks/ProfileBlock.vue";
</script>

<template>
  <section>
    <div class="container-main">
      <profile-block class="profile-panel"></profile-block>
    </div>
  </section>
  <!--  <section>
    <div class="container">
      <h1>Profile page</h1>
      <h3>
        Welcome back <span>{{ state.userData.username }}</span>
      </h3>
      <div>
        id: <span>{{ state.userData.id }}</span>
      </div>
      <div>
        Username: <span>{{ state.userData.username }}</span>
      </div>
      <div>
        Your name: <span>{{ state.userData.name }}</span>
      </div>
      <hr />
      <div>WebAuthState: {{ state.webAuthState.status }}</div>
      <button @click="startWebAuthSignUp">Register device</button>
    </div>
  </section>-->
</template>

<style scoped lang="sass">
.profile-panel
  max-width: 536px
  margin: 0 auto
</style>
