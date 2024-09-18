// src/app/admin/trainers/page.tsx or wherever you are using TrainerList

"use_client";

import React, { useState, useEffect } from 'react';
import { fetchTrainers } from '../../../services/trainerApi';
import { Trainer } from '../../../interfaces/trainer';
import TrainerList from '../../../components/trainers/TrainerList'; // Adjust path if necessary

const TrainersPage = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);

    useEffect(() => {
        const loadTrainers = async () => {
            try {
                const data = await fetchTrainers();
                setTrainers(data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        loadTrainers();
    }, []);

    // Handle the selection of a trainer
    const handleSelectTrainer = (trainer: Trainer) => { // Accept a Trainer object
        console.log('Selected trainer:', trainer);
        // Add your logic here for handling the trainer selection
    };

    return (
        <div>
            <h1>Trainer List</h1>
            <TrainerList trainers={trainers} onSelectTrainer={handleSelectTrainer} /> {/* Pass the prop */}
        </div>
    );
};

export default TrainersPage;
