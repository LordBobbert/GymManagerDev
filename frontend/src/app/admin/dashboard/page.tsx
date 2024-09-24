// File: src/app/admin/dashboard/page.tsx

import React from 'react';
import PlaceholderCard from './components/PlaceholderCard';
import AdminLayout from '../layout';

const AdminDashboardPage = async () => {
  // Fetch any data you need for the page here, focusing on the rendering.
  // No need to fetch current user if middleware handles it
  return (
    <AdminLayout>
      <PlaceholderCard title="Admin Home" />
      <PlaceholderCard title="Client Management" />
      <PlaceholderCard title="Session Management" />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
