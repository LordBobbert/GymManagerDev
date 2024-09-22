// File: src/app/admin/clients/page.tsx
import { GetServerSideProps } from 'next';
import { Client } from '../../../interfaces/client';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';

interface ClientsPageProps {
  clients: Client[];
}

const ClientsPage = ({ clients }: ClientsPageProps) => {
  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  return <BaseListDetailsPage data={clients} getItemText={getItemText} getItemDetails={getItemDetails} />;
};

export default ClientsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch clients from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/`, {
    headers: {
      'Authorization': `Bearer ${context.req.cookies['access_token']}`, // Include your token
    },
  });

  if (!res.ok) {
    return { notFound: true };  // Handle error if necessary
  }

  const clients = await res.json();  // Assuming the response is an array of Client objects

  return {
    props: {
      clients,  // Pass clients as a prop
    },
  };
};
