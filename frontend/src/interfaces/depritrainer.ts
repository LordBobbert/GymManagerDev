// File: src/interfaces/trainer.ts

import { User } from './user';  // Ensure the User interface is imported

export interface TrainerProfile {
  user: User;  // Add the User reference here
  status: 'sub_part_time' | 'sub_full_time' | 'emp_part_time' | 'emp_full_time' | 'inactive';
  monthly_rate: '200' | '250' | '1000';
  rent_rate_per_session: '15' | '20';
}
