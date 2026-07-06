import { apiClient } from "../api/APIConfig";
import type { accountInfo} from "../model/model";

export const getAllAccountByCompany = async (companyId: string) => {
    try{
        const response = await apiClient.get(`/accounts/list/${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get to  discount by company:', error);
        throw error;
    }
}

export const createAccountByCompany = async (accountData: accountInfo) => {
    try{
        const response = await apiClient.post(`/accounts`, accountData);
        return response.data;
    }catch(error){
        console.error('Failed to create account for company:', error);
        throw error;
    }
}