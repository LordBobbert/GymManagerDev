// src/components/dashboard/AdminDashboard.tsx
import React from 'react';
import { User } from '../../interfaces/user'; // Adjust the import path

interface AdminDashboardProps {
    user: User; // Define the expected prop type
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    return (
        <div>
            {/* Use the user prop */}
            Welcome to the Admin Dashboard, {user.first_name}
        </div>
    );
};

export default AdminDashboard;
