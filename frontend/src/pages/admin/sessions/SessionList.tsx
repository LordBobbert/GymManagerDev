// src/components/session/SessionList.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Session } from '../../../interfaces/session';

interface SessionListProps {
    sessions: Session[];
    onSelectSession: (session: Session) => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onSelectSession }) => {
    return (
        <List>
            {sessions?.map((session) => (
                <ListItem
                    key={session.id}
                    onClick={() => onSelectSession(session)}
                    component="div"
                    sx={{ cursor: 'pointer' }}
                >
                    <ListItemText
                        primary={`${session.client.user.first_name} ${session.client.user.last_name}`}
                        secondary={new Date(session.date).toLocaleDateString()}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default SessionList;
