// src/interfaces/client.ts

import { User } from './user'; // Import the User interface
import { Trainer } from './trainer'; // Import the Trainer interface

export interface Client {
    id: number;
    user: User;  // Include the user data
    training_status: 'active' | 'inactive' | 'vacation'; // Using ENUM values from TRAINING_STATUS_CHOICES
    personal_training_rate?: number;  // Assuming this is a decimal value
    rate_type: 'one_on_one' | 'partner';  // Using ENUM values from PERSONAL_TRAINING_RATE_CHOICES
    trainer?: Trainer;  // Reference to a Trainer object, optional
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

// src/interfaces/client.ts

export interface ClientProfileProps {
    client: Client | null; // Allow null values for the client
    onClientUpdated: (updatedClient: Client) => void; // Add this line
}
