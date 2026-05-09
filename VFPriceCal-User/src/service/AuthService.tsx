import { apiClient} from "../api/APIConfig";

export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password });
        return response.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/register', { username, password });
        return response.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};