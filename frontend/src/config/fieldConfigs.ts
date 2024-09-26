// File: src/config/fieldConfigs.ts

import { FieldConfig } from '../interfaces/FieldConfig';
import { Client } from '../interfaces/client';
import { Trainer } from '../interfaces/trainer';

export const getClientFieldConfig = (trainers: Trainer[]): FieldConfig<Client>[] => [
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
    key: 'user.username',
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
    label: 'Birthday',
    key: 'user.birthday',
    type: 'date',
  },
  {
    label: 'Gender',
    key: 'user.gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    label: 'Roles',
    key: 'user.roles',  // Assuming roles is an array of objects with a "name" field
    type: 'text',  // You may need to customize this if it's a multi-select or display logic for roles
  },
  {
    label: 'Training Status',
    key: 'training_status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Vacation', value: 'vacation' },
    ],
  },
  {
    label: 'Personal Training Rate',
    key: 'personal_training_rate',
    type: 'number',
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
    label: 'Trainer', // Field for trainer
    key: 'trainer.id',  // Use `trainer.id` to reference the trainer's id
    type: 'select',  // Make this a select dropdown
    options: trainers.map((trainer) => ({
      label: `${trainer.user.first_name} ${trainer.user.last_name}`,
      value: trainer.id,
    })),  // Map the trainers into options
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
