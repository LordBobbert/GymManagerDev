// File: src/components/admin/AddClientForm.tsx

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { User } from "@/interfaces/user";
import { SelectChangeEvent } from '@mui/material';  // Import SelectChangeEvent


interface AddClientFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newClient: Omit<User, "id" | "roles">) => Promise<void>;
    loading: boolean;
    trainers: User[]; // Trainers prop to populate the dropdown
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>,
        key: keyof Omit<User, "id" | "roles">
      ) => {
        setFormData(prev => ({
          ...prev,
          [key]: e.target.value,
        }));
      };
      

    const handleSave = () => {
        onSubmit(formData); // Submit the form data
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
                    {/* Other form fields */}
                    <FormControl fullWidth>
                        <InputLabel>Trainer</InputLabel>
                        <Select
                            value={formData.trainer_id || ""}
                            onChange={(e: SelectChangeEvent<number>) => handleChange(e, "trainer_id")}  // Correct typing
                        >
                            <MenuItem value="">None</MenuItem>
                            {trainers.map(trainer => (
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
