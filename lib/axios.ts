import axios, { AxiosResponse } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function handleResponse(response: AxiosResponse<any, any>) {
  if (response.status >= 400 && response.status < 600) {
    console.log("response", response);
    throw {
      error: true,
      message: response.data?.error || "Unknown error occurred",
    };
  }
  console.log("response 1", response);
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
    if (error.response.status === 401) {
      await axios.post(`${BASE_URL}refresh`);
    }
    Promise.reject(error)
  }
);

export default axiosInstance;
