<script setup>
import { getProfileData } from "@/services/api/profileFetcher.js";
import { reactive } from "vue";

const state = reactive({
  userData: {
    id: "",
    username: "",
    name: "",
  },
});

getProfileData().then((res) => {
  if (res && res.userRecord) {
    state.userData = { ...res.userRecord };
  }
});
</script>

<template>
  <section>
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
    </div>
  </section>
</template>
