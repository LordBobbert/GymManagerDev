// src/pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePageRedirect: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the login page when landing on the root URL
        router.replace('/auth/login');
    }, [router]);

    return null; // No need to render anything on this page
};

export default HomePageRedirect;
