// src/api/authApi.ts

import axiosClient from './axiosClient'; // Import the axios instance configured with baseURL and withCredentials
import { destroyCookie } from 'nookies'; // Import nookies for cookie management
import { User } from '../interfaces/user'; // Ensure you have a User interface defined



export const login = async (username: string, password: string): Promise<User> => {
    const response = await axiosClient.post('/api/auth/login/', {
        username,
        password,
    });

    // No need to manually set httpOnly cookies here.
    // The server should already set 'access_token' and 'refresh_token' cookies in the HTTP response.

    // Return the user object from the response (adjust based on your backend response structure)
    return response.data.user;
};

// Logout function
export const logout = async () => {
    await axiosClient.post('/api/auth/logout/');

    // Destroy the access token cookie
    destroyCookie(null, 'access_token', { path: '/' });
};

// Fetch the current user
export const fetchCurrentUser = async (accessToken: string): Promise<User> => {
    const response = await axiosClient.get<User>('/api/auth/current_user/', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
