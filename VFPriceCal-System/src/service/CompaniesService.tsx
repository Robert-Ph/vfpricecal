import { apiClient} from "../config/APIConfig";
import {type Companies} from "../config/ModelConfig";

export const createCompany = async (companyData: Companies) => {

    try {
        const response = await apiClient.post('/companies', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const getCompanies = async () => {
    try {
        const response = await apiClient.get('/companies');
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};