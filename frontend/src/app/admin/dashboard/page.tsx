// File: src/app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';  // Server-side redirection
import { cookies } from 'next/headers';  // To access cookies server-side
import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

// Function to fetch current user info from the backend using cookies for authentication
const fetchCurrentUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
    method: 'GET',
    credentials: 'include',  // Automatically include the cookies (access_token) in the request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return await response.json();  // Expecting user details, including roles
};

const AdminDashboardPage = async () => {
  const cookieStore = cookies();  // Access cookies on the server side
  const accessToken = cookieStore.get('access_token')?.value;  // Check if access_token is present

  if (!accessToken) {
    return redirect('/auth/login');  // Redirect to login if no access token is found
  }

  try {
    const userData = await fetchCurrentUser();  // Fetch user data using the access token stored in cookies

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
