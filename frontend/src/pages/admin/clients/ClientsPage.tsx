// src/pages/admin/clients/ClientsPage.tsx

import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import AddClientForm from './AddClientForm';
import { Client } from '../../../interfaces/client';

interface ClientsPageProps {
    clients: Client[];
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients: initialClients }) => {
    const [clients, setClients] = useState<Client[]>(initialClients); // Use initialClients for SSR
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    // Handler to toggle the add client form visibility
    const handleAddClientClick = () => {
        setShowAddClientForm(true);
        setSelectedClient(null); // Clear selected client when showing the add client form
    };

    // Handler when a client is selected
    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
        setShowAddClientForm(false); // Hide add form when selecting a client
    };

    // Handler to update client list when a new client is added
    const handleClientAdded = (newClient: Client) => {
        setClients((prevClients) => [...prevClients, newClient]); // Add the new client to the list
        setShowAddClientForm(false); // Hide the add client form
    };

    // Handler to update client list when a client is edited
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

                {/* Right side: Client Profile or Add Client Form (75%) */}
                <Grid item xs={9}>
                    {showAddClientForm ? (
                        <AddClientForm onClientAdded={handleClientAdded} />
                    ) : (
                        <ClientProfile client={selectedClient} onClientUpdated={updateClientList} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientsPage;
