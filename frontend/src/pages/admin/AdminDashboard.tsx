// src/components/dashboard/AdminDashboard.tsx
import React from 'react';
import { User } from '../../interfaces/user';

interface AdminDashboardProps {
    user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.username}!</p>
        </div>
    );
};

export default AdminDashboard;
