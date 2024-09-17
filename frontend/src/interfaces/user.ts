// Define a Role interface to represent individual role objects
export interface Role {
    name: 'client' | 'trainer' | 'admin'; // Define possible role names
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    gender?: 'male' | 'female'; // Optional
    birthday?: string; // Optional
    roles: Role[]; // Adjusted to be an array of Role objects
}
