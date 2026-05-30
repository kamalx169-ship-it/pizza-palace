import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const statusOptions = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const statusColors = {
  'Pending':          'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Confirmed':        'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Preparing':        'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'Out for Delivery': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Delivered':        'bg-green-500/10 text-green-400 border-green-500/30',
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [newPizza, setNewPizza] = useState({
    name: '', description: '', price: '', category: 'Veg', imageUrl: ''
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, pizzasRes] = await Promise.all([
        api.get('/orders'),
        api.get('/pizzas')
      ]);
      setOrders(ordersRes.data);
      setPizzas(pizzasRes.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      toast.success('Status updated!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const addPizza = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/pizzas', {
        ...newPizza, price: Number(newPizza.price)
      });
      setPizzas(prev => [...prev, data]);
      setNewPizza({ name: '', description: '', price: '', category: 'Veg', imageUrl: '' });
      toast.success('Pizza added!');
    } catch (err) {
      toast.error('Failed to add pizza');
    }
  };

  const deletePizza = async (id) => {
    if (!window.confirm('Delete this pizza?')) return;
    try {
      await api.delete(`/pizzas/${id}`);
      setPizzas(prev => prev.filter(p => p._id !== id));
      toast.success('Pizza deleted!');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const toggleAvailability = async (pizza) => {
    try {
      const { data } = await api.put(`/pizzas/${pizza._id}`, {
        isAvailable: !pizza.isAvailable
      });
      setPizzas(prev => prev.map(p => p._id === pizza._id ? data : p));
      toast.success('Updated!');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0a0a0a]">
      <motion.div
        className="text-8xl mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        🍕
      </motion.div>
      <div className="text-white font-bold text-xl animate-pulse">Loading dashboard...</div>
    </div>
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const tabs = [
    { id: 'orders', label: 'Manage Orders', count: orders.length },
    { id: 'pizzas', label: 'Manage Pizzas', count: pizzas.length },
    { id: 'add', label: '+ Add Pizza', count: null },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl font-black text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ADMIN <span className="text-red-500">DASHBOARD</span>
          </motion.h1>
          <p className="text-gray-500 mt-1">Manage your pizza palace</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Orders', value: orders.length, color: 'text-red-500' },
            { label: 'Total Revenue', value: `₹${totalRevenue}`, color: 'text-green-400' },
            { label: 'Total Pizzas', value: pizzas.length, color: 'text-orange-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-[#111] border border-white/10 rounded-3xl p-6 text-center hover:border-red-500/30 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-[#111] border border-white/10 text-gray-400 hover:border-red-500 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No orders yet</div>
            ) : (
              orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  className="bg-[#111] border border-white/10 rounded-3xl p-6 hover:border-red-500/20 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white font-bold">{order.customer?.name || 'Customer'}</p>
                      <p className="text-gray-500 text-sm">{order.customer?.email}</p>
                      <p className="text-gray-600 text-xs mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-3">
                      <p className="text-red-500 font-black text-xl">₹{order.totalAmount}</p>
                      {/* Status Dropdown */}
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order._id, e.target.value)}
                        className="bg-[#1a1a1a] border border-white/10 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-red-500 cursor-pointer"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <p className="text-gray-600 text-xs mb-2">📍 {order.deliveryAddress}</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.pizza?.imageUrl && (
                          <img
                            src={item.pizza.imageUrl}
                            alt={item.pizza?.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                        )}
                        <span className="text-gray-400 text-sm">
                          {item.pizza?.name} x{item.qty}
                        </span>
                        <span className="text-red-400 text-sm ml-auto">
                          ₹{(item.pizza?.price || 0) * item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* PIZZAS TAB */}
        {activeTab === 'pizzas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pizzas.map((pizza, idx) => (
              <motion.div
                key={pizza._id}
                className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/30 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={pizza.imageUrl}
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-black text-lg">
                    ₹{pizza.price}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-1">{pizza.name}</h3>
                  <p className="text-gray-500 text-xs mb-4">{pizza.category}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(pizza)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        pizza.isAvailable
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                          : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {pizza.isAvailable ? 'Available' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => deletePizza(pizza._id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ADD PIZZA TAB */}
        {activeTab === 'add' && (
          <motion.div
            className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-black text-white mb-2">Add New Pizza</h2>
            <p className="text-gray-500 text-sm mb-8">Fill in the details to add a new pizza to the menu</p>

            <form onSubmit={addPizza} className="space-y-5">
              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">Pizza Name</label>
                <input
                  className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                  placeholder="e.g. Margherita Classic"
                  value={newPizza.name}
                  onChange={e => setNewPizza({ ...newPizza, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">Description</label>
                <textarea
                  className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm h-24 resize-none"
                  placeholder="Describe the pizza..."
                  value={newPizza.description}
                  onChange={e => setNewPizza({ ...newPizza, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">Price (₹)</label>
                  <input
                    className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                    placeholder="299"
                    type="number"
                    value={newPizza.price}
                    onChange={e => setNewPizza({ ...newPizza, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">Category</label>
                  <select
                    className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition text-sm"
                    value={newPizza.category}
                    onChange={e => setNewPizza({ ...newPizza, category: e.target.value })}
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Specialty">Specialty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">Image URL</label>
                <input
                  className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                  placeholder="https://images.unsplash.com/..."
                  value={newPizza.imageUrl}
                  onChange={e => setNewPizza({ ...newPizza, imageUrl: e.target.value })}
                  required
                />
                {newPizza.imageUrl && (
                  <img
                    src={newPizza.imageUrl}
                    alt="preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl"
                    onError={e => e.target.style.display = 'none'}
                  />
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl transition text-base"
                whileTap={{ scale: 0.98 }}
              >
                Add Pizza to Menu
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;