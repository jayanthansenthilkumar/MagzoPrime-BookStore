
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  password: string; // Note: In a real app, this would be hashed!
}

export const users: User[] = [
  {
    id: 'user1',
    name: 'Admin User',
    email: 'admin@bookstore.com',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: 'user2',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    password: 'customer123'
  }
];

// In a real app, you would use secure authentication methods
// This is just a simple mock for demonstration

export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const savedUser = localStorage.getItem('bookstore-current-user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  if (user) {
    localStorage.setItem('bookstore-current-user', JSON.stringify(user));
  } else {
    localStorage.removeItem('bookstore-current-user');
  }
};
