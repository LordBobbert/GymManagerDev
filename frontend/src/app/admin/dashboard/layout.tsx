// File: app/admin/dashboard/layout.tsx
import Sidebar from './components/Sidebar';
import TopBar from './components/Topbar';
import { ReactNode } from 'react';

interface AdminDashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'trainer' | 'client'; // Role-based content switching
}

const AdminDashboardLayout = ({ children, role }: AdminDashboardLayoutProps) => {
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <TopBar role={role} /> {/* Pass role to TopBar */}
      <div style={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}> {/* Margin to offset AppBar height */}
        <Sidebar role={role} /> {/* Pass role to Sidebar */}
        <main style={{ flex: 1, padding: '20px' }}>
          {children} {/* Main content */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
