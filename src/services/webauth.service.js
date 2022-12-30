import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyAuthentication,
  verifyDeviceRegistration,
} from "@/api/webauth.api.js";

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
  console.log(asseResp);
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

  let oldCreds = localStorage.getItem("credId");
  oldCreds = oldCreds ? JSON.parse(oldCreds) : [];
  localStorage.setItem(
    "credId",
    JSON.stringify([verificationJSON.credentialID, ...oldCreds])
  );

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
