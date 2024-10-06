// File: src/components/admin/AddSessionModal.tsx

import React from "react";
import { Box, Modal } from "@mui/material";
import AddSessionForm from "@/components/admin/AddSessionForm";
import { ClientProfile } from "@/interfaces/client";
import { TrainerProfile } from "@/interfaces/trainer";
import { Session } from "@/interfaces/session";

interface AddSessionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newSession: Omit<Session, "id">) => Promise<void>;
  clients: ClientProfile[];
  trainers: TrainerProfile[];
  loading: boolean;
}

const AddSessionModal: React.FC<AddSessionModalProps> = ({
  open,
  onClose,
  onSubmit,
  clients,
  trainers,
  loading
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <AddSessionForm
          onSubmit={onSubmit}
          onClose={onClose}
          clients={clients}
          trainers={trainers}
          loading={loading}
        />
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 4,
};

export default AddSessionModal;
