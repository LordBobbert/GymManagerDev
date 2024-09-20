// File: app/client/dashboard/page.tsx
import AdminDashboardLayout from '../../../admin/dashboard/layout';
import PlaceholderCard from '../../../admin/dashboard/components/PlaceholderCard';

const ClientDashboard = () => {
  return (
    <AdminDashboardLayout role="client">
      <PlaceholderCard title="Client Home" />
      <PlaceholderCard title="Client Sessions" />
    </AdminDashboardLayout>
  );
};

export default ClientDashboard;
