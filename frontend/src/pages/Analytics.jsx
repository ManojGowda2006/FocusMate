import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiClock, FiCheckCircle, FiTarget, FiZap, FiHome, FiCheckSquare, FiBarChart2, FiUsers } from 'react-icons/fi';

// Colors
const COLOR_BLUE = '#3B82F6';
const COLOR_GREEN = '#10B981';
const COLOR_ORANGE = '#F59E0B';
const COLOR_GRAY = '#374151';

const Sidebar = () => {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-gray-900 text-gray-300">
      <div className="p-6 text-xl font-bold text-blue-400">FocusMate</div>
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
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
              aria-current="page"
              className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-2 text-white transition-colors"
            >
              <FiBarChart2 className="h-5 w-5" />
              <span className="text-sm font-medium">Analytics</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <FiUsers className="h-5 w-5" />
              <span className="text-sm font-medium">Team</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4 text-xs text-gray-500">© {new Date().getFullYear()} FocusMate</div>
    </aside>
  );
};

const initialWeekly = {
  focusTimeData: [
    { week: 'Week 1', hours: 20 },
    { week: 'Week 2', hours: 15 },
    { week: 'Week 3', hours: 18 },
    { week: 'Week 4', hours: 0 },
  ],
  sessionData: [
    { week: 'Week 1', completed: 12, target: 10 },
    { week: 'Week 2', completed: 8, target: 12 },
    { week: 'Week 3', completed: 15, target: 14 },
    { week: 'Week 4', completed: 5, target: 16 },
  ],
  timeDistData: [
    { name: 'Focus Sessions', value: 25, color: COLOR_BLUE },
    { name: 'Break Time', value: 5, color: COLOR_GREEN },
    { name: 'Available Time', value: 1400, color: COLOR_GRAY },
  ],
};

const dailyPreset = {
  focusTimeData: [
    { week: 'Mon', hours: 4 },
    { week: 'Tue', hours: 2 },
    { week: 'Wed', hours: 6 },
    { week: 'Thu', hours: 0 },
  ],
  sessionData: [
    { week: 'Mon', completed: 5, target: 4 },
    { week: 'Tue', completed: 3, target: 4 },
    { week: 'Wed', completed: 7, target: 5 },
    { week: 'Thu', completed: 0, target: 5 },
  ],
  timeDistData: [
    { name: 'Focus Sessions', value: 50, color: COLOR_BLUE },
    { name: 'Break Time', value: 10, color: COLOR_GREEN },
    { name: 'Available Time', value: 1380, color: COLOR_GRAY },
  ],
};

const monthlyPreset = {
  focusTimeData: [
    { week: 'Week 1', hours: 22 },
    { week: 'Week 2', hours: 12 },
    { week: 'Week 3', hours: 16 },
    { week: 'Week 4', hours: 8 },
  ],
  sessionData: [
    { week: 'Week 1', completed: 14, target: 12 },
    { week: 'Week 2', completed: 7, target: 12 },
    { week: 'Week 3', completed: 13, target: 12 },
    { week: 'Week 4', completed: 9, target: 12 },
  ],
  timeDistData: [
    { name: 'Focus Sessions', value: 350, color: COLOR_BLUE },
    { name: 'Break Time', value: 70, color: COLOR_GREEN },
    { name: 'Available Time', value: 4200, color: COLOR_GRAY },
  ],
};

