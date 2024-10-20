// File: src/hooks/useForm.ts

import { useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (key: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return { formData, handleChange, setFormData };
};
