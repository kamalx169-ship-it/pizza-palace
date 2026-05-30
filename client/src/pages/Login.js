import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', {
          email: form.email, password: form.password
        });
        login(data.user, data.token);
        toast.success('Welcome back!');
        navigate('/');
      } else {
        await api.post('/auth/register', form);
        toast.success('Account created! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex">

      {/* LEFT — Full height pizza image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80"
          alt="Pizza"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        {/* Bottom text on image */}
        <div className="absolute bottom-12 left-10 right-10">
          <h2 className="text-4xl font-black text-white mb-3 leading-tight">
            The Best Pizza<br />In Town.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Handcrafted with the finest ingredients.<br />
            Delivered fresh to your door in 30 minutes.
          </p>
          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop&crop=face',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2 border-black object-cover"
                />
              ))}
            </div>
            <div>
              <div className="text-yellow-400 text-sm font-bold">★★★★★</div>
              <div className="text-gray-400 text-xs">50,000+ happy customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form perfectly centered */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 overflow-y-auto">
        <motion.div
          className="w-full max-w-md py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile only — pizza image banner */}
          <div className="lg:hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=200&q=80&fit=crop"
              alt="Pizza"
              className="w-full h-36 object-cover rounded-3xl"
            />
          </div>

          {/* Brand mark */}
          <div className="flex items-center gap-2 mb-8">
            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=40&h=40&q=80&fit=crop"
              alt="logo"
              className="w-9 h-9 rounded-xl object-cover border border-red-500"
            />
            <span className="text-white font-black text-base tracking-tight">
              PIZZA <span className="text-red-500">PALACE</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin
                ? 'Sign in to your account to start ordering'
                : 'Join us and start ordering delicious pizza'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div>
              <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">
                Email Address
              </label>
              <input
                className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                placeholder="you@email.com"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">
                Password
              </label>
              <input
                className="w-full bg-[#161616] border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition placeholder-gray-700 text-sm"
                placeholder="Enter your password"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-base py-4 rounded-xl transition disabled:opacity-50"
              whileTap={{ scale: 0.98 }}
            >
              {loading
                ? 'Please wait...'
                : isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-700 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Toggle */}
          <p className="text-center text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 font-bold hover:text-red-400 transition"
            >
              {isLogin ? 'Register here' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;