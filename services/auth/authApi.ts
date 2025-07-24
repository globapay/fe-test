import axiosInstance from "@/lib/axios";
import {getCookie} from "@/lib/cookies";
import {Cookie} from "lucide-react";

export const authMerchantRegister = async (
  data: any
): Promise<{
  status_code: number;
  detail: string;
  headers: any;
}> => {
  const response = await axiosInstance.post(
    "/auth/merchant-registration",
    data
  );
  return response.data;
};

export const signIn = async (
  data: any
): Promise<{
  status: string;
  message: string;
  data: string;
}> => {
  const response = await axiosInstance.post(`/auth/sign-in`, data);
  return response.data;
};

export const logOut = async (): Promise<any> => {
  const response = await axiosInstance.post(`/auth/logout`);
  return response.data;
};

export const getInfo = async (): Promise<any> => {
  const response = await axiosInstance.post(`/auth/sessioninfo`);
  return response.data;
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const cookies = await checkCookies();
    return !!cookies?.cookies?.sAccessToken;
  } catch (error) {
    return false;
  }
}

export const checkCookies = async (): Promise<any> => {
  const response = await axiosInstance.get(`/auth/check-cookies`);
  return response.data;
};

export const authTestCookies = async (): Promise<any> => {
  const response = await axiosInstance.get(`/auth/test-cookies`);
  return response.data;
};

export const getSSOUrl = async (): Promise<string> => {
  const response = await axiosInstance.get(`/auth/sso-url`);
  return response.data.data;
};
