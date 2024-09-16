// src/pages/admin/clients/index.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import ClientsPage from './ClientsPage'; // Import the ClientsPage component
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../api/clientApi';

interface ClientsPageProps {
    clients: Client[];
}

const Clients: React.FC<ClientsPageProps> = ({ clients }) => {
    return <ClientsPage clients={clients} />;
};

// Server-side rendering for authentication and data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    try {
        // Fetch clients
        const clients = await fetchClients(req.headers.cookie);

        // Return the clients as props
        return {
            props: {
                clients,
            },
        };
    } catch (error) {
        console.error('Error fetching clients:', error);

        // Redirect to login if there's an error (like unauthorized access)
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
};

export default Clients;
