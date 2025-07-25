import axiosInstance from "@/lib/axios";
import {IMerchant} from "@/types/merchant";


export const getMerchantProfile = async (): Promise<IMerchant> => {
    const response = await axiosInstance.get(`/merchants/profile`);
    return response.data;
};