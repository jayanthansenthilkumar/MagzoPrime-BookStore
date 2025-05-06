import api from './api';

// Get dashboard statistics (total books, users, orders, revenue)
export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

// Get recent orders for the dashboard
export const getRecentOrders = async (limit = 5) => {
  const response = await api.get('/dashboard/recent-orders', { params: { limit } });
  return response.data;
};

// Get low stock books for the dashboard
export const getLowStockBooks = async (threshold = 10, limit = 5) => {
  const response = await api.get('/dashboard/low-stock', { 
    params: { threshold, limit } 
  });
  return response.data;
};

// Get revenue statistics 
export const getRevenueStats = async (period = 'monthly') => {
  const response = await api.get('/dashboard/revenue', { params: { period } });
  return response.data;
};