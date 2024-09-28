// File: src/components/admin/AddSessionForm.tsx

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
} from '@mui/material';
import { Session } from '../../interfaces/session';

interface AddSessionFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newSession: Omit<Session, 'id'>) => Promise<void>;
    loading: boolean;
}

const AddSessionForm: React.FC<AddSessionFormProps> = ({ open, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState<Omit<Session, 'id'>>({
        client: undefined,  // Set initial state for client
        trainer: undefined,  // Set initial state for trainer
        session_type: 'individual',
        date: '',
        notes: '',
    });

    const handleChange = (key: string, value: string | undefined) => {
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
            <DialogTitle>Add Session</DialogTitle>
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
