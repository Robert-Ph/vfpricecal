import { apiClient } from "../config/APIConfig";
import  {  type crePlans } from "../config/ModelConfig";

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

export const createPlans = async (planData: crePlans): Promise<crePlans> => {
    try{
        const response = await apiClient.post('/system/plans', planData);
        return response.data;
    }catch(error){
        console.error('Error creating plan:', error);
        throw error;
    }
}