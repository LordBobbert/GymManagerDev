// File: src/config/fieldConfigs.ts

import { FieldConfig } from '../interfaces/FieldConfig';
import { Client } from '../interfaces/client';

export const clientFieldConfig: FieldConfig<Client>[] = [
  {
    label: 'First Name',
    key: 'user.first_name',
    type: 'text',
  },
  {
    label: 'Last Name',
    key: 'user.last_name',
    type: 'text',
  },
  {
    label: 'Username',
    key: 'user.username', // Correct path to the username field
    type: 'text',
  },
  {
    label: 'Email',
    key: 'user.email',
    type: 'email',
  },
  {
    label: 'Phone Number',
    key: 'user.phone_number',
    type: 'text',
  },
  {
    label: 'Training Status',
    key: 'training_status',
    type: 'select', // Could be a dropdown with ENUM values
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Vacation', value: 'vacation' },
    ],
  },
  {
    label: 'Personal Training Rate',
    key: 'personal_training_rate',
    type: 'number', // Can be a number input
  },
  {
    label: 'Rate Type',
    key: 'rate_type',
    type: 'select',
    options: [
      { label: 'One on One', value: 'one_on_one' },
      { label: 'Partner', value: 'partner' },
    ],
  },
  {
    label: 'Emergency Contact Name',
    key: 'emergency_contact_name',
    type: 'text',
  },
  {
    label: 'Emergency Contact Phone',
    key: 'emergency_contact_phone',
    type: 'text',
  },
];

