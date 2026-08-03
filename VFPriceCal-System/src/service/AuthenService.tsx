import { apiClient } from "../config/APIConfig";

export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/system/authen', { email, password });
        return response.data.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
