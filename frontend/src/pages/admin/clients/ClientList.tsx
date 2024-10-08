// src/components/dashboard/ClientList.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Client } from '../../../interfaces/client';

interface ClientListProps {
    clients: Client[];
    onSelectClient: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient }) => {
    return (
        <List>
            {clients.map((client) => (
                <ListItem
                    key={client.id}
                    onClick={() => onSelectClient(client)}
                    component="div"
                    sx={{ cursor: 'pointer' }}
                >
                    <ListItemText
                        primary={`${client.user.first_name} ${client.user.last_name}`}
                        secondary={client.user.email}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ClientList;
