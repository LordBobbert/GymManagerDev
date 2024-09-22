// File: app/admin/dashboard/page.tsx

import { redirect } from 'next/navigation';  // Server-side redirection
import { cookies } from 'next/headers';  // Access cookies server-side

const AdminDashboardPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    // Redirect to login page if no access token is found
    return redirect('/auth/login');
  }

  // Fetch user details from the backend to validate roles
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!userRes.ok) {
    // If token is invalid or expired, redirect to login
    return redirect('/auth/login');
  }

  const userData = await userRes.json();

  // Check if the user does not have the 'admin' role, redirect them
  if (!userData.roles.includes('admin')) {
    return redirect('/403');  // Redirect to a 403 Forbidden page or another restricted page
  }

  // If user is an admin, render the admin dashboard page
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      {/* Render dashboard content here */}
    </div>
  );
};

export default AdminDashboardPage;
