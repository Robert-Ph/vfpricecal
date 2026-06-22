import { apiClient } from "../config/APIConfig";
import type { paymentRequest } from "../config/ModelConfig";

export const createPayment = async (data: paymentRequest) => {

    try {
        const response = await apiClient.post('/system/payment', data);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};