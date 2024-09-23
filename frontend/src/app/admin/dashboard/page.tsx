// src/app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

// Fetch current user info from the backend
const fetchCurrentUser = async () => {
  const cookieStore = cookies();  // Access cookies on the server side
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return redirect('/auth/login');  // Redirect to login if no access token
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
    method: 'GET',
    credentials: 'include',  // Ensure cookies are included for cross-origin requests
  });

  if (!response.ok) {
    return redirect('/auth/login');  // Redirect to login if fetch fails
  }

  const userData = await response.json();
  if (!userData.roles.includes('admin')) {
    return redirect('/403');  // Redirect to a 403 Forbidden page if not an admin
  }

  // If the user is an admin, render the dashboard
  return (
    <AdminDashboardLayout>
      <PlaceholderCard title="Admin Home" />
      <PlaceholderCard title="Client Management" />
      <PlaceholderCard title="Session Management" />
    </AdminDashboardLayout>
  );
};

export default fetchCurrentUser;
