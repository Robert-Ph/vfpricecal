
import { apiClient } from "../api/APIConfig";
import {type paperSize} from "../model/model";

export const createPaper = async (companyId: string, name: string, gsm: string, paperSizes: { width: number; height: number; price: number }[]) => {
    try {
        const response = await apiClient.post('/papers', { companyId, name,  gsm, paperSizes });
        return response.data; // Assuming the created paper is in response.data
    }
    catch (error) {
        console.error('Failed to create paper:', error);
        throw error;
    }
};

export const getPapers = async (companyId: string) => {
    try {
        const response = await apiClient.get(`/papers?companyId=${companyId}`); 
        return response.data; // Assuming the list of papers is in response.data
    }
    catch (error) {
        console.error('Failed to fetch papers:', error);
        throw error;
    }
};

export const getPaperById = async (paperId: string) => {
    try {
        const response = await apiClient.get(`/papers/${paperId}`); 
        return response.data; // Assuming the paper details are in response.data
    }
    catch (error) {
        console.error('Failed to fetch paper details:', error);
        throw error;
    }
};

export const deletePaper = async (id: number, comapanyId: string) => {
    try{
        const response = await apiClient.delete(`/papers/${id}?companyId=${comapanyId}`)
        return response.data;
    }catch(error){
        console.error('Failed to delete paper', error);
        throw error;
    }
}

export const deletePaperSize = async (id: string, paperId: string) => {
    try{
        const response = await apiClient.delete(`/paper-sizes/${id}?paperId=${paperId}`);
        return response.data;
    }catch(error){
        console.error('Failed to delete paper size', error);
        throw error;
    }
}

export const createOne = async (data: paperSize ) =>{
    try{
        const response = await apiClient.post(`/paper-sizes/create`,data);
        return response.data;
    }catch (error) {
        console.error('Failed to create paper:', error);
        throw error;
    }
}

export const updatePaperSize = async (data: paperSize) =>{
    try{
        const response = await apiClient.put(`/paper-sizes/update`, data);
        return response.data;
    }catch(error){
        console.error('Failed to update paper:', error);
        throw error;
    }
}