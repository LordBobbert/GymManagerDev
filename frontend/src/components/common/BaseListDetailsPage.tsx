// File: src/components/common/BaseListDetailsPage.tsx

import React from "react";
import { Box, Grid, Button, Paper, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FieldConfig } from "@/interfaces/FieldConfig";
import { getNestedValue, setNestedValue } from "@/utils/nestedUtils";

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: Partial<T>) => Promise<void>;
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = React.useState<Partial<T>>(data);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => setNestedValue({ ...prev }, key, value));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Paper>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          {fieldConfig.map(({ key, label, type, options }) => {
            const value = getNestedValue(formData, key as string) || ""; // Cast key to string to resolve the issue
            return (
              <Grid item xs={12} sm={6} key={key as string}>
                {type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      label={label}
                      value={value}
                      onChange={(e) => handleChange(key as string, e.target.value)}
                      fullWidth
                    >
                      {options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={label}
                    value={value}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BaseListDetailsPage;
