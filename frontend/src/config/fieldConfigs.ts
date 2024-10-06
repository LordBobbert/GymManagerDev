// File: src/config/fieldConfigs.ts

import { FieldConfig } from '../interfaces/FieldConfig';
import { TrainerProfile } from '../interfaces/depritrainer';
import { User } from '../interfaces/user';
import { Session } from '../interfaces/session';  // Import Session type

// Updated getClientFieldConfig function
export const getClientFieldConfig = (): FieldConfig<User>[] => [
  {
    label: 'First Name',
    key: 'first_name',  // User-specific fields
    type: 'text',
  },
  {
    label: 'Last Name',
    key: 'last_name',  // User-specific fields
    type: 'text',
  },
  {
    label: 'Email',
    key: 'email',
    type: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone_number',
    type: 'text',
  },
  {
    label: 'Birthday',
    key: 'birthday',
    type: 'date',
  },
  {
    label: 'Gender',
    key: 'gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    label: 'Training Status',
    key: 'training_status',  // Client-specific fields
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

// Updated getTrainerFieldConfig function
export const getTrainerFieldConfig = (): FieldConfig<User>[] => [
  {
    label: 'First Name',
    key: 'first_name',  // Directly reference User fields
    type: 'text',
  },
  {
    label: 'Last Name',
    key: 'last_name',
    type: 'text',
  },
  {
    label: 'Email',
    key: 'email',
    type: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone_number',
    type: 'text',
  },
  {
    label: 'Birthday',
    key: 'birthday',
    type: 'date',
  },
  {
    label: 'Gender',
    key: 'gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  {
    label: 'Status',
    key: 'status',
    type: 'select',
    options: [
      { value: 'sub_part_time', label: 'Subcontractor Part Time' },
      { value: 'sub_full_time', label: 'Subcontractor Full Time' },
      { value: 'emp_part_time', label: 'Employee Part Time' },
      { value: 'emp_full_time', label: 'Employee Full Time' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    label: 'Monthly Rate',
    key: 'monthly_rate',
    type: 'number',
  },
  {
    label: 'Rent Rate per Session',
    key: 'rent_rate_per_session',
    type: 'number',
  },
];

// Updated getSessionFieldConfig function - using Session instead of any
export const getSessionFieldConfig = (): FieldConfig<Session>[] => [
  {
    label: 'Date',
    key: 'date',
    type: 'date',
  },
  {
    label: 'Session Type',
    key: 'session_type',
    type: 'select',
    options: [
      { label: 'One on One', value: 'one_on_one' },
      { label: 'Partner', value: 'partner' },
      { label: 'Small Group', value: 'small_group' },
      { label: 'Group', value: 'group' },
    ],
  },
  {
    label: 'Client',
    key: 'client_id',
    type: 'select',
  },
  {
    label: 'Trainer',
    key: 'trainer_id',
    type: 'select',
  },
  {
    label: 'Notes',
    key: 'notes',
    type: 'text',
  },
];
