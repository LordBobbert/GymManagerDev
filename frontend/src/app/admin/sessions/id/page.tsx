// src/app/admin/sessions/[id]/page.tsx

"use_client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { fetchSessionById } from '../../../../services/sessionApi'; // API call to fetch a session by ID
import { Session } from '../../../../interfaces/session'; // Import Session interface

export default function SessionDetailPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams(); // Extract the `id` parameter from the URL

    const sessionId = params?.id as string;

    useEffect(() => {
        const loadSession = async () => {
            try {
                const data = await fetchSessionById(sessionId); // Fetch session details
                setSession(data);
            } catch (error) {
                console.error('Error fetching session:', error);
                setError('Failed to load session details.');
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            loadSession();
        }
    }, [sessionId]);

    // Render loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading session details...</Typography>
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

    // Render session details
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Session Details
            </Typography>
            {session && (
                <Box>
                    <Typography variant="h6">Session ID: {session.id}</Typography>
                    <Typography>Date: {session.date}</Typography>
                    <Typography>Trainer: {session.trainer.user.first_name} {session.trainer.user.last_name}</Typography>
                    <Typography>Client: {session.client.user.first_name} {session.client.user.last_name}</Typography>
                    <Typography>Notes: {session.notes}</Typography>
                    {/* Add more session details as needed */}
                </Box>
            )}
        </Box>
    );
}
