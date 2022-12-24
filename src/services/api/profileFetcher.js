import { axiosInstance } from "@/services/api/axiosInstance.js";
import authHeader from "@/services/api/authHeader.js";

export async function getProfileData() {
  try {
    const { data } = await axiosInstance.get("/profile", {
      headers: authHeader(),
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
