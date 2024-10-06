import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { User } from "@/interfaces/user";
import { SelectChangeEvent } from "@mui/material/Select"; // Import SelectChangeEvent from MUI

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<User, "id" | "roles">) => Promise<void>;
  loading: boolean;
  trainers: User[]; // Trainers data
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, loading, trainers }) => {
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

  // Handle text input changes
  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Omit<User, "id" | "roles">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // Handle select input changes with proper casting
  const handleSelectChange = (
    e: SelectChangeEvent<string | number>, // Cast the event to either string or number
    key: keyof Omit<User, "id" | "roles">
  ) => {
    const value = e.target.value as string | number; // Cast to the expected value type
    setFormData((prev) => ({
      ...prev,
      [key]: value,
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
            onChange={(e) => handleTextFieldChange(e, "first_name")}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => handleTextFieldChange(e, "last_name")}
            fullWidth
          />
          <TextField
            label="Username"
            value={formData.username}
            onChange={(e) => handleTextFieldChange(e, "username")}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleTextFieldChange(e, "email")}
            fullWidth
          />
          <TextField
            label="Phone Number"
            value={formData.phone_number || ""}
            onChange={(e) => handleTextFieldChange(e, "phone_number")}
            fullWidth
          />
          <TextField
            label="Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday ? new Date(formData.birthday).toISOString().substr(0, 10) : ""}
            onChange={(e) => handleTextFieldChange(e, "birthday")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender || ""}
              onChange={(e) => handleSelectChange(e, "gender")}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Training Status</InputLabel>
            <Select
              value={formData.training_status || ""}
              onChange={(e) => handleSelectChange(e, "training_status")}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="vacation">Vacation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Personal Training Rate"
            type="number"
            value={formData.personal_training_rate || ""}
            onChange={(e) => handleTextFieldChange(e, "personal_training_rate")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Rate Type</InputLabel>
            <Select
              value={formData.rate_type || ""}
              onChange={(e) => handleSelectChange(e, "rate_type")}
            >
              <MenuItem value="one_on_one">One on One</MenuItem>
              <MenuItem value="partner">Partner</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Emergency Contact Name"
            value={formData.emergency_contact_name || ""}
            onChange={(e) => handleTextFieldChange(e, "emergency_contact_name")}
            fullWidth
          />
          <TextField
            label="Emergency Contact Phone"
            value={formData.emergency_contact_phone || ""}
            onChange={(e) => handleTextFieldChange(e, "emergency_contact_phone")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Trainer</InputLabel>
            <Select
              value={formData.trainer_id || ""}
              onChange={(e) => handleSelectChange(e, "trainer_id")}
            >
              <MenuItem value="">None</MenuItem>
              {trainers.map((trainer) => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.first_name} {trainer.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
