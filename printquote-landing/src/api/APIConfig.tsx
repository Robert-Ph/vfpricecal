import axios from 'axios';

// const API_BASE_URL = '/api';
const API_BASE_URL = 'http://localhost:9085/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// /**
//  * Add JWT token automatically
//  */
// apiClient.interceptors.request.use(

//     (config) => {

//         const token =
//             localStorage.getItem('token');

//         if (token) {

//             config.headers.Authorization =
//                 `Bearer ${token}`;
//         }

//         return config;
//     },

//     (error) => Promise.reject(error)
// );

// /**
//  * Handle 401 Unauthorized
//  */
// apiClient.interceptors.response.use(

//     (response) => response,

//     (error) => {

//         if (error.response?.status === 401) {

//             localStorage.removeItem('token');

//             localStorage.removeItem('user');

//             // window.location.href = '/login';
//         }

//         return Promise.reject(error);
//     }
// );