// File: src/components/common/BaseListDetailsPage.tsx

import React from "react";
import { Box, Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { FieldConfig } from "@/interfaces/FieldConfig";
import { User } from "@/interfaces/user";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  clients: User[];  // Now accepting User[] for clients
  trainers: User[];  // Now accepting User[] for trainers
  onSave: (updatedData: T) => void;
  isEditing: boolean;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
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

        const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
        ) => {
          let newValue: T[keyof T] = e.target.value as T[keyof T];

          // Coerce types based on the field type
          if (type === "number") {
            newValue = parseFloat(e.target.value as string) as T[keyof T];
          } else if (type === "date") {
            newValue = e.target.value as unknown as T[keyof T];
          }

          handleChange(typedKey, newValue);
        };

        if (key === "client_id" || key === "trainer_id") {
          const options = key === "client_id" ? clients : trainers;
          return (
            <Box key={String(key)} sx={{ mb: 2 }}>
              <InputLabel>{label}</InputLabel>
              <Select
                value={value || ""}
                onChange={(e) =>
                  handleChange(
                    typedKey,
                    Number(e.target.value) as unknown as T[keyof T]
                  )
                }
                fullWidth
              >
                <MenuItem value="">None</MenuItem>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.first_name} {option.last_name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          );
        }

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
