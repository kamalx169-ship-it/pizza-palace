import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';

const statusConfig = {
  'Pending':          { color: 'bg-yellow-500', text: 'text-yellow-400', icon: '🕐', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  'Confirmed':        { color: 'bg-blue-500',   text: 'text-blue-400',   icon: '✅', bg: 'bg-blue-500/10 border-blue-500/30' },
  'Preparing':        { color: 'bg-orange-500', text: 'text-orange-400', icon: '👨‍🍳', bg: 'bg-orange-500/10 border-orange-500/30' },
  'Out for Delivery': { color: 'bg-purple-500', text: 'text-purple-400', icon: '🛵', bg: 'bg-purple-500/10 border-purple-500/30' },
  'Delivered':        { color: 'bg-green-500',  text: 'text-green-400',  icon: '🎉', bg: 'bg-green-500/10 border-green-500/30' },
};

const steps = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my').then(r => {
      setOrders(r.data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0a0a0a]">
      <motion.div
        className="text-8xl mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        🍕
      </motion.div>
      <div className="text-white font-bold text-xl animate-pulse">Loading orders...</div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="text-8xl mb-6">📦</div>
      <h2 className="text-3xl font-black text-white mb-2">No Orders Yet!</h2>
      <p className="text-gray-500 mb-8">You haven't ordered anything yet.</p>
      <a href="/menu" className="bg-red-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-red-500 transition">
        Order Now 🍕
      </a>
    </div>
  );

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
            MY <span className="text-red-500">ORDERS</span>
          </motion.h1>
          <p className="text-gray-500 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {orders.map((order, idx) => {
          const config = statusConfig[order.status] || statusConfig['Pending'];
          const currentStep = steps.indexOf(order.status);
          return (
            <motion.div
              key={order._id}
              className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Order Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">ORDER ID</p>
                    <p className="text-white font-mono text-sm">{order._id}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${config.bg}`}>
                    <span>{config.icon}</span>
                    <span className={`font-bold text-sm ${config.text}`}>{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="px-6 py-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          i <= currentStep
                            ? 'bg-red-600 shadow-lg shadow-red-900'
                            : 'bg-[#1a1a1a] border border-white/10'
                        }`}>
                          {i <= currentStep
                            ? <span>{statusConfig[step]?.icon}</span>
                            : <span className="text-gray-600 text-xs font-bold">{i + 1}</span>
                          }
                        </div>
                        <span className="text-xs mt-2 text-center w-16 leading-tight hidden md:block"
                          style={{ color: i <= currentStep ? '#fff' : '#555' }}>
                          {step}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 mb-5 ${i < currentStep ? 'bg-red-600' : 'bg-white/10'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {item.pizza?.imageUrl && (
                        <img
                          src={item.pizza.imageUrl}
                          alt={item.pizza?.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{item.pizza?.name || 'Pizza'}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.qty}</p>
                      </div>
                      <span className="text-red-400 font-bold text-sm">
                        ₹{(item.pizza?.price || 0) * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-xs">📍 {order.deliveryAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">Total</p>
                  <p className="text-red-500 font-black text-xl">₹{order.totalAmount}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;