import axiosInstance from "@/lib/axios";
import {IMerchant} from "@/types/merchant";


export const getMerchant = async (): Promise<IMerchant> => {
    const response = await axiosInstance.get(`/merchants/`);
    return response.data;
};