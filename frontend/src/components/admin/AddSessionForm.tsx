import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { Client } from '../../interfaces/client';
import { Trainer } from '../../interfaces/trainer';

interface AddSessionFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newSession: { client_id: number; trainer_id: number; session_type: string; date: string; notes?: string }) => Promise<void>;
    clients: Client[];
    trainers: Trainer[];
    loading: boolean;
    session?: { client: Client; trainer: Trainer; session_type: string; date: string; notes?: string };  // Optional session data for editing
}

const SESSION_TYPE_CHOICES = [
    { value: 'one_on_one', label: 'One on One' },
    { value: 'partner', label: 'Partner' },
    { value: 'small_group', label: 'Small Group' },
    { value: 'group', label: 'Group' },
];

const AddSessionForm: React.FC<AddSessionFormProps> = ({ open, onClose, onSubmit, clients, trainers, loading, session }) => {
    const [formData, setFormData] = useState({
        client: session?.client || undefined,
        trainer: session?.trainer || undefined,
        session_type: session?.session_type || 'one_on_one',
        date: session?.date ? session.date.split('T')[0] : '',
        notes: session?.notes || '',
    });

    const handleChange = (key: keyof typeof formData, value: string | Client | Trainer | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        if (!formData.client || !formData.client.id) {
            alert("Please select a client.");
            return;
        }
        if (!formData.trainer || !formData.trainer.id) {
            alert("Please select a trainer.");
            return;
        }

        const payload = {
            client_id: formData.client.id,
            trainer_id: formData.trainer.id,
            session_type: formData.session_type,
            date: formData.date,
            notes: formData.notes,
        };

        onSubmit(payload);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{session ? 'Edit Session' : 'Add Session'}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        fullWidth
                    />

                    <InputLabel>Session Type</InputLabel>
                    <Select
                        value={formData.session_type}
                        onChange={(e) => handleChange('session_type', e.target.value)}
                        fullWidth
                    >
                        {SESSION_TYPE_CHOICES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Notes"
                        type="text"
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        fullWidth
                    />

                    <InputLabel>Client</InputLabel>
                    <Select
                        value={formData.client?.id || ''}
                        onChange={(e) => {
                            const selectedClient = clients.find(client => client.id === Number(e.target.value));
                            handleChange('client', selectedClient);
                        }}
                        fullWidth
                    >
                        <MenuItem value="">None</MenuItem>
                        {clients.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.user.first_name} {client.user.last_name}
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel>Trainer</InputLabel>
                    <Select
                        value={formData.trainer?.id || ''}
                        onChange={(e) => {
                            const selectedTrainer = trainers.find(trainer => trainer.id === Number(e.target.value));
                            handleChange('trainer', selectedTrainer);
                        }}
                        fullWidth
                    >
                        <MenuItem value="">None</MenuItem>
                        {trainers.map((trainer) => (
                            <MenuItem key={trainer.id} value={trainer.id}>
                                {trainer.user.first_name} {trainer.user.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSessionForm;
