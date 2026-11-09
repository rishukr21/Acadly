import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Clock,
  Timer,
  RotateCcw,
  Sparkles,
  FileText,
  Users2,
  Trophy,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Subjects', icon: BookOpen, path: '/dashboard/subjects' },
  { label: 'Study Planner', icon: CalendarDays, path: '/dashboard/planner' },
  { label: 'Exam Schedule', icon: Clock, path: '/dashboard/exams' },
  { label: 'Pomodoro Timer', icon: Timer, path: '/dashboard/pomodoro' },
  { label: 'Revision Center', icon: RotateCcw, path: '/dashboard/revision' },
  { label: 'AI Study Assistant', icon: Sparkles, path: '/dashboard/ai-assistant', badge: 'AI' },
  { label: 'Notes & Resources', icon: FileText, path: '/dashboard/notes' },
  { label: 'Study Groups', icon: Users2, path: '/dashboard/groups' },
  { label: 'Leaderboard', icon: Trophy, path: '/dashboard/leaderboard' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile }) => {
  const { user } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 dark:border-slate-800">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex-shrink-0 flex items-center justify-center text-white shadow-subtle">
            <GraduationCap className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                Acadly<span className="text-brand-600 dark:text-brand-400">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Semester Prep
              </span>
            </div>
          )}
        </NavLink>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              {!isCollapsed && (
                <>
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User Bottom Mini-Card */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <NavLink
          to="/dashboard/settings"
          onClick={closeMobile}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors ${
            isCollapsed ? 'justify-center p-1' : ''
          }`}
        >
          <Avatar src={user?.avatar} name={user?.name} size="sm" />
          {!isCollapsed && (
            <div className="flex flex-col truncate flex-1 min-w-0">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                {user?.name || 'Student'}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                {user?.branch ? `${user.branch} • Sem ${user.semester}` : user?.email}
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block shrink-0 h-screen sticky top-0 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
