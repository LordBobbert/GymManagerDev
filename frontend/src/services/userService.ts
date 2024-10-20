// File: src/services/userService.ts

import { CRUDService } from './CRUDService';
import { handleResponse } from '@/utils/apiHelpers';
import { User } from '../interfaces/user';

const userUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/users`;

export const fetchUsersPaginated = (page = 1, limit = 10) => 
  CRUDService.fetchAll<User>(`${userUrl}/?page=${page}&limit=${limit}`);

export const searchUsers = (query: string) => 
  CRUDService.fetchAll<User>(`${userUrl}/?search=${query}`);

export const fetchUsersByRole = (role: string) => 
  CRUDService.fetchAll<User>(`${userUrl}?role=${role}`);

export const fetchClients = () => fetchUsersByRole('client');

export const fetchTrainers = () => fetchUsersByRole('trainer');

export const fetchUserById = (id: number) => 
  CRUDService.fetchById<User>(userUrl, id);

export const createUser = (newUser: Partial<User>) => 
  CRUDService.create(userUrl, newUser);

export const updateUser = (id: number, updatedUser: Partial<User>) => 
  CRUDService.update(userUrl, id, updatedUser);

export const deleteUser = (id: number) => 
  CRUDService.delete(userUrl, id);

export const deleteUsersBulk = (userIds: number[]) => 
  CRUDService.create(`${userUrl}/bulk-delete`, { userIds });

export const toggleUserActivation = (id: number, isActive: boolean) => 
  CRUDService.update(userUrl, id, { isActive });

export const uploadUserProfileImage = async (id: number, imageFile: File): Promise<void> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(`${userUrl}/${id}/upload-profile-image`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  // Directly use handleResponse to process the fetch response
  await handleResponse(res, 'Failed to upload profile image');
};
