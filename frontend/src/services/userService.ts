// File: src/services/userService.ts

import { User } from "@/interfaces/user";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",  // Ensure cookies (like session cookies) are sent with requests
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

// Fetch all users with a specific role
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
      throw new Error("Failed to fetch users by role");
    }

    const data = await res.json();
    return data as User[];
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw new Error("Failed to fetch users by role");
  }
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
