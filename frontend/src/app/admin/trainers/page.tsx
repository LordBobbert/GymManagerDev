// File: src/app/admin/trainers/TrainersPage.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddTrainerForm from '../../../components/admin/AddTrainerForm';
import { User } from '../../../interfaces/user';
import { fetchUsers, createUser, updateUser } from '../../../services/userService';
import { getTrainerFieldConfig } from '../../../config/fieldConfigs';  // Field config for trainers

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<User[] | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        const trainerUsers = fetchedUsers.filter((user) => user.roles.includes("trainer"));
        setTrainers(trainerUsers);
        setLoading(false);
      } catch (error) {
        setError('Failed to load trainers');
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  const handleTrainerSelect = (trainer: User) => {
    setSelectedTrainer(null);
    setTimeout(() => {
      setSelectedTrainer(trainer);
    }, 0);
  };

  const handleTrainerSave = async (updatedTrainer: Partial<User>) => {
    try {
      if (selectedTrainer) {
        await updateUser(selectedTrainer.id, updatedTrainer);
        const fetchedUsers = await fetchUsers();
        const updatedTrainers = fetchedUsers.filter((user) => user.roles.includes("trainer"));
        setTrainers(updatedTrainers);
        setSelectedTrainer(null);
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  const handleAddTrainerSubmit = async (newTrainer: Omit<User, 'id'>) => {
    try {
      await createUser(newTrainer);
      setIsAddTrainerOpen(false);
      const fetchedUsers = await fetchUsers();
      const updatedTrainers = fetchedUsers.filter((user) => user.roles.includes("trainer"));
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
        <BaseList<User>
          data={trainers}
          section="trainers"
          getKey={(trainer) => trainer.id}
          onSelect={handleTrainerSelect}
          renderItem={(trainer: User) => (
            <span>{trainer.first_name} {trainer.last_name}</span>
          )}
          onAddItem={() => setIsAddTrainerOpen(true)}
        />
      </div>

      {selectedTrainer && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage<User>
            key={selectedTrainer.id}
            data={selectedTrainer}
            fieldConfig={getTrainerFieldConfig()}  // FieldConfig now expects User
            onSave={handleTrainerSave}
            isEditing={true}
            handleChange={(key, value) => {
              setSelectedTrainer((prevTrainer) => prevTrainer ? { ...prevTrainer, [key]: value } : null);
            }}
            clients={[]}  // Pass empty clients if not needed
            trainers={trainers}  // Pass trainers
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
