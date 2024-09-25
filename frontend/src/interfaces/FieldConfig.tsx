export interface FieldConfig<T> {
    label: string;     // The label that will be displayed in the form.
    key: keyof T | string;  // Adjusted to accept both direct and nested keys as strings.
    type: string;      // Input type, e.g., 'text', 'email', etc.
    editable?: boolean; // Optional field to mark if the field is editable.
  }
  