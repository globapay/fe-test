import axios, { AxiosResponse } from "axios";

export const BASE_URL = `https://bbk.rtrd.pp.ua/`;
export function handleResponse(response: AxiosResponse<any, any>) {
  if (response.status >= 400 && response.status < 600) {
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
  (error) => Promise.reject(error)
);

export default axiosInstance;
