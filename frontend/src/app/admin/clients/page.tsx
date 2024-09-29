// File: src/app/admin/sessions/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { Session } from '../../../interfaces/session';
import { fetchSessions, updateSession } from '../../../services/sessionService';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSessionData, setUpdatedSessionData] = useState<Partial<Session>>({});

  useEffect(() => {
    fetchSessions()
      .then((data) => setSessions(data))
      .catch((error) => console.error('Failed to fetch sessions:', error));
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setUpdatedSessionData(session); // Set initial values for editing
    setIsEditing(false); // Ensure editing is disabled when selecting a session
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedSessionData(selectedSession!); // Reset the form to the original session data
  };

  const handleSaveClick = async () => {
    if (selectedSession && updatedSessionData) {
      try {
        await updateSession(selectedSession.id, updatedSessionData);
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === selectedSession.id ? { ...session, ...updatedSessionData } : session
          )
        );
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update session:', error);
      }
    }
  };

  const handleFieldChange = (field: keyof Session, value: string) => {
    setUpdatedSessionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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

              {isEditing ? (
                <>
                  <TextField
                    label="Date"
                    value={updatedSessionData.date || ''}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Session Type"
                    value={updatedSessionData.session_type || ''}
                    onChange={(e) => handleFieldChange('session_type', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Notes"
                    value={updatedSessionData.notes || ''}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography><strong>Date:</strong> {selectedSession.date}</Typography>
                  <Typography><strong>Type:</strong> {selectedSession.session_type}</Typography>
                  <Typography><strong>Client:</strong> {selectedSession.client?.user.first_name} {selectedSession.client?.user.last_name}</Typography>
                  <Typography><strong>Trainer:</strong> {selectedSession.trainer?.user.first_name} {selectedSession.trainer?.user.last_name}</Typography>
                  <Typography><strong>Notes:</strong> {selectedSession.notes || 'No notes provided'}</Typography>
                  <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleEditClick}>
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
