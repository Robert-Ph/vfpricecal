import { apiClient } from "../config/APIConfig";

export const getAllPaymentMethod = async () => {
    try{
        const response = await apiClient.get('/system/payment-method');
        return response.data;
    }catch(error){
        console.error('Error fetching plans:', error);
        throw error;
    }
}