import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
      active ? 'bg-white/10 border-white/20' : 'border-white/10 hover:border-white/20'
    }`}
  >
    {children}
  </button>
);

const AuthJoin = () => {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (tab === 'signup') {
      if (!form.name.trim()) return 'Name is required.';
    }
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return 'Enter a valid email.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (tab === 'signup' && form.password !== form.confirm) return 'Passwords do not match.';
    return '';
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      if (tab === 'login') {
        const fetch = async () => {
          const res = await axios.post(`${API_URL}/auth/login`, {
            email: form.email,
            password: form.password,
          },{
            withCredentials: true
          });
          alert(res.data.message);
          if(res.status === 200){
            navigate('/dashboard', { replace: true });
          }
        }
        fetch();
      } else {
        const fetch = async () => {
          const res = await axios.post(`${API_URL}/auth/register`, {
            email: form.email,
            password: form.password,
            name: form.name,
          },{
            withCredentials: true
          });
          alert(res.data.message);
          if(res.status === 201){
            navigate('/dashboard', { replace: true });
          }
        }
        fetch();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070a] text-white">
      <div className="bg-blob left" />
      <div className="bg-blob right" />
      <div className="floating-dots" />

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mx-auto mt-6 w-full max-w-md px-6"
      >
        <div className="rounded-2xl border border-white/10 bg-[#0f1113] p-6">
          <div className="flex items-center justify-center gap-2">
            <TabButton active={tab === 'login'} onClick={() => setTab('login')}>
              Login
            </TabButton>
            <TabButton active={tab === 'signup'} onClick={() => setTab('signup')}>
              Signup
            </TabButton>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <div>
                <label className="mb-1 block text-sm text-white/80">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] px-3 py-2 outline-none focus:border-white/20"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-white/80">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] px-3 py-2 outline-none focus:border-white/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/80">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] px-3 py-2 outline-none focus:border-white/20"
                placeholder="••••••••"
              />
            </div>

            {tab === 'signup' && (
              <div>
                <label className="mb-1 block text-sm text-white/80">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] px-3 py-2 outline-none focus:border-white/20"
                  placeholder="••••••••"
                />
              </div>
            )}

            {tab === 'login' && (
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-white/20 bg-[#0b0b0d]"
                />
                Remember me
              </label>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(183,118,255,0.35)' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="mt-2 w-full rounded-xl bg-[linear-gradient(90deg,#6B8CFF_0%,#B776FF_100%)] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Please wait…' : tab === 'login' ? 'Login' : 'Create account'}
            </motion.button>
          </form>
        </div>
      </motion.main>
    </div>
  );
};

export default AuthJoin;