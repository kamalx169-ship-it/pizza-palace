import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.error('Please enter delivery address!');
      return;
    }
    setLoading(true);
    try {
      const items = cart.map(i => ({ pizza: i._id, qty: i.qty }));
      await api.post('/orders', { items, totalAmount: total, deliveryAddress: address });
      clearCart();
      toast.success('Order placed! 🍕');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-black text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            CHECK<span className="text-red-500">OUT</span>
          </motion.h1>
          <p className="text-gray-500 mt-1">Review your order and place it</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Address + Customer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <motion.div
            className="bg-[#111] border border-white/10 rounded-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              📍 Delivery Address
            </h2>
            <textarea
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 h-32 resize-none text-sm"
              placeholder="Enter your full delivery address including street, city and pincode..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </motion.div>

          {/* Customer Info */}
          <motion.div
            className="bg-[#111] border border-white/10 rounded-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              👤 Customer Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-500 text-sm">Name</span>
                <span className="text-white font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500 text-sm">Email</span>
                <span className="text-white font-medium">{user?.email}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — Order Summary */}
        <motion.div
          className="bg-[#111] border border-white/10 rounded-3xl p-6 h-fit sticky top-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white font-bold text-xl mb-6">🛒 Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-white text-sm font-medium leading-tight">{item.name}</p>
                    <p className="text-gray-600 text-xs">x{item.qty}</p>
                  </div>
                </div>
                <span className="text-red-400 font-bold text-sm">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold">₹{total}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Delivery</span>
              <span className="text-green-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-red-500 font-black text-2xl">₹{total}</span>
            </div>
          </div>

          <motion.button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl transition disabled:opacity-50 text-lg"
            whileTap={{ scale: 0.97 }}
          >
            {loading ? '⏳ Placing...' : '🍕 Place Order'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;