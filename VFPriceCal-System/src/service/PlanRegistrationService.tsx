import { apiClient } from "../config/APIConfig";
import type { plansRegistration } from "../config/ModelConfig";

export const createPlanRegistration = async (companyData: plansRegistration) => {

    try {
        const response = await apiClient.post('/system/register/plan', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


export const getPlanRegistrationById = async (id: string) => {

    try {
        const response = await apiClient.get(`/system/register/plan/${id}` );
        return response.data;
    } catch (error) {
        console.error('Error get company:', error);
        throw error;
    }
};