// File: src/app/admin/dashboard/page.tsx

import React from 'react';
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout role="admin">
      <PlaceholderCard title="Admin Home" />
      <PlaceholderCard title="Client Management" />
      <PlaceholderCard title="Session Management" />
      <PlaceholderCard title="Financial Overview" />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
