// File: app/admin/clients/page.tsx (Server-Side Component)

import List from './List'; // Client-side component

// Server component that fetches data
export default async function ClientPage() {
  // Fetch data on the server
  const response = await fetch('https://api.example.com/clients');
  const clients = await response.json();

  // Transform the data if needed
  const transformedClients = clients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
  }));

  // Pass the transformed data to the client-side component
  return <List items={transformedClients} />;
}
