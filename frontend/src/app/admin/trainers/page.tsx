// File: src/app/admin/trainers/TrainersPage.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddTrainerForm from '../../../components/admin/AddTrainerForm';  // Create similar to AddClientForm
import { Trainer } from '../../../interfaces/trainer';
import { fetchTrainers, addTrainer, updateTrainer } from '../../../services/trainerService';
import { getTrainerFieldConfig } from '../../../config/fieldConfigs';  // Field config for trainers

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[] | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers()
      .then((data) => setTrainers(data))
      .catch(() => setError('Failed to load trainers'))
      .finally(() => setLoading(false));
  }, []);

  const handleTrainerSelect = (trainer: Trainer) => {
    setSelectedTrainer(null);
    setTimeout(() => {
      setSelectedTrainer(trainer);
    }, 0);
  };

  const handleTrainerSave = async (updatedTrainer: Partial<Trainer>) => {
    try {
      if (selectedTrainer) {
        await updateTrainer(selectedTrainer.id, updatedTrainer);
        const updatedTrainers = await fetchTrainers();
        setTrainers(updatedTrainers);
        setSelectedTrainer(null);  // Reset selected trainer to refresh UI
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  const handleAddTrainerSubmit = async (newTrainer: Omit<Trainer, 'id'>) => {
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
        <BaseList<Trainer>
          data={trainers}
          section="trainers"
          getKey={(trainer) => trainer.id}
          onSelect={handleTrainerSelect}
          renderItem={(trainer: Trainer) => (
            <span>{trainer.user.first_name} {trainer.user.last_name}</span>
          )}
          onAddClient={() => setIsAddTrainerOpen(true)}
        />
      </div>

      {selectedTrainer && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedTrainer.id}
            data={selectedTrainer}
            fieldConfig={getTrainerFieldConfig()}  // Provide the field config for trainers
            onSave={handleTrainerSave}
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
