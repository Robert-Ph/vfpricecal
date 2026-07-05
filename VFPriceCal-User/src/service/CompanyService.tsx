import { apiClient } from "../api/APIConfig";
import type { updateCompany } from "../model/model";

export const getByCompanyId = async (id: string) => {
    try{
        const response = await apiClient.get(`/companies/${id}`);
        return response.data;
    }catch(error){
        console.error('Failed to fetch print price details:', error);
        throw error;
    }
}

export const getUpdateCompany = async (id: string, data: updateCompany) => {
    try{
        const response = await apiClient.put(`/companies/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Failed to update company details:', error);
        throw error;
    }
}