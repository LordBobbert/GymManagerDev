// src/pages/admin/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AdminDashboard from './dashboard';
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

        // Extract the access token from the cookies
        const accessToken = cookies['access_token']; // Ensure this matches the key used when setting the cookie

        // Fetch the current user, passing the access token
        const user = await fetchCurrentUser(accessToken);

        // Check if the user has the 'admin' role
        if (!user || !user.role.includes('admin')) { // Ensure this condition accurately checks for the 'admin' role
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
