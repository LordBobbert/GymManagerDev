// src/pages/admin/sessions/SessionsPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import SessionList from '../../../components/sessions/SessionList';
import SessionDetails from '../../../components/sessions/SessionDetails';
import SessionTable from '../../../components/session/SessionTable';
import AddSessionForm from '../../../components/sessions/AddSessionForm'; // Import AddSessionForm
import { Session } from '../../../interfaces/session';
import axiosClient from '../../../services/axiosClient';

const SessionsPage: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'details' | 'add'>('table'); // Add 'add' to viewMode state

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axiosClient.get<Session[]>('/api/sessions/');
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions', error);
            }
        };

        fetchSessions();
    }, []);

    const handleSelectSession = (session: Session) => {
        setSelectedSession(session);
        setViewMode('details');
    };

    const handleAddSessionClick = () => {
        setViewMode('add'); // Set viewMode to 'add' to display the AddSessionForm
    };

    const handleSessionAdded = () => {
        setViewMode('table');
        // Refresh the session list after adding a new session
        axiosClient.get<Session[]>('/api/sessions/').then((response) => {
            setSessions(response.data);
        });
    };

    return (
        <Box>
            {viewMode === 'table' && (
                <>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="h6">Sessions</Typography>
                        <Button variant="contained" color="primary" onClick={handleAddSessionClick}>
                            Add Session
                        </Button>
                    </Box>
                    <SessionTable sessions={sessions} onSelectSession={handleSelectSession} />
                </>
            )}

            {viewMode === 'add' && (
                <AddSessionForm onSessionAdded={handleSessionAdded} />
            )}

            {viewMode === 'details' && (
                <Grid container spacing={2}>
                    {/* Left side: Session List (25%) */}
                    <Grid item xs={3}>
                        <SessionList sessions={sessions} onSelectSession={handleSelectSession} />
                    </Grid>

                    {/* Right side: Session Details (75%) */}
                    <Grid item xs={9}>
                        <SessionDetails session={selectedSession} />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SessionsPage;
