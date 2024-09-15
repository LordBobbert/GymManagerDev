// src/pages/admin/clients/ClientsPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import AddClientForm from './AddClientForm';
import { Client } from '../../../interfaces/client';
import axiosClient from '../../../api/axiosClient';

const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosClient.get<Client[]>('/api/clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients', error);
            }
        };

        fetchClients();
    }, []);

    // Handler to toggle the add client form visibility
    const handleAddClientClick = () => {
        setShowAddClientForm(true);
        setSelectedClient(null); // Clear selected client when showing the add client form
    };

    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
        setShowAddClientForm(false); // Hide add form when selecting a client
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {/* Left side: Client List (25%) */}
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Clients</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddClientClick}
                        >
                            Add Client
                        </Button>
                    </Box>
                    <ClientList 
                        clients={clients} 
                        onSelectClient={handleSelectClient} 
                    />
                </Grid>

                {/* Right side: Client Profile (75%) */}
                <Grid item xs={9}>
                    {showAddClientForm ? (
                        <AddClientForm onClientAdded={() => setShowAddClientForm(false)} />
                    ) : (
                        <ClientProfile client={selectedClient} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientsPage;
