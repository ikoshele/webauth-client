<script setup>
import { getPrivateData } from "@/services/api/privateFetcher.js";
import { onMounted, reactive } from "vue";
const state = reactive({ text: "" });
onMounted(async () => {
  const data = await getPrivateData();
  console.log(data);
  if (data) {
    state.text = data.data;
  }
});
</script>

<template>
  <section>
    <div class="container">
      <h1>Private area</h1>
      <p>Private text:</p>
      <span>{{ state.text }}</span>
    </div>
  </section>
</template>
