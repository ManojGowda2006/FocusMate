import React, { useMemo, useState } from 'react';
import {
  FiClock,
  FiCheckCircle,
  FiTarget,
  FiZap,
  FiPlay,
  FiHome,
  FiCheckSquare,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import TopControls from './TopControls.jsx';

// Team member interface
export interface TeamMember {
  id: string;
  name: string;
  avatar: string; // URL
  status: 'focusing' | 'break' | 'offline';
  timeLeft?: string; // e.g., '15m left'
  activity: string; // e.g., 'Focusing', 'On break'
}

// Simple avatar component for consistent sizing/alt text
const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-10 w-10 rounded-full object-cover"
    loading="lazy"
  />
);

// Navigation item type
type NavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

// Stat card definition
type StatCard = {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  circleBg: string; // Tailwind bg color utility for circle
};

const Sidebar: React.FC<{
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}> = ({ open, onClose, isMobile }) => {
  const navTop: NavItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <FiHome className="h-5 w-5" />, active: true },
    { key: 'timer', label: 'Timer', icon: <FiClock className="h-5 w-5" /> },
    { key: 'tasks', label: 'Tasks', icon: <FiCheckSquare className="h-5 w-5" /> },
    { key: 'analytics', label: 'Analytics', icon: <FiBarChart2 className="h-5 w-5" /> },
    { key: 'team', label: 'Team', icon: <FiUsers className="h-5 w-5" /> },
  ];
  const navBottom: NavItem[] = [
    { key: 'settings', label: 'Settings', icon: <FiSettings className="h-5 w-5" /> },
    { key: 'exit', label: 'Exit', icon: <FiLogOut className="h-5 w-5" /> },
  ];

  const SidebarContent = (
    <div className="flex h-full w-[250px] flex-col bg-gray-800 text-gray-300">
      <div className="flex items-center justify-between p-6">
        <div className="text-xl font-bold text-blue-400">FocusMate</div>
        {isMobile && (
          <button
            aria-label="Close sidebar"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav aria-label="Primary Navigation" className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-2">
          {navTop.map((item) => (
            <li key={item.key}>
              <Link
                to={
                  item.key === 'timer'
                    ? '/timer'
                    : item.key === 'dashboard'
                    ? '/dashboard'
                    : item.key === 'tasks'
                    ? '/tasks'
                    : item.key === 'analytics'
                    ? '/analytics'
                    : '#'
                }
                role="menuitem"
                aria-current={item.active ? 'page' : undefined}
                className={[
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                ].join(' ')}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-gray-700/60 pt-6">
          <ul className="space-y-2">
            {navBottom.map((item) => (
              <li key={item.key}>
                <a
                  href="#"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="p-4 text-xs text-gray-500">© {new Date().getFullYear()} FocusMate</div>
    </div>
  );

  // Mobile: overlay drawer
  if (isMobile) {
    return (
      <div
        className={[
          'fixed inset-0 z-40 transform transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close sidebar overlay" />
        <div className="relative h-full">{SidebarContent}</div>
      </div>
    );
  }

  // Desktop: static sidebar
  return <aside className="hidden shrink-0 lg:block">{SidebarContent}</aside>;
};

const StatCardItem: React.FC<StatCard> = ({ value, label, icon, circleBg }) => {
  return (
    <div className="relative rounded-xl bg-gray-800 p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="mt-2 text-sm text-gray-400">{label}</div>
        </div>
        <div className={`ml-4 flex h-12 w-12 items-center justify-center rounded-full ${circleBg}`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
};

const QuickStartSection: React.FC<{ onStart: () => void; onManageTasks: () => void }> = ({ onStart, onManageTasks }) => (
  <section aria-labelledby="quick-start-title" className="rounded-xl bg-gray-800 p-6">
    <div className="flex items-center gap-2">
      <FiPlay className="h-5 w-5 text-blue-400" aria-hidden="true" />
      <h2 id="quick-start-title" className="text-lg font-semibold text-white">
        ▶ Quick Start
      </h2>
    </div>
    <p className="mt-1 text-sm text-gray-400">Jump into a focused work session right away</p>

    <div className="mt-6 space-y-3">
      <button
        onClick={onStart}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white transition-colors hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Start 25 minute Focus Session"
      >
        <FiClock className="h-5 w-5" />
        <span className="font-medium">Start 25min Focus</span>
      </button>

      <button
        onClick={onManageTasks}
        className="w-full rounded-lg border border-gray-600 px-6 py-3 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Manage Tasks
      </button>
    </div>
  </section>
);

const TodaysTasksSection: React.FC<{ completed: number; total: number }> = ({ completed, total }) => (
  <section aria-labelledby="today-tasks-title" className="rounded-xl bg-gray-800 p-6">
    <div className="flex items-start justify-between">
      <h2 id="today-tasks-title" className="text-lg font-semibold text-white">
        📋 Today's Tasks
      </h2>
      <span className="text-sm text-gray-400">{completed}/{total} completed</span>
    </div>

    <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-8 text-center">
      <FiCheckCircle className="h-12 w-12 text-gray-600" aria-hidden="true" />
      <p className="mt-4 text-white">No tasks for today</p>
      <a
        href="#"
        className="mt-1 text-sm text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add your first task
      </a>
    </div>
  </section>
);

const TeamActivitySection: React.FC<{ team: TeamMember[] }> = ({ team }) => (
  <section aria-labelledby="team-activity-title" className="rounded-xl bg-gray-800 p-6">
    <h2 id="team-activity-title" className="text-lg font-semibold text-white">
      👥 Team Activity
    </h2>

    <ul className="mt-6 space-y-4">
      {team.map((member) => {
        const statusColor =
          member.status === 'focusing'
            ? 'text-green-400'
            : member.status === 'break'
            ? 'text-yellow-400'
            : 'text-gray-500';
        return (
          <li key={member.id} className="flex items-center gap-3">
            <Avatar src={member.avatar} alt={`${member.name} avatar`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{member.name}</div>
              <div className={`text-xs ${statusColor}`}>
                {member.activity}
                {member.timeLeft ? ` ${member.timeLeft}` : ''}
              </div>
            </div>
            <FiChevronRight className="h-4 w-4 text-gray-600" aria-hidden="true" />
          </li>
        );
      })}
    </ul>

    <button
      className="mt-6 text-sm font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Join Team Room"
    >
      Join Team Room
    </button>
  </section>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedTasks] = useState<number>(0);
  const [totalTasks] = useState<number>(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024; // lg breakpoint

  const team: TeamMember[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'focusing',
        timeLeft: '15m left',
        activity: '👀 Focusing',
      },
      {
        id: '2',
        name: 'Alex Rivera',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        status: 'break',
        timeLeft: '3m left',
        activity: '☕ On break',
      },
      {
        id: '3',
        name: 'Jordan Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        status: 'focusing',
        timeLeft: '22m left',
        activity: '👀 Focusing',
      },
    ],
    []
  );

  const stats: StatCard[] = [
    {
      id: 'total-time',
      value: '0m',
      label: 'Total Focus Time',
      icon: <FiClock className="h-5 w-5" />,
      circleBg: 'bg-blue-600',
    },
    {
      id: 'completed-sessions',
      value: '0',
      label: 'Completed Sessions',
      icon: <FiCheckCircle className="h-5 w-5" />,
      circleBg: 'bg-green-600',
    },
    {
      id: 'tasks-completed',
      value: '0',
      label: 'Tasks Completed',
      icon: <FiTarget className="h-5 w-5" />,
      circleBg: 'bg-yellow-600',
    },
    {
      id: 'current-streak',
      value: '0',
      label: 'Current Streak',
      icon: <FiZap className="h-5 w-5" />,
      circleBg: 'bg-purple-600',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

      {/* Main area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar for mobile: menu button */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <div className="text-base font-bold text-blue-400">FocusMate</div>
          <div className="w-9" />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:pl-8">
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
            <p className="mt-2 text-lg text-gray-400">Ready to boost your productivity today?</p>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <StatCardItem key={s.id} value={s.value} label={s.label} icon={s.icon} circleBg={s.circleBg} />
              ))}
            </div>
          </header>

          {/* Main sections */}
          <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left column (2/3) */}
            <div className="space-y-6 lg:col-span-2">
              <QuickStartSection
                onStart={() => alert('Starting a 25-minute focus session...')}
                onManageTasks={() => (window.location.href = '/tasks')}
              />

              <TodaysTasksSection completed={completedTasks} total={totalTasks} />
            </div>

            {/* Right column (1/3) */}
            <div>
              <TeamActivitySection team={team} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;