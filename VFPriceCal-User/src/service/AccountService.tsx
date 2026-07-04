import { apiClient } from "../api/APIConfig";

export const getAllAccountByCompany = async (companyId: string) => {
    try{
        const response = await apiClient.get(`/accounts/list/${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get to  discount by company:', error);
        throw error;
    }
}