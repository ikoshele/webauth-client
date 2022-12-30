import { axiosInstance } from "@/api/helpers/axiosInstance.js";

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
