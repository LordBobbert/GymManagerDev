import axios from 'axios';

// Function to get the CSRF token from cookies
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Your backend API base URL
        withCredentials: true, // Important to include cookies in requests
});

// Interceptor to adjust the baseURL for certain routes
// axiosClient.interceptors.request.use((config) => {
    // If the request URL starts with '/auth', change the baseURL to omit the '/api' prefix
    // if (config.url && config.url.startsWith('/auth')) {
        // config.baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL as string).replace('/api', '');
    //}
    // return config;
// });

// Include CSRF token from the cookie in headers
axiosClient.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken'); // Implement this function to get the CSRF token
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

export default axiosClient;
