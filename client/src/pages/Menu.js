import { useState, useEffect } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Veg', 'Non-Veg', 'Specialty'];

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/pizzas').then(r => {
      setPizzas(r.data);
      setLoading(false);
    });
  }, []);

  const filtered = pizzas.filter(p => {
    const matchCat = selected === 'All' || p.category === selected;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0a0a0a]">
      <motion.div
        className="text-8xl mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        🍕
      </motion.div>
      <div className="text-white font-bold text-xl animate-pulse">Loading Menu...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-5xl font-black text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            OUR <span className="text-red-500">MENU</span>
          </motion.h1>
          <p className="text-gray-500">Fresh handcrafted pizzas made to order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search */}
        <div className="relative mb-8">
          <span className="absolute left-5 top-4 text-gray-500 text-lg">🔍</span>
          <input
            className="w-full bg-[#111] border border-white/10 text-white pl-12 pr-5 py-4 rounded-2xl focus:outline-none focus:border-red-500 transition placeholder-gray-600 text-sm"
            placeholder="Search pizzas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setSelected(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition ${
                selected === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-[#111] border border-white/10 text-gray-400 hover:border-red-500 hover:text-white'
              }`}
            >
              {cat === 'All' ? '🍕 All' : cat === 'Veg' ? '🥦 Veg' : cat === 'Non-Veg' ? '🍗 Non-Veg' : '⭐ Specialty'}
            </motion.button>
          ))}
          <span className="ml-auto text-gray-600 text-sm self-center">{filtered.length} items</span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold text-gray-500">No pizzas found</h2>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filtered.map((pizza, index) => (
                <motion.div
                  key={pizza._id}
                  className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden group hover:border-red-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={pizza.imageUrl}
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                      pizza.category === 'Veg'
                        ? 'bg-green-500 text-white'
                        : pizza.category === 'Non-Veg'
                        ? 'bg-red-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}>
                      {pizza.category}
                    </span>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-2xl font-black text-white">₹{pizza.price}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-1 leading-tight">{pizza.name}</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-2">{pizza.description}</p>
                    <motion.button
                      onClick={() => { addToCart(pizza); toast.success(`🍕 ${pizza.name} added!`); }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition text-sm"
                    >
                      + Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;