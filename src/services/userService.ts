import api from './api';

// User login
export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data) {
    // Transform the data to match application's expected structure
    const userData = {
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.isAdmin ? 'admin' : 'customer',
      token: response.data.token
    };
    
    // Use consistent key for user storage
    localStorage.setItem('bookstore-current-user', JSON.stringify(userData));
    return userData;
  }
  return response.data;
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/users', { name, email, password });
  if (response.data) {
    // Transform the data to match application's expected structure
    const userData = {
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.isAdmin ? 'admin' : 'customer',
      token: response.data.token
    };
    
    // Use consistent key for user storage
    localStorage.setItem('bookstore-current-user', JSON.stringify(userData));
    return userData;
  }
  return response.data;
};

// User logout
export const logout = () => {
  localStorage.removeItem('bookstore-current-user');
};

// Get current user from local storage
export const getCurrentUser = () => {
  const userJson = localStorage.getItem('bookstore-current-user');
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
    const updatedUser = {
      ...currentUser,
      name: response.data.name,
      email: response.data.email,
      // Only update role if it's present in the response
      ...(response.data.isAdmin !== undefined ? { role: response.data.isAdmin ? 'admin' : 'customer' } : {})
    };
    
    localStorage.setItem('bookstore-current-user', JSON.stringify(updatedUser));
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