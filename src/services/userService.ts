import api from './api';

// User login
export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/users', { name, email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// User logout
export const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from local storage
export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: any) => {
  const response = await api.put('/users/profile', userData);
  
  // Update the stored user data with the new information
  const currentUser = getCurrentUser();
  if (currentUser) {
    localStorage.setItem('user', JSON.stringify({
      ...currentUser,
      ...response.data,
    }));
  }
  
  return response.data;
};

// Admin: Get all users
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Admin: Delete a user
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Admin: Get user by ID
export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Admin: Update user
export const updateUser = async (id: string, userData: any) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};