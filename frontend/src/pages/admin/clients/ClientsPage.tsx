// src/pages/admin/clients/ClientsPage.tsx

import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Grid, Typography, Button } from '@mui/material';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import AddClientForm from './AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../api/clientApi'; // Import the API call

interface ClientsPageProps {
    clients: Client[];
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients: initialClients }) => {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    // Handler to toggle the add client form visibility
    const handleAddClientClick = () => {
        setShowAddClientForm(true);
        setSelectedClient(null);
    };

    // Handler when a client is selected
    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
        setShowAddClientForm(false);
    };

    // Handler to update client list when a new client is added
    const handleClientAdded = (newClient: Client) => {
        setClients((prevClients) => [...prevClients, newClient]);
        setShowAddClientForm(false);
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
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Clients</Typography>
                        <Button variant="contained" color="primary" onClick={handleAddClientClick}>
                            Add Client
                        </Button>
                    </Box>
                    <ClientList clients={clients} onSelectClient={handleSelectClient} />
                </Grid>

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

// Add getServerSideProps for SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const cookies = context.req.headers.cookie;
        const clients = await fetchClients(cookies); // Fetch the clients server-side

        return {
            props: {
                clients,
            },
        };
    } catch (error) {
        console.error('Error fetching clients:', error);
        return {
            props: {
                clients: [],
            },
        };
    }
};

export default ClientsPage;
