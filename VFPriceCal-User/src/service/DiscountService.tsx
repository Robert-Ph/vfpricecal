import { apiClient } from "../api/APIConfig";
import {type discountRanges, type discountRequest} from "../model/model";

export const createDiscount = async(data: discountRequest) =>{
    try{
        const response = await apiClient.post('/discount', data);
        return response.data;
    }catch(error){
        console.error('Failed to create discount:', error);
        throw error;
    }
}

export const getAllDiscountByCompany = async (companyId: string) => {
    try{
        const response = await apiClient.get(`/discount?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get to  discount by company:', error);
        throw error;
    }
}

export const getDetailByDiscountId = async (id: string) => {
    try{
        const response = await apiClient.get(`/discount/${id}`);
        return response.data;
    }catch(error){
        console.error('Failed get to detail  discount by id:', error);
        throw error;
    }
}

export const deleteDiscount = async (id: string, companyId: string) => {
    try{
        const response = await apiClient.delete(`/discount/${id}?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed delete  discount by company:', error);
        throw error;
    }
}

export const createDiscountRange = async (data: discountRanges) =>{
    try{
        const response = await apiClient.post(`/discount/create-range`, data);
        return response.data;
    }catch(error){
        console.error('Failed to create discount:', error);
        throw error;
    }
}

export const updateDiscountRange = async (data: discountRanges) =>{
    try{
        const response = await apiClient.put(`/discount/update`,data);
        return response.data;

    }catch(error){
        console.error('Failed to update discount range:', error);
        throw error;
    }
}


export const deleteDiscountRange = async (id: string) => {
    try{
        const response = await apiClient.delete(`/discount/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Failed delete  discount range by company:', error);
        throw error;
    }
}