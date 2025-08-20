import React, { useEffect, useState } from 'react';
import { notify } from '../utils/notify';
import {
  FiHome,
  FiClock,
  FiCheckSquare,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiRefreshCw,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FOCUS_DURATION = 25 * 60; // seconds
const BREAK_DURATION = 5 * 60; // seconds
const STORAGE_KEY = 'focusmate_timer_state_v1';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [sessionsToday, setSessionsToday] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0); // minutes
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.timeLeft === 'number') setTimeLeft(saved.timeLeft);
        if (typeof saved.isRunning === 'boolean') setIsRunning(saved.isRunning);
        if (saved.mode === 'focus' || saved.mode === 'break') setMode(saved.mode);
        if (typeof saved.sessionsToday === 'number') setSessionsToday(saved.sessionsToday);
        if (typeof saved.totalFocusTime === 'number') setTotalFocusTime(saved.totalFocusTime);
        if (typeof saved.currentStreak === 'number') setCurrentStreak(saved.currentStreak);
      }
    } catch (_) {
      // ignore parse errors; start fresh
    }
  }, []);

  // Persist state
  useEffect(() => {
    const payload = {
      timeLeft,
      isRunning,
      mode,
      sessionsToday,
      totalFocusTime,
      currentStreak,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [timeLeft, isRunning, mode, sessionsToday, totalFocusTime, currentStreak]);

  // Countdown logic (robust to StrictMode, avoids duplicate intervals)
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // finishing this tick
          if (mode === 'focus') {
            setSessionsToday((p) => p + 1);
            setTotalFocusTime((p) => p + 25);
            notify('Focus complete', 'Great job! 5-minute break starting.', { sound: true });
            // Transition to break and auto-start
            setMode('break');
            setIsRunning(false);
            setTimeout(() => {
              setTimeLeft(BREAK_DURATION);
              setIsRunning(true);
            }, 0);
          } else {
            notify('Break complete', 'Back to focus. 25-minute session starting.', { sound: true });
            // Transition to focus and auto-start
            setMode('focus');
            setIsRunning(false);
            setTimeout(() => {
              setTimeLeft(FOCUS_DURATION);
              setIsRunning(true);
            }, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, mode]);

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning((r) => {
      const next = !r;
      if (next) {
        notify(mode === 'focus' ? 'Focus started' : 'Break started',
          mode === 'focus' ? 'Stay focused for 25 minutes.' : 'Relax for 5 minutes.',
          { sound: true }
        );
      }
      return next;
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_DURATION : BREAK_DURATION);
  };

  const handleSwitchMode = () => {
    const next = mode === 'focus' ? 'break' : 'focus';
    setMode(next);
    setIsRunning(false);
    setTimeLeft(next === 'focus' ? FOCUS_DURATION : BREAK_DURATION);
    notify(next === 'focus' ? 'Focus mode' : 'Break mode', undefined, { sound: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--page-fg)]">
      {/* Background elements */}
      <div className="bg-blob left" />
      <div className="bg-blob right" />
      <div className="floating-dots" />
      
      <div className="flex min-h-screen relative z-10">
        {/* Sidebar (w-64, bg-gray-900) */}
        <aside className="flex w-64 shrink-0 flex-col bg-gray-800/50 backdrop-blur text-[var(--page-fg)] border-r border-gray-700">
        <Link to="/" className="p-6 text-xl font-bold text-blue-400">FocusMate</Link>
        <nav className="px-4" aria-label="Sidebar Navigation">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <FiHome className="h-5 w-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/timer"
                className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-2 text-white transition-colors"
                aria-current="page"
              >
                <FiClock className="h-5 w-5" />
                <span className="text-sm font-medium">Timer</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <FiCheckSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <FiBarChart2 className="h-5 w-5" />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/team-room"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <FiUsers className="h-5 w-5" />
                <span className="text-sm font-medium">Team</span>
              </Link>
            </li>
          </ul>
          <div className="mt-6 border-t border-gray-800 pt-6">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <FiSettings className="h-5 w-5" />
                  <span className="text-sm font-medium">Settings</span>
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Exit</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mt-auto p-4 text-xs text-gray-500">© {new Date().getFullYear()} FocusMate</div>
      </aside>

      {/* Main timer interface */}
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Large timer */}
          <div className="text-8xl font-mono font-bold text-blue-400">{formatTime(timeLeft)}</div>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 text-center text-gray-400">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span>{mode === 'focus' ? 'Focus Session' : 'Break Time'}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Start */}
            <button
              onClick={handleStartPause}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white transition-colors hover:from-blue-600 hover:to-purple-700"
            >
              <span className="inline-flex items-center gap-2">
                {isRunning ? <FiPause className="h-5 w-5" /> : <FiPlay className="h-5 w-5" />}
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="rounded-lg border border-gray-600 px-6 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <FiRotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </span>
            </button>

            {/* Switch to Break/Focus */}
            <button
              onClick={handleSwitchMode}
              className="rounded-lg border border-gray-600 px-6 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <FiRefreshCw className="h-5 w-5" />
                <span>{mode === 'focus' ? 'Switch to Break' : 'Switch to Focus'}</span>
              </span>
            </button>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-8">
            {/* Sessions Today */}
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white">{sessionsToday}</div>
              <div className="text-sm text-gray-400">Sessions Today</div>
            </div>

            {/* Focus Time */}
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-400">{totalFocusTime}m</div>
              <div className="text-sm text-gray-400">Focus Time</div>
            </div>

            {/* Current Streak */}
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-400">{currentStreak}</div>
              <div className="text-sm text-gray-400">Current Streak</div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Timer;