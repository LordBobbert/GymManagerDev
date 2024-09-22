// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

interface ClientsPageProps {
  clients: Client[];
}

const ClientsPage = ({ clients }: ClientsPageProps) => {
  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  return <BaseListDetailsPage data={clients} getItemText={getItemText} getItemDetails={getItemDetails} />;
};

export default ClientsPage;
