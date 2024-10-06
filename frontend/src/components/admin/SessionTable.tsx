// File: src/components/admin/SessionTable.tsx

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Session } from "@/interfaces/session";
import { SESSION_TYPE_LABELS } from "@/config/sessionTypeLabels";
import { TrainerProfile } from "@/interfaces/trainer";

interface SessionTableProps {
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
  trainers: TrainerProfile[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions, onSessionSelect }) => {
  return (
    <TableContainer component={Paper} sx={{ flex: 1, marginRight: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Session Type</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Trainer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id} onClick={() => onSessionSelect(session)} hover sx={{ cursor: "pointer" }}>
              <TableCell>{new Date(session.date).toLocaleString()}</TableCell>
              <TableCell>{SESSION_TYPE_LABELS[session.session_type] || session.session_type}</TableCell>
              <TableCell>
                {session.client?.user ? `${session.client.user.first_name} ${session.client.user.last_name}` : "Client Not Assigned"}
              </TableCell>
              <TableCell>
                {session.trainer?.user ? `${session.trainer.user.first_name} ${session.trainer.user.last_name}` : "Trainer Not Assigned"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionTable;
