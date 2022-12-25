import { axiosInstance } from "@/services/api/axiosInstance.js";
import { startAuthentication } from "@simplewebauthn/browser";
import { setAccessToken } from "@/services/auth.service.js";

export async function generateRegistrationOptions() {
  try {
    const { data } = await axiosInstance.get("/generate-registration-options");
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

function errorHandler(error) {
  return {
    success: false,
    errorMessage: error,
  };
}
