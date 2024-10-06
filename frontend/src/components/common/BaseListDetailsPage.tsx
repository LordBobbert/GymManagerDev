import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { FieldConfig } from "@/interfaces/FieldConfig";
import { ClientProfile } from "@/interfaces/client";
import { TrainerProfile } from "@/interfaces/trainer";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedData: Partial<T>) => Promise<void>;
  clients: ClientProfile[];
  trainers: TrainerProfile[];
  isEditing: boolean;
  handleChange: (key: string, value: any) => void;
}

const BaseListDetailsPage = <T extends {}>({
  data,
  fieldConfig,
  onSave,
  clients,
  trainers,
  isEditing,
  handleChange
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    handleChange(key, value);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {fieldConfig.map(({ label, key, type, options }) => {
        // Ensure key is a string or number
        const reactKey = String(key); // Explicitly cast key to string

        return type === "select" && key === "client_id" ? (
          <FormControl fullWidth key={reactKey}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={(formData as any).client?.user.id || ""}
              onChange={(e) =>
                handleInputChange(key as string, clients.find(client => client.user.id === Number(e.target.value)))
              }
              disabled={!isEditing}
            >
              {clients.map(client => (
                <MenuItem key={client.user.id} value={client.user.id}>
                  {client.user.first_name} {client.user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : type === "select" && key === "trainer_id" ? (
          <FormControl fullWidth key={reactKey}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={(formData as any).trainer?.user.id || ""}
              onChange={(e) =>
                handleInputChange(key as string, trainers.find(trainer => trainer.user.id === Number(e.target.value)))
              }
              disabled={!isEditing}
            >
              {trainers.map(trainer => (
                <MenuItem key={trainer.user.id} value={trainer.user.id}>
                  {trainer.user.first_name} {trainer.user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            key={reactKey}  // Use the converted string as the key
            label={label}
            type={type || "text"}
            value={(formData as any)[key] || ""}
            onChange={(e) => handleInputChange(key as string, e.target.value)}
            fullWidth
            disabled={!isEditing}
          />
        );
      })}
      <Button variant="contained" onClick={handleSave} disabled={!isEditing}>
        Save
      </Button>
    </Box>
  );
};

export default BaseListDetailsPage;
