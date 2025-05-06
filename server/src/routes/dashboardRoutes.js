const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getRecentOrders, 
  getLowStockBooks, 
  getRevenueStats 
} = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

// All dashboard routes should be protected and restricted to admin users
router.use(protect, admin);

// Get dashboard statistics
router.route('/stats').get(getDashboardStats);

// Get recent orders
router.route('/recent-orders').get(getRecentOrders);

// Get low stock books
router.route('/low-stock').get(getLowStockBooks);

// Get revenue statistics
router.route('/revenue').get(getRevenueStats);

module.exports = router;