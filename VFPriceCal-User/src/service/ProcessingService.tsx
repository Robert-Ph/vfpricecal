import { apiClient } from "../api/APIConfig";
import { type category, type processing } from "../model/model";

export const createCategory = async (data: category) => {
    try {
        const response = await apiClient.post('/category', data);
        return response.data; // Assuming the created category is in response.data
    }
    catch (error) {
        console.error('Failed to create category:', error);
        throw error;
    }
};

export const createProcessingByCategory = async (data: processing) =>{
    try{
        const response = await apiClient.post('/processing', data);
        return response.data;

    }catch (error){
        console.error('Failed to create processing by category: ', error);
        throw error;
    }
};

export const getCategories = async (companyId: string) => {
    try {
        const response = await apiClient.get(`/category?companyId=${companyId}`); 
        return response.data; // Assuming the list of categories is in response.data
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

export const getProcessingById = async (processingId: string) => {
    try {
        const response = await apiClient.get(`/processing/${processingId}`); 
        return response.data; // Assuming the processing details are in response.data
    }
    catch (error) {
        console.error('Failed to fetch processing details:', error);
        throw error;
    }
};

export const deleteProcessing = async (id: string, categoryId: string) => {
    try{
        const response = await apiClient.delete(`/processing/${id}?categoryId=${categoryId}`)
        return response.data;
    }catch(error){
        console.error('Failed delete to fetch processing:', error);
        throw error;
    }
}

export const deleteCategoryByCompany = async (id: string, companyId: string) => {
    try{
        const response = await apiClient.delete(`/category/${id}?companyId=${companyId}`);
        return response.data;
    }catch(error){
        console.error('Failed delete to fetch processing:', error);
        throw error;
    }
}

export const updateProcessingById = async (data: processing) => {
    try{
        const response = await apiClient.put(`/processing/update`, data);
        return response.data;
    }catch(error){
         console.error('Failed update to fetch processing:', error);
        throw error;
    }
}