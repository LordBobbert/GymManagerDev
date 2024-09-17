// src/pages/admin/index.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import AdminDashboard from '../admin/dashboard';
import { fetchCurrentUser } from '../../api/authApi'; // Adjust the path as necessary
import { User } from '../../interfaces/user'; // Ensure this matches the User interface

interface AdminPageProps {
    user: User | null; // User data passed to the page, or null if not found
}

const AdminPage: React.FC<AdminPageProps> = ({ user }) => {
    // If the user prop is null, we handle it in the AdminDashboard component
    return <AdminDashboard user={user} />;
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // Parse cookies using nookies
        const cookies = nookies.get(context);

        // Extract the access token from the cookies
        const accessToken = cookies['access_token'];
        console.log('Access Token:', accessToken); // Debug: Log the access token

        // If there's no access token, redirect to the login page
        if (!accessToken) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // Fetch the current user, passing the access token
        const user = await fetchCurrentUser(accessToken);
        console.log('Fetched User:', user); // Debug: Log the fetched user

        // Check if the user has the 'admin' role
        if (!user || !user.roles.some(role => role.name === 'admin')) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // Pass the user data to the page as props
        return {
            props: {
                user,
            },
        };
    } catch (error) {
        console.error('Error fetching user:', error);

        // Redirect to login if there's an error (like unauthorized access)
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
};

export default AdminPage;
