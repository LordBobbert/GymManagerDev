"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout/DashboardLayout'; // Import DashboardLayout
import MainContentListDetails from '../../../components/admin/MainContent/MainContentListDetails';
import ClientProfile from '../../../components/admin/clients/ClientProfile';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../services/clientApi'; // Ensure you have this API utility function

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Fetch clients when the component mounts
    useEffect(() => {
        const loadClients = async () => {
            try {
                const fetchedClients = await fetchClients();
                setClients(fetchedClients);
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            }
        };

        loadClients();
    }, []);

    // Function to render the list item text
    const renderListItem = (client: Client) => {
        return `${client.user.first_name} ${client.user.last_name}`;
    };

    // Handle the client selection
    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
    };

    // Placeholder for the onSave function (Replace with your actual implementation)
    const handleSaveClient = (client: Client) => {
        // Logic to handle saving client changes
        console.log('Client saved:', client);
    };

    return (
        <DashboardLayout>
            <MainContentListDetails<Client>
                items={clients}
                renderListItem={renderListItem}
                renderDetails={(client) => (
                    <ClientProfile client={client} onSave={handleSaveClient} />
                )}
                onSelect={handleSelectClient} // Corrected to match MainContentListDetails' prop
            />
        </DashboardLayout>
    );
};

export default ClientsPage;
