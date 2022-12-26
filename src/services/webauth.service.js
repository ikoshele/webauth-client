import { axiosInstance } from "@/services/api/axiosInstance.js";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export async function generateRegistrationOptions(username) {
  try {
    const { data } = await axiosInstance.post(
      "/generate-registration-options",
      { username }
    );
    return data;
  } catch (e) {
    return e;
  }
}

export async function verifyDeviceRegistration(regOptions) {
  try {
    const { data } = await axiosInstance.post(
      "/verify-registration",
      regOptions
    );
    return data;
  } catch (e) {
    return e;
  }
}

export async function generateAuthenticationOptions() {
  try {
    const { data } = await axiosInstance.get(
      "/generate-authentication-options"
    );
    return data;
  } catch (e) {
    return e;
  }
}

export async function verifyAuthentication(payload) {
  try {
    const { data } = await axiosInstance.post(
      "/verify-authentication",
      payload
    );
    return data;
  } catch (e) {
    return e;
  }
}

export async function webAuthLogin() {
  const resp = await generateAuthenticationOptions();
  try {
    // Pass the options to the authenticator and wait for a response
    const asseResp = await startAuthentication(resp);

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyAuthenticationResponse()
    return await verifyAuthentication(asseResp);
  } catch (e) {
    return errorHandler(e);
  }
}

export async function webAuthSignUp(username) {
  const resp = await generateRegistrationOptions(username);
  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startRegistration(resp);
  } catch (error) {
    return errorHandler();
  }

  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyRegistrationResponse()
  const verificationJSON = await verifyDeviceRegistration(attResp);

  console.log(verificationJSON);

  if (verificationJSON && verificationJSON.verified) {
    return verificationJSON;
  } else {
    errorHandler("Something went wrong");
  }
}

function errorHandler(error) {
  if (error?.name === "InvalidStateError")
    error = "Error: Authenticator was probably already registered by user";
  return {
    success: false,
    errorMessage: error,
  };
}
