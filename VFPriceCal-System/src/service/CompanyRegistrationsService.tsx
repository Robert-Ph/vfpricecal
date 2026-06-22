import { apiClient } from "../config/APIConfig";
import type { CompaniesRegistration } from "../config/ModelConfig";

export const createCompanyRegistration = async (companyData: CompaniesRegistration) => {

    try {
        const response = await apiClient.post('/system/register/temp', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


export const getCompanyRegistrationById = async (id: string) => {

    try {
        const response = await apiClient.get(`/system/register/temp/${id}` );
        return response.data;
    } catch (error) {
        console.error('Error get company:', error);
        throw error;
    }
};