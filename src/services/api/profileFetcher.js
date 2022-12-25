import { axiosInstance } from "@/services/api/axiosInstance.js";

export async function getProfileData() {
  try {
    const { data } = await axiosInstance.get("/profile");
    return data;
  } catch (e) {
    console.log(e);
  }
}
