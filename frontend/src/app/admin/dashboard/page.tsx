// File: src/app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';  // Server-side redirection
import { cookies } from 'next/headers';  // To access cookies server-side
import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

// Fetch current user info from the backend
const fetchCurrentUser = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
    method: 'GET',
    credentials: 'include',  // Ensure the access token cookie is included
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return await response.json();  // Expecting user details, including roles
};

const AdminDashboardPage = async () => {
  const cookieStore = cookies();  // Access cookies on the server side
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return redirect('/auth/login');  // Corrected redirection path
  }

  try {
    const userData = await fetchCurrentUser(accessToken);

    // Check if the user is not an admin, redirect or show a restricted message
    if (!userData.roles.includes('admin')) {
      return redirect('/403');  // Redirect to a 403 Forbidden page or handle as needed
    }

    // If the user is an admin, render the dashboard
    return (
      <AdminDashboardLayout>
        <PlaceholderCard title="Admin Home" />
        <PlaceholderCard title="Client Management" />
        <PlaceholderCard title="Session Management" />
      </AdminDashboardLayout>
    );
  } catch (error) {
    console.error('Error fetching user details:', error);
    return redirect('/auth/login');  // Redirect if there's an issue fetching user data
  }
};

export default AdminDashboardPage;
