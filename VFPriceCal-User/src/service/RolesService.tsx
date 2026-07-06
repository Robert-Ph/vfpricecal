import { apiClient } from "../api/APIConfig";

export const getAllRoles = async () => {
    try {
        const response = await apiClient.get(`/roles`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch roles:', error);
        throw error;
    }
}