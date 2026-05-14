import { apiClient } from "../api/APIConfig";
import { type category } from "../model/model";

export const createCategory = async (data: category): Promise<category> => {
    try {
        const response = await apiClient.post('/category', data);
        return response.data; // Assuming the created category is in response.data
    }
    catch (error) {
        console.error('Failed to create category:', error);
        throw error;
    }
};

export const getCategories = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/category?companyId=${companyId}`); 
        return response.data; // Assuming the list of categories is in response.data
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

export const getProcessingById = async (processingId: number) => {
    try {
        const response = await apiClient.get(`/processing/${processingId}`); 
        return response.data; // Assuming the processing details are in response.data
    }
    catch (error) {
        console.error('Failed to fetch processing details:', error);
        throw error;
    }
};