const Analytics = () => {
  const [timePeriod, setTimePeriod] = useState('Weekly');
  const [analyticsData, setAnalyticsData] = useState({
    totalFocusTime: '6h 0m',
    completedSessions: 0,
    tasksCompleted: 0,
    currentStreak: 0,
  });

  const [focusTimeData, setFocusTimeData] = useState(initialWeekly.focusTimeData);
  const [sessionData, setSessionData] = useState(initialWeekly.sessionData);
  const [timeDistData, setTimeDistData] = useState(initialWeekly.timeDistData);

  // Simulate light real-time updates
  useEffect(() => {
    const id = setInterval(() => {
      setSessionData((prev) => prev.map((p, i) => (i === 3 ? { ...p, completed: Math.max(0, p.completed + (Math.random() > 0.7 ? 1 : 0)) } : p)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Switch data by period
  useEffect(() => {
    if (timePeriod === 'Weekly') {
      setFocusTimeData(initialWeekly.focusTimeData);
      setSessionData(initialWeekly.sessionData);
      setTimeDistData(initialWeekly.timeDistData);
      setAnalyticsData((d) => ({ ...d, totalFocusTime: '6h 0m' }));
    } else if (timePeriod === 'Daily') {
      setFocusTimeData(dailyPreset.focusTimeData);
      setSessionData(dailyPreset.sessionData);
      setTimeDistData(dailyPreset.timeDistData);
      setAnalyticsData((d) => ({ ...d, totalFocusTime: '2h 0m' }));
    } else if (timePeriod === 'Monthly') {
      setFocusTimeData(monthlyPreset.focusTimeData);
      setSessionData(monthlyPreset.sessionData);
      setTimeDistData(monthlyPreset.timeDistData);
      setAnalyticsData((d) => ({ ...d, totalFocusTime: '45h 0m' }));
    }
  }, [timePeriod]);

  const exportData = () => {
    const blob = new Blob([
      JSON.stringify({ timePeriod, analyticsData, focusTimeData, sessionData, timeDistData }, null, 2),
    ], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timePeriod.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isActive = (p) =>
    p === timePeriod
      ? 'bg-blue-600 text-white px-4 py-2 rounded'
      : 'border border-gray-600 text-gray-400 px-4 py-2 rounded hover:bg-gray-800 hover:text-white';

  const pieLegend = useMemo(
    () => [
      { name: 'Focus Sessions', value: '25min', color: 'text-blue-400' },
      { name: 'Break Time', value: '5min', color: 'text-green-400' },
      { name: 'Available Time', value: '1400min', color: 'text-gray-400' },
    ],
    []
  );

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Analytics Dashboard 📊</h1>
            <p className="text-lg text-gray-400">Track your productivity insights and progress</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={isActive('Daily')} onClick={() => setTimePeriod('Daily')}>Daily</button>
            <button className={isActive('Weekly')} onClick={() => setTimePeriod('Weekly')}>Weekly</button>
            <button className={isActive('Monthly')} onClick={() => setTimePeriod('Monthly')}>Monthly</button>
            <button
              onClick={exportData}
              className="ml-2 rounded border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800"
            >
              Export
            </button>
          </div>
        </div>

        {/* Top stats */}
        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-gray-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{analyticsData.totalFocusTime}</div>
                <div className="mt-2 text-sm text-green-400">+20 +1.2%</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <FiClock className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-400">Total Focus Time</div>
          </div>

          <div className="rounded-xl bg-gray-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="mt-2 text-sm text-green-400">+20 +1.2%</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <FiCheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-400">Completed Sessions</div>
          </div>

          <div className="rounded-xl bg-gray-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="mt-2 text-sm text-green-400">+20 +1.2%</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600">
                <FiTarget className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-400">Tasks Completed</div>
          </div>

          <div className="rounded-xl bg-gray-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="mt-2 text-sm text-green-400">+20 0.0%</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <FiZap className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-400">Current Streak</div>
          </div>
        </section>

        {/* Charts grid */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Focus Time Trends */}
          <div className="rounded-xl bg-gray-900 p-6">
            <h3 className="mb-4 text-xl text-white">📈 Focus Time Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={focusTimeData}>
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis tick={{ fill: '#9CA3AF' }} stroke="#9CA3AF" domain={[0, 25]} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', color: '#fff' }} />
                  <Bar dataKey="hours" fill={COLOR_BLUE} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Progress */}
          <div className="rounded-xl bg-gray-900 p-6">
            <h3 className="mb-4 text-xl text-white">⚡ Session Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionData}>
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis tick={{ fill: '#9CA3AF' }} stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke={COLOR_GREEN} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="target" name="Target" stroke={COLOR_ORANGE} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time Distribution Today */}
          <div className="rounded-xl bg-gray-900 p-6">
            <h3 className="mb-4 text-xl text-white">⏰ Time Distribution Today</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeDistData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {timeDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {pieLegend.map((l) => (
                  <div key={l.name} className="flex items-center justify-between rounded-lg bg-gray-800/60 p-3">
                    <span className={`text-sm ${l.color}`}>{l.name}</span>
                    <span className="text-sm text-gray-300">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productivity Insights */}
          <div className="rounded-xl bg-gray-900 p-6">
            <h3 className="mb-4 text-xl text-white">🔥 Productivity Insights</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-900/30 p-4">
                <div className="text-white font-semibold">Wednesday</div>
                <div className="text-sm text-blue-400">Most focused</div>
              </div>
              <div className="rounded-lg bg-green-900/30 p-4">
                <div className="text-white font-semibold">9-11 AM</div>
                <div className="text-sm text-green-400">Most productive</div>
              </div>
              <div className="rounded-lg bg-orange-900/30 p-4">
                <div className="text-white font-semibold">85%</div>
                <div className="text-sm text-orange-400">Target reached</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;