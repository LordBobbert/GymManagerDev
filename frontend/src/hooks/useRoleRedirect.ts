// src/hooks/useRoleRedirect.ts
// src/hooks/useRoleRedirect.ts

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRoleRedirect = (roles: string[]) => {
    const router = useRouter();

    useEffect(() => {
        if (roles.includes('admin')) {
            router.push('/admin/dashboard');
        } else if (roles.includes('trainer')) {
            router.push('/dashboard/trainer');
        } else if (roles.includes('client')) {
            router.push('/dashboard/client');
        }
    }, [roles, router]);
};
