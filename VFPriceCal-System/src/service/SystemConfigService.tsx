import { apiClient} from "../config/APIConfig";
import { type SystemConfigRequest} from "../config/ModelConfig";

export const createSystemConfig = async (data: SystemConfigRequest) => {

    try {
        const response = await apiClient.post('/system/config', data);
        return response.data;
    } catch (error) {
        console.error('Error creating system config:', error);
        throw error;
    }
};

export const getAllSystemConfig = async () => {

    try {
        const response = await apiClient.get('/system/config/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching system configs:', error);
        throw error;
    }
};