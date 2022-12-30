<script setup>
import VueButton from "@/components/includes/VueButton.vue";
import IconArrowRight from "@/components/icons/iconArrowRight.vue";
import { getProfileData } from "@/services/api/profileFetcher.js";
import { onMounted, reactive } from "vue";
import { webAuthSignUp } from "@/services/webauth.service.js";
import IconCheck from "@/components/icons/iconCheck.vue";

const userData = reactive({
  username: "",
  name: "",
  isDeviceRegistered: false,
});

onMounted(async () => {
  try {
    const { userRecord } = await getProfileData();
    if (userRecord) {
      userData.username = userRecord.username;
      userData.name = userRecord.name;
      let localDevices = localStorage.getItem("credId");
      if (localDevices) {
        localDevices = JSON.parse(localDevices);
        localDevices.forEach((localDevice) => {
          if (userRecord.decodedDevices.includes(localDevice)) {
            userData.isDeviceRegistered = true;
          }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

async function startWebAuthSignUp() {
  if (userData.isDeviceRegistered) return;
  try {
    userData.isDeviceRegistered = await webAuthSignUp();
  } catch (e) {
    console.log(e);
    userData.isDeviceRegistered = false;
  }
}
</script>

<template>
  <div class="panel-decoration">
    <h2>Profile</h2>
    <hr class="hr-gradient" />
    <div class="user-data">
      <div class="user-details">
        <h5>User details:</h5>
        <div>
          <p class="title">Username</p>
          <p class="content">{{ userData.username }}</p>
        </div>
        <div>
          <p class="title">Name</p>
          <p class="content">{{ userData.name }}</p>
        </div>
      </div>
    </div>
    <hr class="hr-gradient block-divider" />
    <p>Register your device and login to the account paswordless</p>
    <VueButton @click="startWebAuthSignUp">
      <span v-if="!userData.isDeviceRegistered">
        Register Device <IconArrowRight></IconArrowRight>
      </span>
      <span v-else>Device Registered <IconCheck></IconCheck></span>
    </VueButton>
  </div>
</template>

<style scoped lang="sass">
.user-data
  margin-top: 30px

.user-details
  margin-top: 20px

.user-details h5
  margin-bottom: 10px

.user-details div + div
  margin-top: 8px

.user-details .title
  font-size: 12px

.user-details .content
  font-size: 16px
  color: var(--accent-color)
p
  font-size: 14px

.block-divider
  margin-top: 40px
  margin-bottom: 20px

button
  margin-top: 20px

button svg
  margin-left: 8px
</style>
