import { apiClient } from "../api/APIConfig";

export const getByCompanyId = async (id: string) => {
    try{
        const response = await apiClient.get(`/companies/${id}`);
        return response.data;
    }catch(error){
        console.error('Failed to fetch print price details:', error);
        throw error;
    }
}