// src/app/admin/sessions/page.tsx

"use_client";

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchSessions } from '../../../services/sessionApi'; // Adjust path if needed
import { Session } from '../../../interfaces/session';
import SessionList from '../../../components/sessions/SessionList'; // Adjust path if necessary

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSessions = async () => {
            try {
                const data = await fetchSessions();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setError('Failed to load sessions.');
            } finally {
                setLoading(false);
            }
        };

        loadSessions();
    }, []);

    // Handler for session selection
    const handleSelectSession = (sessionId: number) => {
        console.log('Selected session ID:', sessionId);
        // Add your logic here for handling the session selection
    };

    // Render loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading sessions...</Typography>
            </Box>
        );
    }

    // Render error state
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Render the list of sessions
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Sessions
            </Typography>
            <SessionList 
                sessions={sessions} 
                onSelectSession={handleSelectSession} 
            />
        </Box>
    );
}
