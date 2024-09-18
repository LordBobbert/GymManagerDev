// src/interfaces/client.ts

import { User } from './user'; // Import the User interface
import { Trainer } from './trainer'; // Import the Trainer interface

export interface Client {
    id: number;
    user: User;  // Include the user data
    training_status: 'active' | 'inactive' | 'vacation'; // ENUM values for training status
    personal_training_rate?: number;  // Optional decimal value for training rate
    rate_type: 'one_on_one' | 'partner';  // ENUM values for rate type
    trainer?: Trainer;  // Optional reference to a Trainer object
    emergency_contact_name?: string; // Optional emergency contact name
    emergency_contact_phone?: string; // Optional emergency contact phone
}

// src/interfaces/client.ts

export interface ClientProfileProps {
    client: Client | null; // Allow null values for the client
    onClientUpdated: (updatedClient: Client) => void; // Callback function to handle updates
}

