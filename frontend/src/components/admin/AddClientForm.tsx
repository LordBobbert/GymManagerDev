// File: src/components/admin/AddClientForm.tsx

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { User } from "@/interfaces/user";

interface AddClientFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newClient: Omit<User, "id" | "roles">) => Promise<void>;
    loading: boolean;
    trainers: User[]; // Pass trainers to populate the trainer dropdown
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Omit<User, "id" | "roles">) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const handleSelectChange = (
        e: React.ChangeEvent<{ value: unknown }>,
        key: keyof Omit<User, "id" | "roles">
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value as string | number, // Cast to appropriate type
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
                    <TextField
                        label="Email"
                        value={formData.email}
                        onChange={(e) => handleChange(e, "email")}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        value={formData.phone_number}
                        onChange={(e) => handleChange(e, "phone_number")}
                        fullWidth
                    />
                    <TextField
                        label="Emergency Contact Name"
                        value={formData.emergency_contact_name}
                        onChange={(e) => handleChange(e, "emergency_contact_name")}
                        fullWidth
                    />
                    <TextField
                        label="Emergency Contact Phone"
                        value={formData.emergency_contact_phone}
                        onChange={(e) => handleChange(e, "emergency_contact_phone")}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Trainer</InputLabel>
                        <Select
                            value={formData.trainer_id || ""}
                            onChange={(e) => handleSelectChange(e as React.ChangeEvent<{ value: unknown }>, "trainer_id")}
                        >
                            <MenuItem value="">None</MenuItem>
                            {trainers.map((trainer) => (
                                <MenuItem key={trainer.id} value={trainer.id}>
                                    {trainer.first_name} {trainer.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Training Status</InputLabel>
                        <Select
                            value={formData.training_status || ""}
                            onChange={(e) => handleSelectChange(e as React.ChangeEvent<{ value: unknown }>, "training_status")}
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
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, "personal_training_rate")}
                        fullWidth
                    />

                    <TextField
                        label="Birthday"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.birthday ? new Date(formData.birthday).toISOString().split("T")[0] : ""}
                        onChange={(e) => handleChange(e, "birthday")}
                        fullWidth
                    />
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
