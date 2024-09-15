// src/interfaces/trainer.ts

import { User } from './user'; // Import the User interface

export interface Trainer {
    id: number;
    user: User;  // Include the user data
    status: 'sub_part_time' | 'sub_full_time' | 'emp_part_time' | 'emp_full_time' | 'inactive'; // Using ENUM values from STATUS_CHOICES
    monthly_rate: '200' | '250' | '1000';  // Using ENUM values from MONTHLY_RATE_CHOICES
    rent_rate_per_session: '15' | '20';  // Using ENUM values from GYM_SESSION_RATE_CHOICES
}
