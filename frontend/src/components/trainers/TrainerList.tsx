// src/components/dashboard/TrainerList.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Trainer } from '../../interfaces/trainer';

interface TrainerListProps {
    trainers: Trainer[];
    onSelectTrainer: (trainer: Trainer) => void;
}

const TrainerList: React.FC<TrainerListProps> = ({ trainers, onSelectTrainer }) => {
    return (
        <List>
            {trainers?.map((trainer) => (
                <ListItem
                    key={trainer.id}
                    onClick={() => onSelectTrainer(trainer)}
                    component="div"
                    sx={{ cursor: 'pointer' }}
                >
                    <ListItemText
                        primary={`${trainer.user.first_name} ${trainer.user.last_name}`}
                        secondary={trainer.user.email}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default TrainerList;
