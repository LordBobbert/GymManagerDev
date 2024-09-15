// src/pages/admin/trainers/TrainersPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import TrainerList from './TrainerList';
import TrainerProfile from './TrainerProfile';
import AddTrainerForm from './AddTrainerForm';
import { Trainer } from '../../../interfaces/trainer';
import axiosClient from '../../../api/axiosClient';

const TrainersPage: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [showAddTrainerForm, setShowAddTrainerForm] = useState(false);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axiosClient.get<Trainer[]>('/api/trainers/');
                setTrainers(response.data);
            } catch (error) {
                console.error('Error fetching trainers', error);
            }
        };

        fetchTrainers();
    }, []);

    // Handler to toggle the add trainer form visibility
    const handleAddTrainerClick = () => {
        setShowAddTrainerForm(true);
        setSelectedTrainer(null); // Clear selected trainer when showing the add trainer form
    };

    const handleSelectTrainer = (trainer: Trainer) => {
        setSelectedTrainer(trainer);
        setShowAddTrainerForm(false); // Hide add form when selecting a trainer
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {/* Left side: Trainer List (25%) */}
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Trainers</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTrainerClick}
                        >
                            Add Trainer
                        </Button>
                    </Box>
                    <TrainerList 
                        trainers={trainers} 
                        onSelectTrainer={handleSelectTrainer} 
                    />
                </Grid>

                {/* Right side: Trainer Profile (75%) */}
                <Grid item xs={9}>
                    {showAddTrainerForm ? (
                        <AddTrainerForm onTrainerAdded={() => setShowAddTrainerForm(false)} />
                    ) : (
                        <TrainerProfile trainer={selectedTrainer} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TrainersPage;
