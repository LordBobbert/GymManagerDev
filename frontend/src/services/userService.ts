// File: src/services/userService.ts

import { User } from "@/interfaces/user";

// Fetch all users (unfiltered)
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Fetch users with a specific role (e.g., clients, trainers)
export const fetchUsersByRole = async (role: string): Promise<User[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users?role=${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users with role: ${role}`);
    }

    const data = await res.json();
    return data as User[];
  } catch (error) {
    console.error(`Error fetching users with role ${role}:`, error);
    throw new Error(`Failed to fetch users with role: ${role}`);
  }
};

// Fetch clients
export const fetchClients = async (): Promise<User[]> => {
  return fetchUsersByRole("client");
};

// Fetch trainers
export const fetchTrainers = async (): Promise<User[]> => {
  return fetchUsersByRole("trainer");
};

// Fetch a single user by ID
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data as User;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
};

// Create a new user
export const createUser = async (newUser: Partial<User>): Promise<User> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const data = await res.json();
    return data as User;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// Update an existing user
export const updateUser = async (userId: number, updatedUser: Partial<User>): Promise<User> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/${userId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    const data = await res.json();
    return data as User;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Delete a user
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/${userId}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
