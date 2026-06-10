
import { apiClient } from "../api/APIConfig";
import { type printPrice, type printPriceRanges } from "../model/model";

export const create = async (data: printPrice) => {
    try{
        const response = await apiClient.post('/print-price', data);
        return response.data;

    }catch(error){
        console.error('Failed to create print price:', error);
        throw error;
    }
}

export const getAllByCompany = async (companyId: string)=>{
    try{
        const response = await apiClient.get(`/print-price?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed get all by company', error);
        throw error;
    }
}

export const deleteByCompany = async (id: string, comapanyId: string) => {
    try{
        const response = await apiClient.delete(`/print-price/${id}?companyId=${comapanyId}`);
        return response.data;
    }catch(error){
        console.error('Failed delete print price by company', error);
        throw error;
    }
}

export const getById = async (id: string) => {
    try{
        const response = await apiClient.get(`/print-price/${id}`);
        return response.data;
    }catch(error){
        console.error('Failed to fetch print price details:', error);
        throw error;
    }
}

export const createOneRange = async (data: printPriceRanges) => {
    try{
        const response = await apiClient.post(`/print-price/new-range`, data);
        return response.data;

    }catch(error){
        console.error('Failed to create print price:', error);
        throw error;
    }
}

export const deleteOnrRange = async (id: string) => {
    try{
        const response = await apiClient.delete(`/print-price/delete-range/${id}`);
        return response.data;

    }catch(error){
        console.error('Failed to delete print range price:', error);
        throw error;
    }
}

export const updateRange = async (data: printPriceRanges) =>{
    try{
        const response = await apiClient.put(`/print-price/update`, data);
        return response.data;
    }catch(error){
        console.error('Failed to update print range price:', error);
        throw error;
    }
}