import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('See you soon!');
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=40&h=40&q=80&fit=crop"
            alt="logo"
            className="w-9 h-9 rounded-lg object-cover border border-red-500"
          />
          <div>
            <span className="text-white font-black text-lg tracking-tight">PIZZA</span>
            <span className="text-red-500 font-black text-lg tracking-tight"> PALACE</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                location.pathname === link.to
                  ? 'text-red-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/orders"
              className={`text-sm font-semibold tracking-wide transition-colors ${
                location.pathname === '/orders'
                  ? 'text-red-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              My Orders
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 tracking-wide"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Cart Button */}
          <Link to="/cart">
            <motion.div
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-9H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 && (
                <motion.span
                  className="bg-white text-red-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=dc2626&color=fff&size=32`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-300 text-sm font-medium">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-400 font-medium transition border border-white/10 px-3 py-1.5 rounded-full hover:border-red-500/50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-white text-black font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-[#111] border-t border-white/10 px-6 py-6 flex flex-col gap-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold transition ${
                  location.pathname === link.to
                    ? 'text-red-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 font-semibold hover:text-white transition"
              >
                My Orders
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-yellow-400 font-semibold"
              >
                Admin Panel
              </Link>
            )}
            <div className="border-t border-white/10 pt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=dc2626&color=fff&size=32`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white font-medium text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 font-semibold text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-red-600 text-white font-bold text-center py-3 rounded-2xl hover:bg-red-500 transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;