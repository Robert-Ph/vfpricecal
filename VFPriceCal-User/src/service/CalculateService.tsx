import { apiClient } from "../api/APIConfig";
import { type calculate } from "../model/model";

export const calculatePrint = async (data: calculate): Promise<calculate> => {
    try{
        const response = await apiClient.post('/calculator',data);
        return response.data;

    }catch(error){
        console.error('Failed to create print price:', error);
        throw error;
    }
}