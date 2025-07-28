import axios, { AxiosResponse } from "axios";
import {refreshToken} from "@/services/auth/authApi";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function handleResponse(response: AxiosResponse<any, any>) {
  if (response.status >= 400 && response.status < 600) {
    console.log("response", response);
    throw {
      error: true,
      message: response.data?.error || "Unknown error occurred",
    };
  }

  return response;
}

// Main axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add token to each request as a query param
axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    // config.headers.Authorization = Bearer ${STATIC_TOKEN};
  }
  return config;
});

// Handle response
axiosInstance.interceptors.response.use(
  (response) => handleResponse(response),
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        console.log("error", error);
        await refreshToken();
        return await axiosInstance(error.config)
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
