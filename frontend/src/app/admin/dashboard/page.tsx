// File: src/app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';  // For redirection
import { cookies } from 'next/headers';  // To access cookies server-side
import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

const AdminDashboard = async () => {
  const cookieStore = cookies();  // Access cookies
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    // If no access token, redirect to login page
    return redirect('/auth/login');
  }

  // Fetch user details from the backend, assuming the API returns the user's role
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const userData = await userRes.json();

  // Check if the user is not an admin, then redirect or throw an error
  if (userData.role !== 'admin') {
    return redirect('/403');  // Redirect to a 403 error page or home
  }

  return (
    <AdminDashboardLayout>
      <PlaceholderCard title="Admin Home" />
      <PlaceholderCard title="Client Management" />
      <PlaceholderCard title="Session Management" />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
