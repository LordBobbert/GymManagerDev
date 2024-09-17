// src/components/dashboard/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../../interfaces/user';

interface AdminDashboardProps {
    user: User | null; // Allow user to be null for loading or error states
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    // Internal state for loading and error handling
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use useEffect to handle initial loading
    useEffect(() => {
        if (user) {
            setIsLoading(false); // Data is loaded
        } else {
            setError('User not found'); // Handle case where user is not found
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error state
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.username}</p>
        </div>
    );
};

export default AdminDashboard;
