import { apiClient} from "../api/APIConfig";

export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/register', { email, password });
        return response.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const getAuthenticatedUser = async () => {
    try {
        const response = await apiClient.get('/accounts');
        return response.data; // Assuming the user data is in response.data
    } catch (error) {
        console.error('Failed to fetch authenticated user:', error);
        throw error;
    }
};

export const logout = async () =>{
    return await apiClient.post('auth/logout', {},
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
}


export const forgotPassword = async (email: string) => {
    try {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data; // Assuming the response contains a success message
    } catch (error) {
        console.error('Forgot password request failed:', error);
        throw error;
    }
};

export const changePassword = async (email: string, newPassword: string) => {
    try {
        const response = await apiClient.post(`/auth/change-password`, { email, newPassword });
        return response.data;
    } catch (error) {
        console.error('Failed to change password:', error);
        throw error;
    }
};
