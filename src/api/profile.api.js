import { axiosInstance } from "@/api/helpers/axiosInstance.js";

export async function getProfileData() {
  try {
    const { data } = await axiosInstance.get("/profile");
    return data;
  } catch (e) {
    console.log(e);
  }
}
