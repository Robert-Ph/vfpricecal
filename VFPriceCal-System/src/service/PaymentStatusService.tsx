import { apiClient } from "../config/APIConfig";

export const getAllPaymentStatus = async () => {
    try{
        const response = await apiClient.get('/system/payment-status');
        return response.data;
    }catch(error){
        console.error('Error fetching plans:', error);
        throw error;
    }
}




