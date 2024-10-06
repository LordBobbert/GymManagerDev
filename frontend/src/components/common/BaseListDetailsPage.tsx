// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { FieldConfig } from "@/interfaces/FieldConfig";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedData: Partial<T>) => Promise<void>;
  isEditing: boolean;
  handleChange: (key: keyof T, value: unknown) => void;
  selectOptions?: Partial<{ [key in keyof T]: Array<{ label: string; value: string | number }> }>;
}

const BaseListDetailsPage = <T extends unknown>({
  data,
  fieldConfig,
  onSave,
  isEditing,
  handleChange,
  selectOptions = {},
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);

  const handleInputChange = (key: keyof T, value: unknown) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    handleChange(key, value);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {fieldConfig.map(({ label, key, type }) => {
        const typedKey = key as keyof T;
        const value = (formData[typedKey] as string | number | undefined) || "";

        if (type === "select" && selectOptions[typedKey]) {
          const options = selectOptions[typedKey];

          return (
            <FormControl fullWidth key={String(key)}>
              <InputLabel>{label}</InputLabel>
              <Select
                value={String(value)}
                onChange={(e) => handleInputChange(typedKey, e.target.value)}
                disabled={!isEditing}
              >
                {options?.map((option) => (
                  <MenuItem key={String(option.value)} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else {
          return (
            <TextField
              key={String(key)}
              label={label}
              type={type || "text"}
              value={String(value)}
              onChange={(e) => handleInputChange(typedKey, e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          );
        }
      })}
      <Button variant="contained" onClick={handleSave} disabled={!isEditing}>
        Save
      </Button>
    </Box>
  );
};

export default BaseListDetailsPage;
