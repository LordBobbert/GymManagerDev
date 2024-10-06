// File: src/components/common/BaseListDetailsPage.tsx

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { FieldConfig } from "@/interfaces/FieldConfig";
import { User } from "@/interfaces/user";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedData: T) => void;
  isEditing: boolean;
  clients: User[];  // Accept User[] for clients
  trainers: User[];  // Accept User[] for trainers
  handleChange: (key: keyof T, value: T[keyof T]) => void;
}

const BaseListDetailsPage = <T extends object>({
  data,
  fieldConfig,
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

        const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          let newValue: any = e.target.value;

          // Coerce types based on the field type
          if (type === "number") {
            newValue = parseFloat(newValue);
            if (isNaN(newValue)) newValue = 0; // Handle invalid numbers
          } else if (type === "date") {
            newValue = new Date(newValue);
          }

          handleChange(typedKey, newValue as T[keyof T]); // Cast based on expected type
        };

        return (
          <TextField
            key={String(key)}
            label={label}
            type={type || "text"}
            value={String(value)}
            onChange={handleInputChange}
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
