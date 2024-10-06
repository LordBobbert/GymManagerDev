import React, { useState } from 'react';
import {
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { ClientProfile } from '../../interfaces/client';
import { TrainerProfile } from '../../interfaces/trainer';

interface AddSessionFormProps {
    onClose: () => void;
    onSubmit: (newSession: { client_id: number; trainer_id: number; session_type: string; date: string; notes?: string }) => Promise<void>;
    clients: ClientProfile[];
    trainers: TrainerProfile[];
    loading: boolean;
    session?: { client: ClientProfile; trainer: TrainerProfile; session_type: string; date: string; notes?: string };  // Optional session data for editing
}

const SESSION_TYPE_CHOICES = [
    { value: 'one_on_one', label: 'One on One' },
    { value: 'partner', label: 'Partner' },
    { value: 'small_group', label: 'Small Group' },
    { value: 'group', label: 'Group' },
];

const AddSessionForm: React.FC<AddSessionFormProps> = ({ onClose, onSubmit, clients, trainers, loading, session }) => {
    const [formData, setFormData] = useState({
        client: session?.client || undefined,
        trainer: session?.trainer || undefined,
        session_type: session?.session_type || 'one_on_one',
        date: session?.date ? session.date.split('T')[0] : '',
        notes: session?.notes || '',
    });

    const handleChange = (key: keyof typeof formData, value: string | ClientProfile | TrainerProfile | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        if (!formData.client || !formData.client.user?.id) {
            alert("Please select a client.");
            return;
        }
        if (!formData.trainer || !formData.trainer.user?.id) {
            alert("Please select a trainer.");
            return;
        }

        const payload = {
            client_id: formData.client.user.id,  // Access client ID through user
            trainer_id: formData.trainer.user.id,  // Access trainer ID through user
            session_type: formData.session_type,
            date: formData.date,
            notes: formData.notes,
        };

        onSubmit(payload);
    };

    return (
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
                    value={formData.client?.user?.id || ''}
                    onChange={(e) => {
                        const selectedClient = clients.find(client => client.user.id === Number(e.target.value));
                        handleChange('client', selectedClient);
                    }}
                    fullWidth
                >
                    <MenuItem value="">None</MenuItem>
                    {clients.map((client) => (
                        <MenuItem key={client.user.id} value={client.user.id}>
                            {client.user.first_name} {client.user.last_name}
                        </MenuItem>
                    ))}
                </Select>

                <InputLabel>Trainer</InputLabel>
                <Select
                    value={formData.trainer?.user?.id || ''}
                    onChange={(e) => {
                        const selectedTrainer = trainers.find(trainer => trainer.user.id === Number(e.target.value));
                        handleChange('trainer', selectedTrainer);
                    }}
                    fullWidth
                >
                    <MenuItem value="">None</MenuItem>
                    {trainers.map((trainer) => (
                        <MenuItem key={trainer.user.id} value={trainer.user.id}>
                            {trainer.user.first_name} {trainer.user.last_name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
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
        </DialogContent>
    );
};

export default AddSessionForm;
