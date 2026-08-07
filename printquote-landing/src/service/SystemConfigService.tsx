import { apiClient } from "../api/APIConfig";
import type {  SubscriTrailOrBetaRequest } from "../api/ConfigModal";

export const getAllSystemConfig = async () => {
    try{
        const response = await apiClient.get('/public/system-config');
        return response.data;

    }catch(error){
        console.error('Error fetching companies:', error);
        throw error;
    }
}


export const getAllPlan = async () => {
    try{
        const response = await apiClient.get('/public/plan');
        return response.data;
    }catch(error){
        console.error('Error fetching companies:', error);
        throw error;
    }
}


export const createTrail = async (data: SubscriTrailOrBetaRequest) => {
    try{
        const response = await apiClient.post('/public/trail',data);
        return response.data;
    }catch(error){
        console.error("Lỗi khi tạo tài khoản!");
        throw error;
    }
}