// File: src/components/admin/AddSessionModal.tsx

import React from "react";
import { Box, Modal } from "@mui/material";
import AddSessionForm from "@/components/admin/AddSessionForm";
import { User } from "@/interfaces/user";

interface AddSessionModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newSession: { client_id: number; trainer_id: number; session_type: string; date: string; notes?: string }) => Promise<void>;
    clients: User[];  // Clients are now User objects with the 'client' role
    trainers: User[];  // Trainers are now User objects with the 'trainer' role
    loading: boolean;
    session?: { client: User; trainer: User; session_type: string; date: string; notes?: string };  // Optional session data for editing
}

const AddSessionModal: React.FC<AddSessionModalProps> = ({
    open,
    onClose,
    onSubmit,
    clients,
    trainers,
    loading,
    session
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <AddSessionForm
                    onSubmit={onSubmit}
                    onClose={onClose}
                    clients={clients}
                    trainers={trainers}
                    loading={loading}
                    session={session}  // Optional session data for editing
                />
            </Box>
        </Modal>
    );
};

// Modal styling
const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
};

export default AddSessionModal;
