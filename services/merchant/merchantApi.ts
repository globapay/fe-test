import axiosInstance from "@/lib/axios";
import {IMerchant} from "@/types/merchant";


export const getMerchantProfile = async (): Promise<IMerchant> => {
    const response = await axiosInstance.get(`/merchants/profile`);
    return response.data;
};

export const putMerchantProfile = async (first_name: string, last_name: string, phone: string): Promise<IMerchant> => {
    const response = await axiosInstance.put(`/merchants/profile`, { first_name, last_name, phone });
    return response.data;
};