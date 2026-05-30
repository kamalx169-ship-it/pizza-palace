import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
      <motion.div
        className="text-8xl mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🛒
      </motion.div>
      <h2 className="text-3xl font-black text-white mb-2">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8">Add some delicious pizzas to get started!</p>
      <button
        onClick={() => navigate('/menu')}
        className="bg-red-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-red-500 transition text-lg"
      >
        🍕 Browse Menu
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl font-black text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            YOUR <span className="text-red-500">CART</span>
          </motion.h1>
          <p className="text-gray-500 mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                key={item._id}
                className="bg-[#111] border border-white/10 rounded-3xl p-5 flex items-center gap-5 hover:border-red-500/30 transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-red-500 font-bold mt-1">₹{item.price}</p>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 py-2">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="text-white font-black text-lg w-6 text-center hover:text-red-400 transition"
                  >
                    −
                  </button>
                  <span className="text-white font-black text-lg w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="text-white font-black text-lg w-6 text-center hover:text-green-400 transition"
                  >
                    +
                  </button>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-white font-black text-xl">₹{item.price * item.qty}</p>
                  <button
                    onClick={() => { removeFromCart(item._id); toast.success('Removed!'); }}
                    className="text-red-500 text-xs hover:text-red-400 mt-1 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div
          className="bg-[#111] border border-white/10 rounded-3xl p-6 h-fit sticky top-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-white font-black text-xl mb-6">ORDER SUMMARY</h2>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-500 truncate pr-2">{item.name} x{item.qty}</span>
                <span className="text-white font-medium flex-shrink-0">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="text-green-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-red-500 font-black text-2xl">₹{total}</span>
            </div>
          </div>
          <motion.button
            onClick={handleCheckout}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl transition text-lg"
            whileTap={{ scale: 0.97 }}
          >
            Checkout →
          </motion.button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full text-gray-500 hover:text-white text-sm mt-3 py-2 transition"
          >
            ← Continue Shopping
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;