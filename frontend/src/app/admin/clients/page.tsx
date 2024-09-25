// File: src/app/admin/clients/page.tsx

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients, addClient } from '../../../services/clientService';  // Make sure this import exists
import { clientFieldConfig } from '../../../config/fieldConfigs';
import { Trainer } from '../../../interfaces/trainer';
import { fetchTrainers } from '../../../services/trainerService';  // Assuming you have a fetchTrainers service

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[] | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [isAddClientOpen, setIsAddClientOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchClients()
            .then((data) => setClients(data))
            .catch(() => setError('Failed to load clients.'));

        fetchTrainers()
            .then((data) => setTrainers(data))
            .catch(() => console.error('Failed to load trainers.'));
    }, []);

    const handleClientSelect = (client: Client) => {
        setSelectedClient(client);
    };

    const handleClientSave = (updatedClient: Client) => {
        console.log('Client saved:', updatedClient);
    };

    const handleAddClientSubmit = async (newClient: Omit<Client, 'id'>) => {
        try {
            setLoading(true);
            await addClient(newClient);  // Ensure this function is imported
            console.log('Client added successfully');
            setIsAddClientOpen(false);   // Close modal after submission
        } catch (error) {
            console.error('Error adding client:', error);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!clients) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left panel: BaseList */}
            <div style={{ flex: 1 }}>
                <BaseList
                    data={clients}
                    section="clients"
                    getKey={(client) => client.id}
                    onSelect={handleClientSelect}
                    renderItem={(client) => (
                        <span>{client.user.first_name} {client.user.last_name}</span>
                    )}
                />
            </div>

            {/* Right panel: BaseListDetailsPage */}
            {selectedClient && (
                <div style={{ flex: 3 }}>
                    <BaseListDetailsPage
                        data={selectedClient}
                        fieldConfig={clientFieldConfig}
                        onSave={handleClientSave}
                    />
                </div>
            )}

            {/* Add Client Form Modal */}
            <AddClientForm
                open={isAddClientOpen}
                onClose={() => setIsAddClientOpen(false)}
                onSubmit={handleAddClientSubmit}  // Pass the submission handler
                trainers={trainers}
                loading={loading}
            />
        </div>
    );
};

export default ClientsPage;
