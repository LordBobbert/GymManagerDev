// src/app/admin/clients/page.tsx

import { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchClients } from '../../../services/clientApi'; // API call to fetch all clients
import { Client } from '../../../interfaces/client';

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadClients = async () => {
            try {
                // Fetch all clients
                const data = await fetchClients();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('Failed to load clients.');
            } finally {
                setLoading(false);
            }
        };

        loadClients();
    }, []);

    // Handler to navigate to a specific client's detail page
    const handleClientClick = (clientId: number) => {
        router.push(`/admin/clients/${clientId}`);
    };

    // Render loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading clients...</Typography>
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

    // Render the list of clients
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Clients
            </Typography>
            <List>
                {clients.map((client) => (
                    <ListItem key={client.id} component="button" onClick={() => handleClientClick(client.id)} style={{ cursor: 'pointer' }}>
                    <ListItemText
                        primary={`${client.user.first_name} ${client.user.last_name}`}
                        secondary={client.user.email}
                    />
                </ListItem>
                ))}
            </List>
        </Box>
    );
}
