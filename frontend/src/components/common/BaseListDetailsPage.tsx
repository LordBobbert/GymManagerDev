// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: Partial<T>) => void;  // Send partial updates
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);  // Set initial state as Partial<T>
  const [modifiedData, setModifiedData] = useState<Partial<T>>({});  // Track modified fields
  const [isEditing, setIsEditing] = useState<boolean>(false);  // Track edit state

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => setNestedValue({ ...prev }, key, value));  // Use spread operator to maintain the shape of 'T'
    setModifiedData((prev) => setNestedValue({ ...prev }, key, value));  // Track changes
  };

  const handleSave = () => {
    if (Object.keys(modifiedData).length > 0) {
      onSave(modifiedData);  // Send only the modified data
      setIsEditing(false);  // Exit edit mode after saving
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {fieldConfig.map(({ label, key, type, options }) => {
          // Ensure that value is valid for input/select elements
          // Ensure that value is valid for input/select elements
          const value = getNestedValue(formData || {}, key as string);

          // If the value is an object or invalid, convert it to an empty string
          const inputValue = typeof value === 'string' || typeof value === 'number' || value === undefined
            ? value
            : '';  // Fallback to empty string if it's an invalid type

          return (
            <Grid item xs={12} sm={6} key={String(key)}>
              {type === 'select' && options ? (
                <>
                  <label>{label}</label>
                  <select
                    value={inputValue}  // Use validated inputValue
                    onChange={(e) => handleChange(key as string, e.target.value)}
                    disabled={!isEditing}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <input
                  type={type}
                  value={inputValue}  // Use validated inputValue
                  onChange={(e) => handleChange(key as string, e.target.value)}
                  readOnly={!isEditing}
                />
              )}
            </Grid>
          );



        })}
      </Grid>

      {/* Buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        {isEditing ? (
          <>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={Object.keys(modifiedData).length === 0}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
