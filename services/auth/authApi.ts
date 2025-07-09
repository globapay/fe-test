import axiosInstance from "@/lib/axios";

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

export const getInfo = async (): Promise<any> => {
  const response = await axiosInstance.post(`/auth/sessioninfo`);
  return response.data;
};

export const authTestCookies = async (): Promise<any> => {
  const response = await axiosInstance.get(`/auth/test-cookies`);
  return response.data;
};
