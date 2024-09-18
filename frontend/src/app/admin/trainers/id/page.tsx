// src/app/admin/trainers/[id]/page.tsx

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { fetchTrainerById } from '../../../../services/trainerApi'; // API call to fetch a trainer by ID
import { Trainer } from '../../../../interfaces/trainer'; // Import Trainer interface

export default function TrainerDetailPage() {
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams(); // Extract the `id` parameter from the URL

    const trainerId: string = "1"; // Example value; this would be passed in dynamically in real usage
    const numericTrainerId = Number(trainerId);

    useEffect(() => {
        const loadTrainer = async () => {
            try {
                const data = await fetchTrainerById(numericTrainerId); // Fetch trainer details
                setTrainer(data);
            } catch (error) {
                console.error('Error fetching trainer:', error);
                setError('Failed to load trainer details.');
            } finally {
                setLoading(false);
            }
        };

        if (trainerId) {
            loadTrainer();
        }
    }, [trainerId]);

    // Render loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading trainer details...</Typography>
            </Box>
        );
    }

    // Render error state
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Render trainer details
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Trainer Details
            </Typography>
            {trainer && (
                <Box>
                    <Typography variant="h6">Trainer ID: {trainer.id}</Typography>
                    <Typography>Name: {trainer.user.first_name} {trainer.user.last_name}</Typography>
                    <Typography>Email: {trainer.user.email}</Typography>
                    <Typography>Status: {trainer.status}</Typography>
                    <Typography>Monthly Rate: ${trainer.monthly_rate}</Typography>
                    <Typography>Rate per Session: ${trainer.rent_rate_per_session}</Typography>
                    {/* Add more trainer details as needed */}
                </Box>
            )}
        </Box>
    );
}
