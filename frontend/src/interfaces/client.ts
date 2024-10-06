// File: src/interfaces/client.ts

import { User } from './user';  // Ensure the User interface is imported

export interface ClientProfile {
  user: User;  // Add the User reference here
  training_status: 'active' | 'inactive' | 'vacation';
  personal_training_rate?: number;
  rate_type: 'one_on_one' | 'partner';
  trainer_id?: number;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}
