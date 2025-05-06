const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const bookCount = await Book.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    
    // Calculate total revenue from all paid orders
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Calculate monthly growth percentages (placeholder, can be replaced with actual calculations)
    const bookGrowth = '+2% from last month';
    const userGrowth = '+5% from last month';
    const orderGrowth = '+12% from last month';
    const revenueGrowth = '+8% from last month';

    res.json({
      books: {
        count: bookCount,
        change: bookGrowth
      },
      users: {
        count: userCount,
        change: userGrowth
      },
      orders: {
        count: orderCount,
        change: orderGrowth
      },
      revenue: {
        total: totalRevenue,
        change: revenueGrowth
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent orders
// @route   GET /api/dashboard/recent-orders
// @access  Private/Admin
const getRecentOrders = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name');
    
    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock books
// @route   GET /api/dashboard/low-stock
// @access  Private/Admin
const getLowStockBooks = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;
    const limit = Number(req.query.limit) || 5;
    
    const lowStockBooks = await Book.find({ countInStock: { $lt: threshold } })
      .sort({ countInStock: 1 })
      .limit(limit);
    
    res.json(lowStockBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue statistics
// @route   GET /api/dashboard/revenue
// @access  Private/Admin
const getRevenueStats = async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    
    let revenueData = [];
    const currentDate = new Date();
    
    if (period === 'monthly') {
      // Get monthly revenue for the last 6 months
      for (let i = 0; i < 6; i++) {
        const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        
        const orders = await Order.find({
          isPaid: true,
          paidAt: { $gte: month, $lte: nextMonth }
        });
        
        const monthlyRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        revenueData.push({
          period: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
          revenue: monthlyRevenue
        });
      }
    } else if (period === 'weekly') {
      // Get weekly revenue for the last 6 weeks
      for (let i = 0; i < 6; i++) {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - (7 * i + currentDate.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const orders = await Order.find({
          isPaid: true,
          paidAt: { $gte: weekStart, $lte: weekEnd }
        });
        
        const weeklyRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        revenueData.push({
          period: `Week ${i + 1}`,
          revenue: weeklyRevenue
        });
      }
    }
    
    // Reverse to get chronological order
    revenueData.reverse();
    
    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getLowStockBooks,
  getRevenueStats
};