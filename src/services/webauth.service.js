import { axiosInstance } from "@/services/api/axiosInstance.js";

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
