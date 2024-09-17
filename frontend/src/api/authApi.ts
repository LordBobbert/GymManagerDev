// src/api/authApi.ts

import axiosClient from './axiosClient'; // Import the axios instance configured with baseURL and withCredentials
import { setCookie, destroyCookie } from 'nookies'; // Import nookies for cookie management
import { User } from '../interfaces/user'; // Ensure you have a User interface defined

// Login function
export const login = async (username: string, password: string): Promise<User> => {
    const response = await axiosClient.post('/api/auth/login/', {
        username,
        password,
    });

    // Extract the access token from the response
    const accessToken = response.data.access_token;

    // Set the access token as an HTTP-only cookie
    setCookie(null, 'access_token', accessToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
    });

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
