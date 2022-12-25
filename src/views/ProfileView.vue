<script setup>
import { getProfileData } from "@/services/api/profileFetcher.js";
import { reactive } from "vue";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";
import {
  generateRegistrationOptions,
  verifyDeviceRegistration,
} from "@/services/webauth.service.js";

async function registerUserDevice() {
  const resp = await generateRegistrationOptions();
  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startRegistration(resp);
  } catch (error) {
    // Some basic error handling
    if (error.name === "InvalidStateError") {
      state.webAuthState.status =
        "Error: Authenticator was probably already registered by user";
    } else {
      state.webAuthState.status = error;
    }
    throw error;
  }
  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyRegistrationResponse()
  const verificationJSON = await verifyDeviceRegistration(attResp);

  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    state.webAuthState.status = "Success!";
  } else {
    state.webAuthState.status = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
      verificationJSON
    )}</pre>`;
  }
  console.log(attResp);
  console.log(resp);
}

const state = reactive({
  userData: {
    id: "",
    username: "",
    name: "",
  },
  webAuthState: {
    status: "",
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
      <hr />
      <div>WebAuthState: {{ state.webAuthState.status }}</div>
      <button @click="registerUserDevice">Register device</button>
    </div>
  </section>
</template>
