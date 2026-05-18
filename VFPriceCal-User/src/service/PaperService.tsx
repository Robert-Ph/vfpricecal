import { apiClient } from "../api/APIConfig";

export const createPaper = async (companyId: number, name: string, gsm: string, paperSizes: { width: number; height: number; price: number }[]) => {
    try {
        const response = await apiClient.post('/papers', { companyId, name,  gsm, paperSizes });
        return response.data; // Assuming the created paper is in response.data
    }
    catch (error) {
        console.error('Failed to create paper:', error);
        throw error;
    }
};

export const getPapers = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/papers?companyId=${companyId}`); 
        return response.data; // Assuming the list of papers is in response.data
    }
    catch (error) {
        console.error('Failed to fetch papers:', error);
        throw error;
    }
};

export const getPaperById = async (paperId: number) => {
    try {
        const response = await apiClient.get(`/papers/${paperId}`); 
        return response.data; // Assuming the paper details are in response.data
    }
    catch (error) {
        console.error('Failed to fetch paper details:', error);
        throw error;
    }
};

export const deletePaper = async (id: number, comapanyId: number) => {
    try{
        const response = await apiClient.delete(`/papers/${id}?companyId=${comapanyId}`)
        return response.data;
    }catch(error){
        console.error('Failed to delete paper', error);
        throw error;
    }
}

export const deletePaperSize = async (id: number, paperId: number) => {
    try{
        const response = await apiClient.delete(`/paper-sizes/${id}?paperId=${paperId}`);
        return response.data;
    }catch(error){
        console.error('Failed to delete paper size', error);
        throw error;
    }
}