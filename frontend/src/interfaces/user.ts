export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string; // Adjusted to match API response
    last_name: string;  // Adjusted to match API response
    phone_number?: string; // Adjusted to match API response
    gender?: 'male' | 'female'; // Optional
    birthday?: string; // Optional
    role: 'client' | 'trainer' | 'admin';
}


export interface UserProfileProps {
    user: User | null; // Allow null values for the client
}