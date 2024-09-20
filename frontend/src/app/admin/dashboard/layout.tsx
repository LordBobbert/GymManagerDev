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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar occupies the left side */}
      <Sidebar role={role} />

      {/* Main content and TopBar are in a flex column layout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* TopBar at the top of the page */}
        <TopBar role={role} />

        {/* Main content area below the TopBar */}
        <main style={{ flex: 1, padding: '20px', marginTop: '64px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
