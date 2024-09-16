// src/api/authApi.ts
import axiosClient from './axiosClient';

export const login = async (username: string, password: string) => {
    const response = await axiosClient.post('/api/auth/login/', {
        username,
        password,
    });
    return response.data;
};

export const logout = async () => {
    const response = await axiosClient.post('/api/auth/logout/');
    return response.data;
};

// Add more authentication-related API calls as needed
export const fetchCurrentUser = async () => {
    const response = await axiosClient.get('/api/auth/current_user/', {
        withCredentials: true, // Include cookies in the request
    });
    return response.data;
};