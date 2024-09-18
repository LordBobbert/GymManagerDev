// src/components/session/SessionTable.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Session } from './../../interfaces/session';

interface SessionTableProps {
    sessions: Session[];
    onSelectSession: (session: Session) => void;
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions, onSelectSession }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Client</TableCell>
                        <TableCell>Trainer</TableCell>
                        <TableCell>Session Type</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.id} onClick={() => onSelectSession(session)} sx={{ cursor: 'pointer' }}>
                            <TableCell>{`${session.client.user.first_name} ${session.client.user.last_name}`}</TableCell>
                            <TableCell>{`${session.trainer.user.first_name} ${session.trainer.user.last_name}`}</TableCell>
                            <TableCell>{session.session_type}</TableCell>
                            <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                            <TableCell>{session.notes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SessionTable;
