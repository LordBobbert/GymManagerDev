// src/app/admin/page.tsx
import { GetServerSideProps } from 'next';
import nookies from 'nookies'; // Make sure to install nookies if you haven't already
import AdminDashboard from '../../../components/dashboard/AdminDashboard'; // Adjust the path to AdminDashboard component
import { fetchCurrentUser } from '../../../services/authApi'; // Adjust the path if necessary
import { User } from '../../../interfaces/user'; // Adjust the path if necessary

interface AdminPageProps {
    user: User | null; // User data passed to the page, or null if not found
}

const AdminPage: React.FC<AdminPageProps> = ({ user }) => {
    // Pass the user prop to AdminDashboard
    return <AdminDashboard user={user} />;
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // Parse cookies using nookies
        const cookies = nookies.get(context);

        // Extract the access token from the cookies
        const accessToken = cookies['access_token'];

        // If there's no access token, redirect to the login page
        if (!accessToken) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // Fetch the current user using the access token
        const user = await fetchCurrentUser(accessToken);

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
