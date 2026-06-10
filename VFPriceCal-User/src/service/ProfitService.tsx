import { apiClient } from "../api/APIConfig";
import { type profitRequest } from "../model/model";

export const create = async (data:profitRequest) => {
    try{
        const response = await apiClient.post('/profit', data);
        return response.data;

    }catch(error){
        console.error('Failed to create profit:', error);
        throw error;
    }
}

export const getAllProfitByCompany = async (companyId: string) => {
    try{
        const response = await apiClient.get(`/profit?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed to get all profit:', error);
        throw error;
    }
}

export const deleteProfitByCompany = async (id: string, companyId: string) => {
    try{
        const response = await apiClient.delete(`/profit/${id}?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('failed delete profit by company');
        throw error;
    }
}

export const updateProfitById = async (data :profitRequest) =>{
    try{
        const response = await apiClient.put('/profit/update', data);
        return response.data;
    }catch(error){
        console.error('Failed to create profit:', error);
        throw error;
    }
}