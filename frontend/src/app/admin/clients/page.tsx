// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer';
import { Session } from '../../../interfaces/session';
import { Payment } from '../../../interfaces/payment';
import { fetchClients, addClient, updateClient, fetchClientSessions, fetchClientPayments } from '../../../services/clientService';
import { fetchTrainers } from '../../../services/trainerService';
import { getClientFieldConfig } from '../../../config/fieldConfigs';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));

    fetchTrainers()
      .then((data) => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load trainers.');
        setLoading(false);
      });
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(null); // Clear the previous client
    setTimeout(() => {
      setSelectedClient(client);
      fetchClientSessions(client.id).then(setSessions).catch(console.error);
      fetchClientPayments(client.id).then(setPayments).catch(console.error);
    }, 0); // Introduce a slight delay to ensure correct data loading
  };

  const handleClientSave = async (updatedFields: Partial<Client>) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, updatedFields);
        const updatedClients = await fetchClients();
        setClients(updatedClients); // Update the list of clients
        setSelectedClient(null); // Clear selected client
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleAddClientSubmit = async (newClient: Omit<Client, 'id'>) => {
    try {
      await addClient(newClient);
      setIsAddClientOpen(false);
      const updatedClients = await fetchClients();
      setClients(updatedClients);
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Left panel: BaseList */}
      <div style={{ flex: 1 }}>
        <BaseList<Client>
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          renderItem={(client: Client) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Client Info */}
              <Box>
                <Typography variant="h6">
                  {client.user.first_name} {client.user.last_name}
                </Typography>
                <Typography variant="body2">{client.user.email}</Typography>
                <Typography variant="body2">{client.user.phone_number}</Typography>
              </Box>

              {/* Action Icons */}
              <Box>
                <IconButton aria-label="call" onClick={() => window.open(`tel:${client.user.phone_number}`)}>
                  <PhoneIcon />
                </IconButton>
                <IconButton aria-label="email" onClick={() => window.open(`mailto:${client.user.email}`)}>
                  <EmailIcon />
                </IconButton>
                <IconButton aria-label="text" onClick={() => window.open(`sms:${client.user.phone_number}`)}>
                  <ChatIcon />
                </IconButton>
              </Box>
            </Box>
          )}
          onAddClient={() => setIsAddClientOpen(true)}
        />
      </div>

      {/* Right panel: BaseListDetailsPage */}
      {selectedClient && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedClient.id}
            data={selectedClient}
            fieldConfig={getClientFieldConfig(trainers)}
            onSave={handleClientSave}
          />

          {/* Sessions and Payments Cards */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sessions
                  </Typography>
                  {sessions.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Trainer</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sessions.map((session: Session) => (
                            <TableRow key={session.id}>
                              <TableCell>{session.date}</TableCell>
                              <TableCell>{session.session_type}</TableCell>
                              <TableCell>
                                {session.trainer && typeof session.trainer === 'object' && "user" in session.trainer ? (
                                  `${session.trainer.user.first_name} ${session.trainer.user.last_name}`
                                ) : (
                                  "Trainer Not Assigned"
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography>No sessions available.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payments
                  </Typography>
                  {payments.length > 0 ? (
                    payments.map((payment: Payment) => (
                      <Typography key={payment.id}>
                        {payment.date} - ${payment.amount} {payment.status}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No payments available.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}

      {/* Add Client Form Modal */}
      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        trainers={trainers}
        loading={loading}
      />
    </div>
  );
};

export default ClientsPage;
