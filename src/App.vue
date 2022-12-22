<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import { reactive } from 'vue';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';

const state = reactive({ status: 'Click to register' });

async function registerUser() {
  const { data: resp } = await axios.get(
    'http://localhost:3000/generate-registration-options'
  );
  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startRegistration(resp);
  } catch (error) {
    // Some basic error handling
    if (error.name === 'InvalidStateError') {
      state.status =
        'Error: Authenticator was probably already registered by user';
    } else {
      state.status = error;
    }

    throw error;
  }
  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyRegistrationResponse()
  const { data: verificationJSON } = await axios.post(
    'http://localhost:3000/verify-registration',
    attResp,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    state.status = 'Success!';
  } else {
    state.status = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
      verificationJSON
    )}</pre>`;
  }
  console.log(attResp);
  console.log(resp);
}

async function authUser() {
  const { data: resp } = await axios.get(
    'http://localhost:3000/generate-authentication-options'
  );
  let asseResp;
  try {
    // Pass the options to the authenticator and wait for a response
    asseResp = await startAuthentication(resp);
  } catch (error) {
    // Some basic error handling
    state.status = error;
    throw error;
  }
  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyAuthenticationResponse()
  let verificationJSON;
  try {
    const { data } = await axios.post(
      'http://localhost:3000/verify-authentication',
      asseResp,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    verificationJSON = data;
  } catch (error: any) {
    state.status = error.response.data.error;
  }

  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    state.status = 'Success login!';
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <div class="status">{{ state.status }}</div>
    <br />
    <button type="button" @click="registerUser()">Register</button>
    <button type="button" @click="authUser()">AuthUser</button>
  </header>

  <main>
    <RouterView />
  </main>
</template>
