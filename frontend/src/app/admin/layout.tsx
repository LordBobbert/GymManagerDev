// File: src/app/admin/layout.tsx
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import AppBarMenu from './dashboard/components/AppBarMenu';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();

      if (!session || !session.user.roles?.includes('admin')) {
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <AppBarMenu role="admin" />
      <main>{children}</main>
    </div>
  );
}
