import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    title: 'Stone Fired Crust',
    desc: 'Baked in authentic stone ovens at 400°C for the perfect crispy base.'
  },
  {
    img: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&q=80',
    title: 'Fresh Ingredients',
    desc: 'Sourced fresh every morning from local farms and suppliers.'
  },
  {
    img: 'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=400&q=80',
    title: 'Fast Delivery',
    desc: 'Hot pizza delivered to your door in 30 minutes or less, guaranteed.'
  },
];

const categories = [
  {
    name: 'Vegetarian',
    desc: 'Fresh garden goodness',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    color: 'from-green-900/80 to-green-950/90',
  },
  {
    name: 'Non-Vegetarian',
    desc: 'Premium meat lovers',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
    color: 'from-red-900/80 to-red-950/90',
  },
  {
    name: 'Specialty',
    desc: "Chef's finest creations",
    img: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&q=80',
    color: 'from-purple-900/80 to-purple-950/90',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80"
            alt="hero pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.span
              className="inline-block bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full tracking-widest uppercase mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Now Delivering Near You
            </motion.span>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
              REAL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                PIZZA.
              </span>
            </h1>

            <p className="text-gray-300 text-xl max-w-lg mb-10 leading-relaxed">
              Handcrafted with the finest ingredients. Hot, fresh and delivered to your door in 30 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/menu"
                  className="block bg-red-600 hover:bg-red-500 text-white font-black text-lg px-10 py-4 rounded-2xl transition shadow-2xl shadow-red-900/50 text-center"
                >
                  Order Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/menu"
                  className="block border-2 border-white/30 text-white hover:border-white/60 font-bold text-lg px-10 py-4 rounded-2xl transition text-center"
                >
                  View Menu
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16 pt-10 border-t border-white/10">
              {[['50K+', 'Happy Customers'], ['12+', 'Pizza Varieties'], ['30min', 'Avg Delivery']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-white">{num}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">Our Menu</p>
            <h2 className="text-5xl font-black text-white">EXPLORE BY<br />CATEGORY</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to="/menu" className="block relative rounded-3xl overflow-hidden h-72 group">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-black text-white mb-1">{cat.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{cat.desc}</p>
                    <span className="inline-block bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-full group-hover:bg-red-600 group-hover:border-red-600 transition">
                      Explore Menu →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">Why Choose Us</p>
            <h2 className="text-5xl font-black text-white">THE PIZZA PALACE<br />DIFFERENCE</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative rounded-3xl overflow-hidden h-56 mb-6">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <h3 className="text-white font-black text-xl mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=1600&q=80"
          alt="cta pizza"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-4">Limited Time</p>
            <h2 className="text-6xl font-black text-white mb-6 leading-tight">
              HUNGRY?<br />WE GOT YOU.
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto">
              Order now and get fresh hot pizza delivered in 30 minutes.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="inline-block bg-red-600 hover:bg-red-500 text-white font-black text-xl px-14 py-5 rounded-2xl transition shadow-2xl shadow-red-900/50"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060606] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg" />
                <span className="text-white font-black text-xl tracking-tight">PIZZA PALACE</span>
              </div>
              <p className="text-gray-600 text-sm">Authentic pizza. Real ingredients. Fast delivery.</p>
            </div>
            <div className="flex gap-8">
              <Link to="/menu" className="text-gray-500 hover:text-white text-sm transition">Menu</Link>
              <Link to="/orders" className="text-gray-500 hover:text-white text-sm transition">Orders</Link>
              <Link to="/login" className="text-gray-500 hover:text-white text-sm transition">Sign In</Link>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 text-center">
            <p className="text-gray-700 text-sm">© 2026 Pizza Palace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;