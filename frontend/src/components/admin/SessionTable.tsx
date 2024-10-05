// File: src/components/admin/SessionTable.tsx

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Session } from "@/interfaces/session";
import { Trainer } from "@/interfaces/trainer";

interface SessionTableProps {
    sessions: Session[];
    onSessionSelect: (session: Session) => void;
    trainers: Trainer[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions, onSessionSelect, trainers }) => {

    const renderTrainer = (session: Session) => {
        // Ensure session has a trainer and the trainer has a user object
        if (session.trainer && typeof session.trainer === 'object' && 'user' in session.trainer) {
            return `${session.trainer.user.first_name} ${session.trainer.user.last_name}`;
        }

        return "Trainer Not Assigned";
    };
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
                        <TableRow
                            key={session.id}
                            onClick={() => onSessionSelect(session)}
                            hover
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>{new Date(session.date).toLocaleString()}</TableCell>
                            <TableCell>{session.session_type}</TableCell>
                            <TableCell>
                                {session.client?.user.first_name} {session.client?.user.last_name}
                            </TableCell>
                            <TableCell>{renderTrainer(session)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SessionTable;
