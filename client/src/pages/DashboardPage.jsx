import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  Clock,
  Sparkles,
  Flame,
  Plus,
  CheckCircle,
  Timer,
  BarChart3,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-elevated border border-brand-850">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>
                {user?.degree || 'B.Tech'} {user?.branch || 'Engineering'} • Semester {user?.semester || 1}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to your study hub, {user?.name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get ready for your semester exams. Set up your subjects, configure your exam dates,
              and start building your daily study streak.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/dashboard/subjects">
              <Button size="md" className="bg-white text-slate-900 hover:bg-slate-100" leftIcon={<Plus className="w-4 h-4" />}>
                Add First Subject
              </Button>
            </Link>
            <Link to="/dashboard/planner">
              <Button size="md" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Plan Study Today
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Widgets (Honest State: Zero fabricated stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Preparation Progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Overall Preparation
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">0%</span>
              <span className="text-xs text-slate-400">Syllabus Ready</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-brand-600 h-full w-0" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Tracked as you complete units in Phase 2
            </p>
          </div>
        </Card>

        {/* Total Subjects */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Registered Subjects
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">0</span>
              <span className="text-xs text-slate-400">Enrolled courses</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              No subjects added for Sem {user?.semester || 1} yet
            </p>
          </div>
        </Card>

        {/* Study Hours & Streak */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Current Streak
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-orange-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">0 Days</span>
              <span className="text-xs text-slate-400">Study Streak</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Complete a study session to ignite your streak
            </p>
          </div>
        </Card>

        {/* Completed Topics */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Topics Mastered
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">0 / 0</span>
              <span className="text-xs text-slate-400">Topics</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Ready for syllabus import
            </p>
          </div>
        </Card>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-850/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Study Assistant Recommendation
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Welcome! To start generating personalized revision schedules and daily targets, add your first subject in the Subject Tracker.
            </p>
          </div>
        </div>
        <Link to="/dashboard/subjects" className="shrink-0">
          <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Configure Subjects
          </Button>
        </Link>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Today's Tasks & Weekly Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Study Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Study Tasks</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Focus areas scheduled for today</p>
              </div>
              <Link to="/dashboard/planner">
                <Button size="sm" variant="outline" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Add Task
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={<CalendarDays className="w-6 h-6" />}
                title="No study tasks scheduled for today"
                description="Keep your preparation organized by breaking down heavy engineering concepts into daily manageable tasks."
                actionLabel="Create First Study Task"
                onAction={() => {}}
              />
            </CardContent>
          </Card>

          {/* Weekly Activity Visualization */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Study Velocity</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Hours logged across the last 7 days</p>
              </div>
              <span className="text-xs font-semibold text-slate-400">Total: 0.0 hrs</span>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={<BarChart3 className="w-6 h-6" />}
                title="Your study activity will appear here"
                description="Once you start utilizing the Pomodoro timer or logging revision sessions, your daily velocity breakdown will display here."
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column (4 cols): Upcoming Exams & Quick Launch */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Examinations Countdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Exams</CardTitle>
              <Link to="/dashboard/exams" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={<Clock className="w-6 h-6" />}
                title="No upcoming exams scheduled"
                description="Add your first mid-term, end-sem, or practical exam date to activate the countdown timer."
                actionLabel="Add Exam Date"
                onAction={() => {}}
              />
            </CardContent>
          </Card>

          {/* Quick Study Launchpad */}
          <Card className="p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Quick Study Launchpad
            </h4>
            <div className="space-y-2">
              <Link
                to="/dashboard/pomodoro"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-500/30 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Timer className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Start 25m Pomodoro Sprint
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/dashboard/ai-assistant"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-500/30 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Ask AI Exam Question
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default DashboardPage;
