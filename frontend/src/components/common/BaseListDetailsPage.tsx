// File: src/components/common/BaseListDetailsPage.tsx

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { User } from "@/interfaces/user";
import { FieldConfig } from "@/interfaces/FieldConfig";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];  // Correct typing based on User
  clients: User[];  // Accept User[] for clients
  trainers: User[];  // Accept User[] for trainers
  onSave: (updatedData: T) => void;
  isEditing: boolean;
  handleChange: (key: keyof T, value: any) => void;
}

const BaseListDetailsPage = <T extends object>({
  data,
  fieldConfig,
  clients,
  trainers,
  onSave,
  isEditing,
  handleChange,
}: BaseListDetailsPageProps<T>) => {
  const handleSave = () => {
    onSave(data);
  };

  return (
    <Box>
      {fieldConfig.map(({ label, key, type }) => {
        const typedKey = key as keyof T;
        const value = (data[typedKey] as string | number | undefined) || "";

        return (
          <TextField
            key={String(key)}
            label={label}
            type={type || "text"}
            value={String(value)}
            onChange={(e) => handleChange(typedKey, e.target.value)}
            disabled={!isEditing}
            fullWidth
          />
        );
      })}
      <Button onClick={handleSave} disabled={!isEditing}>
        Save
      </Button>
    </Box>
  );
};

export default BaseListDetailsPage;
