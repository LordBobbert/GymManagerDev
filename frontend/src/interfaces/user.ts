// File: src/interfaces/user.ts

import { ClientProfile } from '@/interfaces/client';  // Adjust the path based on your project structure
import { TrainerProfile } from '@/interfaces/trainer';  // Adjust the path based on your project structure


export interface Role {
    name: 'client' | 'trainer' | 'admin';  // Define possible role names
  }
  
  export interface User {
    id: number;  // Unique identifier for the user
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    gender?: 'male' | 'female';  // Optional fields for gender and birthday
    birthday?: string;
    roles: Role[];  // A user can have multiple roles
    client_profile?: ClientProfile;  // Optional, based on the role
    trainer_profile?: TrainerProfile;  // Optional, based on the role
  }
  