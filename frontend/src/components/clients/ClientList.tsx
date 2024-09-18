// src/components/clients/ClientList.tsx

import { FC } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Client } from '../../interfaces/client';
import { useRouter } from 'next/navigation';

interface ClientListProps {
    clients: Client[];
}

const ClientList: FC<ClientListProps> = ({ clients }) => {
    const router = useRouter();

    const handleClientClick = (id: number) => {
        router.push(`/admin/clients/${id}`); // Navigate to the client's detail page
    };

    return (
        <List>
            {clients.map(client => (
                <div key={client.id}>
                    <ListItem component="button" onClick={() => handleClientClick(client.id)} style={{ cursor: 'pointer' }}>
                        <ListItemText
                            primary={`${client.user.first_name} ${client.user.last_name}`}
                            secondary={client.user.email}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
};

export default ClientList;
