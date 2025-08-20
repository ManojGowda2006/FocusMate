import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Notification state
  const [permission, setPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof Notification === 'undefined') return;
    try {
      const p = await Notification.requestPermission();
      setPermission(p);
      if (p === 'granted') {
        // Play a short chime to confirm
        audioRef.current?.play().catch(() => {});
        new Notification('Notifications enabled', { body: 'You will get timer alerts.' });
      }
    } catch (_) {}
  };

  return (
    <nav className="z-10 relative flex items-center justify-between w-full max-w-6xl mx-auto px-6 py-5">
      <Link to="/" className="flex items-center gap-2 select-none">
        <span className="text-2xl font-extrabold tracking-tight">
          <span className="gradient-text">Focus</span>
          <span className="text-[var(--page-fg)]">Mate</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex items-center gap-2 rounded-full px-4 py-2 border border-white/10 bg-[var(--panel-bg)] text-sm font-medium hover:border-white/20 text-[var(--page-fg)]"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:block">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={requestPermission}
          aria-label="Enable notifications"
          className="flex items-center gap-2 rounded-full px-4 py-2 border border-white/10 bg-[var(--panel-bg)] text-sm font-medium hover:border-white/20 text-[var(--page-fg)]"
        >
          <Bell size={16} />
          <span className="hidden sm:block">{permission === 'granted' ? 'Notifications On' : 'Enable Notifications'}</span>
        </motion.button>

        {/* Join */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(107,140,255,0.25)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (location.pathname !== '/join') navigate('/join');
          }}
          className="rounded-full px-5 py-2.5 border border-white/10 bg-[var(--panel-bg)] text-sm font-medium hover:border-white/20 text-[var(--page-fg)]"
        >
          Join
        </motion.button>

        {/* audio element for chimes */}
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/chime.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </nav>
  );
};

export default Navbar;