import { apiClient } from "../config/APIConfig";

export const getAllOrders = async () => {
    try{
        const reponse = await apiClient.get('/system/orders');
        return reponse.data;
    }catch (error){
        console.error('Error fetching orders:', error);
        throw error;
    }
}