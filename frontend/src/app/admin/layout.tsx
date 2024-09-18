// src/app/admin/layout.tsx

import DashboardLayout from '../../layouts/DashboardLayout';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
