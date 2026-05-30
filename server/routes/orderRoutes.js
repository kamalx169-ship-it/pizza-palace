const router = require('express').Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getMyOrders);
router.get('/', verifyToken, isAdmin, getAllOrders);
router.put('/:id/status', verifyToken, isAdmin, updateOrderStatus);
router.delete('/:id', verifyToken, cancelOrder);

module.exports = router;