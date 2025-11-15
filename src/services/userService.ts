const API_URL = 'http://localhost:3001/users';

export interface User {
  id: string;
  userName: string;
  userCode: string;
  countries: string[];
}

// get - all users
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// get - single user
export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

// user create
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

// user update
export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

// user delete
export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};