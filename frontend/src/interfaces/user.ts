// File: src/interfaces/user.ts

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number?: string;
    gender?: string;
    birthday?: Date;
    roles: string[];  // Array of roles like 'client', 'trainer', etc.
  
    // Client-specific fields (optional, apply if user has 'client' role)
    training_status?: 'active' | 'inactive' | 'vacation';
    personal_training_rate?: number;
    rate_type?: 'one_on_one' | 'partner';
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    trainer_id?: number;  // The ID of the trainer assigned to the client
    trainer?: User;  // Reference to the trainer's User object (if applicable)
  
    // Trainer-specific fields (optional, apply if user has 'trainer' role)
    status?: 'sub_part_time' | 'sub_full_time' | 'emp_part_time' | 'emp_full_time' | 'inactive';
    monthly_rate?: number;  // Trainer's monthly rate, if applicable
    rent_rate_per_session?: number;  // Rent rate per session for trainers
  }
  