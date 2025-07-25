import axiosInstance from "@/lib/axios";
import {ICompany} from "@/types/company";

export const getCompany = async (company_id: string): Promise<ICompany> => {
    const response = await axiosInstance.get(`/companies/${company_id}`);
    return response.data;
};