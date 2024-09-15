// src/components/session/SessionDetails.tsx

import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { Session } from '../../../interfaces/session';

interface SessionDetailsProps {
    session: Session | null;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session }) => {
    if (!session) {
        return <Typography variant="h6">No session selected</Typography>;
    }

    return (
        <Box>
            <Typography variant="h5">Session Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Client"
                        value={`${session.client.user.first_name} ${session.client.user.last_name}`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Trainer"
                        value={`${session.trainer.user.first_name} ${session.trainer.user.last_name}`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Session Type"
                        value={session.session_type}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Date"
                        value={new Date(session.date).toLocaleDateString()}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Notes"
                        value={session.notes || ''}
                        multiline
                        rows={4}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SessionDetails;
