// src/app/admin/page.tsx

import { redirect } from 'next/navigation'; // Import the redirect utility
import nookies from 'nookies';
import AdminDashboard from '../../components/dashboard/AdminDashboard';
import { fetchCurrentUser } from '../../services/authApi'; // Adjust the path as necessary
import { User } from '../../interfaces/user'; // Ensure this matches the User interface

interface AdminPageProps {
    user: User | null; // User data passed to the page, or null if not found
}

// Server Component
const AdminPage = async () => {
    // Server-side logic to fetch user data
    let user: User | null = null;

    try {
        // Parse cookies using nookies
        const cookies = nookies.get({});

        // Extract the access token from the cookies
        const accessToken = cookies['access_token'];
        console.log('Access Token:', accessToken); // Debug: Log the access token

        // If there's no access token, redirect to the login page
        if (!accessToken) {
            redirect('/auth/login');
        }

        // Fetch the current user, passing the access token
        user = await fetchCurrentUser(accessToken);
        console.log('Fetched User:', user); // Debug: Log the fetched user

        // Check if the user has the 'admin' role
        if (!user || !user.roles.some(role => role.name === 'admin')) {
            redirect('/auth/login');
        }

    } catch (error) {
        console.error('Error fetching user:', error);

        // Redirect to login if there's an error (like unauthorized access)
        redirect('/auth/login');
    }

    // Render the AdminDashboard component with the fetched user data
    return <AdminDashboard user={user} />;
};

export default AdminPage;
