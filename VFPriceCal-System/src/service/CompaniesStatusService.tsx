import { apiClient} from "../config/APIConfig";

export const getCompaniesStatus = async () => {

    try {
        const response = await apiClient.get('/system/companies-status');
        return response.data;
    } catch (error) {
        console.error('Error fetching companies status:', error);
        throw error;
    }
};