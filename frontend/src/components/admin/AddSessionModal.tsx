// File: src/components/admin/AddSessionModal.tsx

import React from "react";
import { Box, Modal } from "@mui/material";
import AddSessionForm from "@/components/admin/AddSessionForm";
import { Client } from "@/interfaces/client";
import { Trainer } from "@/interfaces/trainer";
import { Session } from "@/interfaces/session";  // Correct import for Session

interface AddSessionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newSession: Omit<Session, "id">) => Promise<void>;  // Return Promise<void>
  clients: Client[];
  trainers: Trainer[];
  loading: boolean;
}

const AddSessionModal: React.FC<AddSessionModalProps> = ({
  open,
  onClose,
  onSubmit,
  clients,
  trainers,
  loading,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ /* your styles */ }}>
        <AddSessionForm
          clients={clients}
          trainers={trainers}
          loading={loading}
          onSubmit={onSubmit}  // Pass the correct async onSubmit function
          onClose={onClose}
        />
      </Box>
    </Modal>
  );
};

export default AddSessionModal;
