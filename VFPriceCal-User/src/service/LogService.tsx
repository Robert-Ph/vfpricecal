import { apiClient } from "../api/APIConfig";

export const getByLog = async (param: string) => {
    try{
        const response = await apiClient.get(`/log-user`,  {
            params: { param },
        } );
        return response.data;
    }catch(error){
        console.error('Failed to fetch print price details:', error);
        throw error;
    }
}