import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Session } from '../../interfaces/session';

interface SessionListProps {
    sessions: Session[];
    onSelectSession: (sessionId: number) => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onSelectSession }) => {
    return (
        <List>
            {sessions.map((session) => (
                <ListItem
                key={session.id}
                component="div" // or "button"
                onClick={() => onSelectSession(session.id)}
            >
                <ListItemText
                    primary={session.client ? session.client.user.first_name : 'Unknown Client'}
                    secondary={session.trainer ? session.trainer.user.first_name : 'No Trainer Assigned'}
                />
            </ListItem>
            ))}
        </List>
    );
};

export default SessionList;
