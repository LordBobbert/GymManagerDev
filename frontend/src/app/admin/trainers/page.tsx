// File: src/app/admin/trainers/TrainersPage.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddTrainerForm from '../../../components/admin/AddTrainerForm';  // Create similar to AddClientForm
import { TrainerProfile } from '../../../interfaces/trainer';
import { fetchTrainers, addTrainer, updateTrainer } from '../../../services/trainerService';
import { getTrainerFieldConfig } from '../../../config/fieldConfigs';  // Field config for trainers

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[] | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers()
      .then((data) => setTrainers(data))
      .catch(() => setError('Failed to load trainers'))
      .finally(() => setLoading(false));
  }, []);

  const handleTrainerSelect = (trainer: TrainerProfile) => {
    setSelectedTrainer(null);
    setTimeout(() => {
      setSelectedTrainer(trainer);
    }, 0);
  };

  const handleTrainerSave = async (updatedTrainer: Partial<TrainerProfile>) => {
    try {
      if (selectedTrainer) {
        await updateTrainer(selectedTrainer.user.id, updatedTrainer);
        const updatedTrainers = await fetchTrainers();
        setTrainers(updatedTrainers);
        setSelectedTrainer(null);  // Reset selected trainer to refresh UI
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  const handleAddTrainerSubmit = async (newTrainer: Omit<TrainerProfile, 'id'>) => {
    try {
      await addTrainer(newTrainer);
      setIsAddTrainerOpen(false);
      const updatedTrainers = await fetchTrainers();
      setTrainers(updatedTrainers);
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!trainers) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <BaseList<TrainerProfile>
          data={trainers}
          section="trainers"
          getKey={(trainer) => trainer.user.id}
          onSelect={handleTrainerSelect}
          renderItem={(trainer: TrainerProfile) => (
            <span>{trainer.user.first_name} {trainer.user.last_name}</span>
          )}
          onAddClient={() => setIsAddTrainerOpen(true)}
        />
      </div>

      {selectedTrainer && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage<TrainerProfile>
            key={selectedTrainer.user.id}
            data={selectedTrainer}
            fieldConfig={getTrainerFieldConfig()}
            onSave={handleTrainerSave}
            isEditing={true}  // Set this to control editing mode
            handleChange={(key, value) => {
              setSelectedTrainer((prevTrainer) => {
                if (!prevTrainer) return null;
            
                // Check if we're updating a nested 'user' field
                if (key in prevTrainer.user) {
                  return {
                    ...prevTrainer,
                    user: {
                      ...prevTrainer.user,
                      [key]: value,
                    },
                  };
                } else {
                  // Otherwise, update the trainer-level fields
                  return {
                    ...prevTrainer,
                    [key]: value,
                  };
                }
              });
            }}
            
            clients={[]}  // You can pass an empty array if clients are not needed
            trainers={[]}  // If you have trainers data to pass, use that here
          />

        </div>
      )}

      <AddTrainerForm
        open={isAddTrainerOpen}
        onClose={() => setIsAddTrainerOpen(false)}
        onSubmit={handleAddTrainerSubmit}
        loading={loading}
      />
    </div>
  );
};

export default TrainersPage;
