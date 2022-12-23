import { axiosInstance } from "@/services/api/axiosInstance.js";
import authHeader from "@/services/api/authHeader.js";

export async function getPrivateData() {
  try {
    const { data } = await axiosInstance.get("/private", {
      headers: authHeader(),
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
