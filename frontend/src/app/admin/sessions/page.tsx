// File: src/app/admin/sessions/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Grid } from '@mui/material';
import { Session } from '../../../interfaces/session';
import { fetchSessions } from '../../../services/sessionService';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    fetchSessions()
      .then((data) => setSessions(data))
      .catch((error) => console.error('Failed to fetch sessions:', error));
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  return (
    <Box sx={{ display: 'flex', gap: '2rem', height: '100%' }}>
      {/* Session List (Table) - 25% width */}
      <Box sx={{ flex: 1 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id} onClick={() => handleSessionSelect(session)} hover sx={{ cursor: 'pointer' }}>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.session_type}</TableCell>
                  <TableCell>{session.client?.user.first_name} {session.client?.user.last_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Session Details - 75% width */}
      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Details
              </Typography>
              <Typography><strong>Date:</strong> {selectedSession.date}</Typography>
              <Typography><strong>Type:</strong> {selectedSession.session_type}</Typography>
              <Typography><strong>Client:</strong> {selectedSession.client?.user.first_name} {selectedSession.client?.user.last_name}</Typography>
              <Typography><strong>Trainer:</strong> {selectedSession.trainer?.user.first_name} {selectedSession.trainer?.user.last_name}</Typography>
              <Typography><strong>Notes:</strong> {selectedSession.notes || 'No notes provided'}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
