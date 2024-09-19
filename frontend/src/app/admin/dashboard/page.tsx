// app/admin/dashboard/page.tsx

import { cookies } from 'next/headers'; // For server-side cookie handling
import axios from 'axios';

async function fetchUser() {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('access_token')?.value; // Use the correct cookie name for authentication

    if (!authCookie) {
        throw new Error('Not authenticated');
    }

    // Make a request to the backend to validate the user
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
        headers: {
            Cookie: `access_token=${authCookie}`,
        },
    });

    return response.data;
}

export default async function DashboardPage() {
    try {
        // Fetch the user data on the server
        const user = await fetchUser();

        return (
            <div>
                <h1>Welcome, {user.username}</h1>
                {/* Render dashboard components */}
            </div>
        );
    } catch (error) {
        // Handle errors, such as redirecting to login or showing an error message
        return <div>Error: Not authenticated</div>;
    }
}
