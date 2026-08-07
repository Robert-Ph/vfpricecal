import { apiClient } from "../api/APIConfig";
import type { feedbackRequest } from "../api/ConfigModal";

export const sendFeedback = async (data: feedbackRequest) => {
    try{
        const response = await apiClient.post('/public/feedback/send',data);
        return response.data;
    }catch(error){
        console.error("Lỗi khi tạo tài khoản!");
        throw error;
    }
}