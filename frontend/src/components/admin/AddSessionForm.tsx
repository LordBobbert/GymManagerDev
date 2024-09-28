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
import { Session } from '../../interfaces/session';
import { Client } from '../../interfaces/client';
import { Trainer } from '../../interfaces/trainer';

interface AddSessionFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newSession: Omit<Session, 'id'>) => Promise<void>;
    clients: Client[];  // List of clients for dropdown
    trainers: Trainer[];  // List of trainers for dropdown
    loading: boolean;
    session?: Session;  // Optional session prop for editing existing sessions
}

const AddSessionForm: React.FC<AddSessionFormProps> = ({ open, onClose, onSubmit, clients, trainers, loading, session }) => {
    const [formData, setFormData] = useState<Omit<Session, 'id'>>({
        client: session?.client || undefined,  // Use undefined instead of null
        trainer: session?.trainer || undefined,  // Use undefined instead of null
        session_type: session?.session_type || 'individual',
        date: session?.date ? session.date.split('T')[0] : '',  // Format date correctly for editing
        notes: session?.notes || '',
    });

    const handleChange = (key: string, value: string | Client | Trainer | undefined) => {
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

                    <TextField
                        label="Session Type"
                        type="text"
                        value={formData.session_type}
                        onChange={(e) => handleChange('session_type', e.target.value)}
                        fullWidth
                    />

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
                            handleChange('client', selectedClient || undefined);
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
                            handleChange('trainer', selectedTrainer || undefined);
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
