// src/pages/admin/clients/ClientsPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import AddClientForm from './AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../api/clientApi'; // Import the API function

interface ClientsPageProps {
    clients?: Client[]; // Make the clients prop optional
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients: initialClients = [] }) => {
    const [clients, setClients] = useState<Client[]>(initialClients); // Use initialClients as the initial state
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    useEffect(() => {
        // Only fetch clients if initialClients is empty
        if (initialClients.length === 0) {
            const loadClients = async () => {
                try {
                    const clientsData = await fetchClients(); // Use the fetchClients function from clientApi.ts
                    setClients(clientsData);
                } catch (error) {
                    console.error('Error fetching clients', error);
                }
            };
            loadClients();
        }
    }, [initialClients]);

    // Handler to toggle the add client form visibility
    const handleAddClientClick = () => {
        setShowAddClientForm(true);
        setSelectedClient(null); // Clear selected client when showing the add client form
    };

    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
        setShowAddClientForm(false); // Hide add form when selecting a client
    };

    // Handler to update the client in the list after editing
    const updateClientList = (updatedClient: Client) => {
        setClients((prevClients) => 
            prevClients.map((client) =>
                client.id === updatedClient.id ? updatedClient : client
            )
        );
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
                        <ClientProfile client={selectedClient} onClientUpdated={updateClientList} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientsPage;
