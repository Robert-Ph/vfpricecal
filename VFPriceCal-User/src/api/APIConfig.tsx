import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
export const API = {
    accounts: `${API_BASE_URL}/accounts`,
    papers: `${API_BASE_URL}/papers`,
    paperSizes: `${API_BASE_URL}/paper-sizes`,
    paperPrices: `${API_BASE_URL}/paper-prices`,
    categories: `${API_BASE_URL}/categories`,
    processings: `${API_BASE_URL}/processings`,
    companies: `${API_BASE_URL}/companies`,
};

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

