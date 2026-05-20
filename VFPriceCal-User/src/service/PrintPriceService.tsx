
import { apiClient } from "../api/APIConfig";
import { type printPrice } from "../model/model";

export const create = async (data: printPrice): Promise<printPrice> => {
    try{
        const response = await apiClient.post('/print-price', data);
        return response.data;

    }catch(error){
        console.error('Failed to create print price:', error);
        throw error;
    }
}

export const getAllByCompany = async (companyId: number)=>{
    try{
        const response = await apiClient.get(`/print-price?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get all by company', error);
        throw error;
    }
}

export const deleteByCompany = async (id: number, comapanyId: number) => {
    try{
        const response = await apiClient.delete(`/print-price/${id}?companyId=${comapanyId}`);
        return response.data;
    }catch(error){
        console.error('Failed delete print price by company', error);
        throw error;
    }
}