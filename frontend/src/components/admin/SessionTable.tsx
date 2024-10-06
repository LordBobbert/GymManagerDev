// File: src/components/admin/SessionTable.tsx

import React from "react";
import { User } from "@/interfaces/user";
import { Session } from "@/interfaces/session";

interface SessionTableProps {
    sessions: Session[];
    onSessionSelect: (session: Session) => void;
    trainers: User[];  // Accepting filtered User[] for trainers
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions, onSessionSelect, trainers }) => {
    return (
        <div>
            <h3>Session Table</h3>
            {sessions.map((session) => (
                <div key={session.id} onClick={() => onSessionSelect(session)}>
                    <span>{session.session_type}</span>
                    <span>
                        {trainers.find(trainer => trainer.id === session.trainer?.id)?.first_name || null}
                    </span>


                </div>
            ))}
        </div>
    );
};

export default SessionTable;
