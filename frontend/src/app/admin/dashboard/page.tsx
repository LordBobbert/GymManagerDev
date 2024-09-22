// File: src/app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';  // For redirection
import { cookies } from 'next/headers';  // To access cookies server-side
import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

const AdminDashboard = async () => {
  const cookieStore = cookies();  // Access cookies
  const accessToken = cookieStore.get('access_token')?.value;

  // Redirect to login page if no access token
  if (!accessToken) {
    return redirect('/auth/login');
  }

  try {
    // Fetch user details from the backend using the access token
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // If the request fails, redirect to login or handle the error
    if (!userRes.ok) {
      if (userRes.status === 401) {
        return redirect('/auth/login');  // Token expired or unauthorized
      }
      return redirect('/500');  // Redirect to a 500 error page or handle error
    }

    const userData = await userRes.json();

    // Check if the user is not an admin, redirect or throw an error
    if (userData.role !== 'admin') {
      return redirect('/403');  // Redirect to a 403 error page or deny access
    }

    // Render the admin dashboard layout if the user is authenticated and authorized
    return (
      <AdminDashboardLayout>
        <PlaceholderCard title="Admin Home" />
        <PlaceholderCard title="Client Management" />
        <PlaceholderCard title="Session Management" />
      </AdminDashboardLayout>
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return redirect('/500');  // Handle any unexpected errors with a 500 page
  }
};

export default AdminDashboard;
