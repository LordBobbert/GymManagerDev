// src/api/authApi.ts
import axiosClient from './axiosClient';
import { User } from '../interfaces/user';

export const fetchCurrentUser = async (accessToken: string): Promise<User> => {
    try {
        const response = await axiosClient.get<User>('/api/auth/current_user/', {
            headers: {
                // Attach the access token to the Authorization header
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true, // Ensure that cookies are sent
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

// Other authentication functions
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
