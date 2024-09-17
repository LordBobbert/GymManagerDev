// src/pages/admin/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies'; // Import nookies for cookie parsing
import DashboardLayout from '../../components/layout/DashboardLayout'; // Adjust the path if necessary
import AdminDashboard from './AdminDashboard'; // Adjust the path if necessary
import { fetchCurrentUser } from '../../api/authApi';
import { User } from '../../interfaces/user';

interface AdminPageProps {
    user: User;
}

const AdminPage: React.FC<AdminPageProps> = ({ user }) => {
    return (
        <DashboardLayout>
            <AdminDashboard user={user} />
        </DashboardLayout>
    );
};

// Server-side rendering for authentication
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // Parse cookies using nookies
        const cookies = nookies.get(context);

        // You can log the cookies to debug
        console.log('Parsed Cookies:', cookies);

        // Extract the access token from the cookies
        const accessToken = cookies['access_token']; // Adjust if your token is stored under a different name

        // If the token is missing, redirect to login
        if (!accessToken) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // Fetch the current user, passing the accessToken
        const user = await fetchCurrentUser(accessToken);

        // Check if the user has the 'admin' role
        if (!user.role.includes('admin')) { // Make sure to use 'roles' if it's an array
            return {
                redirect: {
                    destination: '/admin/AdminDashboard', // Redirect to a different page if the user is not an admin
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
