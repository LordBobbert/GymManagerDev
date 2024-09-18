// src/app/admin/clients/[id]/page.tsx

"use_client";

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchClientById } from '../../../../services/clientApi'; // API call to fetch a single client
import { Client } from '../../../../interfaces/client';
import ClientProfile from '../../../../components/clients/ClientProfile';

export default function ClientDetailPage() {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    const clientId = params?.id as string;

    useEffect(() => {
        const loadClient = async () => {
            try {
                // Fetch client details by id
                const data = await fetchClientById(clientId);
                setClient(data);
            } catch (error) {
                console.error('Error fetching client:', error);
                setError('Failed to load client details.');
            } finally {
                setLoading(false);
            }
        };

        if (clientId) {
            loadClient();
        }
    }, [clientId]);

    const handleClientUpdated = (updatedClient: Client) => {
        // Update the client state with the new data
        setClient(updatedClient);
    };

    // Render loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading client details...</Typography>
            </Box>
        );
    }

    // Render error state
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Render the client profile
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Client Profile
            </Typography>
            {client && (
                <ClientProfile client={client} onClientUpdated={handleClientUpdated} />
            )}
        </Box>
    );
}
