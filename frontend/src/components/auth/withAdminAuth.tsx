// src/components/auth/withAdminAuth.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '../../api/axiosClient';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [isAuthorized, setIsAuthorized] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const verifyUser = async () => {
                try {
                    // Make a request to the backend to check the user's roles
                    const response = await axiosClient.get('/api/auth/user/'); // This endpoint should return the user's data if authenticated
                    const { roles } = response.data.user;

                    // Check if the user has 'admin' role
                    if (roles.includes('admin')) {
                        setIsAuthorized(true);
                    } else {
                        router.push('/auth/login'); // Redirect to login if not authorized
                    }
                } catch (error) {
                    console.error('User verification failed:', error);
                    router.push('/auth/login'); // Redirect to login on error
                }
            };

            verifyUser();
        }, [router]);

        if (!isAuthorized) {
            // Show a loading or redirecting message while checking auth
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAdminAuth;
