// File: app/admin/dashboard/page.tsx
import AdminDashboardLayout from './layout';
import PlaceholderCard from './components/PlaceholderCard';

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout role="admin">
      <PlaceholderCard title="Admin Home" />
      <PlaceholderCard title="Admin Overview" />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
