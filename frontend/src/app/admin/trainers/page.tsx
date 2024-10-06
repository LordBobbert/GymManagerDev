"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";  // Ensure Box is imported
import BaseList from "../../../components/common/BaseList";
import BaseListDetailsPage from "../../../components/common/BaseListDetailsPage";
import { User } from "../../../interfaces/user";  // Use the consolidated User interface
import { fetchUsers } from "../../../services/userService";
import { getTrainerFieldConfig } from "../../../config/fieldConfigs";

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const users = await fetchUsers();
        const trainers = users.filter(user => user.roles.includes("trainer")); // Filter for trainers
        setTrainers(trainers);
        setLoading(false);
      } catch (error) {
        setError("Failed to load trainers");
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  const handleTrainerSelect = (trainer: User) => {
    setSelectedTrainer(trainer);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
      {/* BaseList takes 25% of the width */}
      <Box sx={{ flex: 1, width: "25%" }}>
        <BaseList<User>
          data={trainers}
          section="trainers"
          getKey={(trainer) => trainer.id}
          onSelect={handleTrainerSelect}
          renderItem={(trainer) => (
            <span>{trainer.first_name} {trainer.last_name}</span>
          )}
        />
      </Box>

      {/* BaseListDetailsPage takes 75% of the width */}
      {selectedTrainer && (
        <Box sx={{ flex: 3, width: "75%" }}>
          <BaseListDetailsPage<User>
            key={selectedTrainer.id}
            data={selectedTrainer}
            fieldConfig={getTrainerFieldConfig()}
            onSave={() => {}}
            isEditing={true}
            handleChange={(key, value) => {}}
            clients={[]}  // You can pass an empty array if clients are not needed
            trainers={trainers}  // Pass trainers
          />
        </Box>
      )}
    </Box>
  );
};

export default TrainersPage;
