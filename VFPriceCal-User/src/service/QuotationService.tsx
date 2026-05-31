import { apiClient } from "../api/APIConfig";

export const getQuotations = async (companyId: string) => {
    try {
        const response = await apiClient.get(`/bao-gia/${companyId}`);
        return response.data; // Assuming the list of quotations is in response.data
    } catch (error) {
        console.error('Failed to fetch quotations:', error);
        throw error;
    }
};