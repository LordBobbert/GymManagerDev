// File: src/components/admin/AddClientForm.tsx

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from "@mui/material";
import { User } from "@/interfaces/user";

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<User, "id" | "roles">) => Promise<void>;
  loading: boolean;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState<Omit<User, "id" | "roles">>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    gender: undefined,
    birthday: undefined,
    training_status: "active",
    personal_training_rate: 0,
    rate_type: "one_on_one",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    trainer_id: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof Omit<User, "id" | "roles">) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="First Name"
            value={formData.first_name}
            onChange={(e) => handleChange(e, "first_name")}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => handleChange(e, "last_name")}
            fullWidth
          />
          {/* Other field heres */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientForm;
