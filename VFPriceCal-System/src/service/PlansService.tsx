import { apiClient } from "../config/APIConfig";

export const getAllPlans = async () => {
    try{
        const response = await apiClient.get('/system/plans');
        return response.data;
    }catch(error){
        console.error('Error fetching plans:', error);
        throw error;
    }
}

export const getPlansById = async (id: string) => {
    try{
        const response = await apiClient.get(`/system/plans/${id}`);
        return response.data;
    }catch(error){
        console.error('Error fetching plans:', error);
        throw error;
    }
}