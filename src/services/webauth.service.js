import { axiosInstance } from "@/services/api/axiosInstance.js";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export async function generateRegistrationOptions(username) {
  const { data } = await axiosInstance.post("/generate-registration-options", {
    username,
  });
  return data;
}

export async function verifyDeviceRegistration(regOptions) {
  const { data } = await axiosInstance.post("/verify-registration", regOptions);
  return data;
}

export async function generateAuthenticationOptions() {
  const { data } = await axiosInstance.get("/generate-authentication-options");
  return data;
}

export async function verifyAuthentication(payload) {
  const { data } = await axiosInstance.post("/verify-authentication", payload);
  return data;
}

export async function webAuthLogin(preflight) {
  const resp = await generateAuthenticationOptions();
  let asseResp;
  try {
    // Pass the options to the authenticator and wait for a response
    asseResp = await startAuthentication(resp, preflight);

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyAuthenticationResponse()
  } catch (e) {
    return errorHandler(e);
  }
  return await verifyAuthentication(asseResp);
}

export async function webAuthSignUp(username) {
  const resp = await generateRegistrationOptions(username);
  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startRegistration(resp);
  } catch (e) {
    errorHandler(e);
  }

  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyRegistrationResponse()
  const verificationJSON = await verifyDeviceRegistration(attResp);

  if (verificationJSON && verificationJSON.verified) {
    return verificationJSON;
  } else {
    errorHandler({ error: { message: "Something went wrong" } });
  }
}

function errorHandler(error) {
  if (error?.name === "InvalidStateError") {
    error.message =
      "Error: Authenticator was probably already registered by user";
  }
  throw new Error(error);
}
