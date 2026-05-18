import { apiClient } from "../api/APIConfig";
import {type discountRequest} from "../model/model";

export const createDiscount = async(data: discountRequest): Promise<discountRequest> =>{
    try{
        const response = await apiClient.post('/discount', data);
        return response.data;
    }catch(error){
         console.error('Failed to create discount:', error);
        throw error;
    }
}

export const getAllDiscountByCompany = async (companyId: number) => {
    try{
        const response = await apiClient.get(`/discount?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get to  discount by company:', error);
        throw error;
    }
}

export const deleteDiscount = async (id: number, companyId: number) => {
    try{
        const response = await apiClient.delete(`/discount/${id}?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed delete  discount by company:', error);
        throw error;
    }
}