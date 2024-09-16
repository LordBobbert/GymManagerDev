// src/api/axiosClient.ts
import axios from 'axios';

// Function to get the CSRF token from cookies
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

// Create an Axios instance
console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Your backend API base URL
    withCredentials: true, // Set globally to include cookies in all requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Include CSRF token from the cookie in headers
axiosClient.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

export default axiosClient;
