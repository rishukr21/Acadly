import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CalendarCheck,
  Timer,
  Clock,
  RotateCcw,
  BarChart3,
  Users2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-850 text-xs font-semibold text-brand-700 dark:text-brand-300">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
                <span>The All-In-One Exam Preparation Platform for Engineers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
                Your Semester. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-500">
                  Your Strategy.
                </span>{' '}
                <br />
                Your Success.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                Prepare smarter for your semester exams with intelligent study planning, syllabus
                tracking, productivity analytics, and AI-powered learning tailored for B.Tech & B.E.
                students.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get Started Free
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    Explore Features
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Curated for B.Tech & B.E.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero clutter, high focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free to get started</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live-Like SaaS Interface Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 to-slate-100/40 dark:from-slate-800 dark:to-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between pb-2 px-2 border-b border-slate-200/60 dark:border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="bg-white/80 dark:bg-slate-950/80 px-3 py-0.5 rounded-md text-[10px] text-slate-500 font-mono flex items-center gap-1.5 border border-slate-200/50 dark:border-slate-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>acadly.app/dashboard</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Dashboard Mock Body */}
                <div className="mt-2.5 bg-white dark:bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800/80 space-y-4">
                  {/* Top Stats Row */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Semester 5 Overview
                      </p>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Computer Science & Engineering
                      </h4>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>On Track</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Syllabus Covered</span>
                      <span className="text-base font-bold text-brand-600 dark:text-brand-400">68%</span>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-brand-600 h-full w-[68%]" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Exam Countdown</span>
                      <span className="text-base font-bold text-amber-600 dark:text-amber-400">14 Days</span>
                      <span className="text-[9px] text-slate-400 block">Operating Systems</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Study Streak</span>
                      <span className="text-base font-bold text-orange-500">12 Days 🔥</span>
                      <span className="text-[9px] text-slate-400 block">Personal Best</span>
                    </div>
                  </div>

                  {/* Subject Progress Mock List */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Active Subjects & Module Status
                    </p>
                    <div className="space-y-1.5">
                      {[
                        { name: 'Database Management Systems', code: 'CS501', progress: 85, color: 'bg-emerald-500' },
                        { name: 'Theory of Computation', code: 'CS502', progress: 60, color: 'bg-brand-500' },
                        { name: 'Computer Networks', code: 'CS503', progress: 45, color: 'bg-amber-500' },
                      ].map((sub, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                              {sub.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] text-slate-400 font-mono">{sub.progress}%</span>
                            <div className="w-12 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className={`${sub.color} h-full`} style={{ width: `${sub.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Assistant Insight Pill */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-brand-50 to-indigo-50/50 dark:from-brand-950/40 dark:to-indigo-950/30 border border-brand-200/50 dark:border-brand-850/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                        AI Recommendation: Review TCP Congestion Control today.
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold cursor-pointer">
                      Start &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Feature Cards Section */}
      <section id="features" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
              Complete Semester Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered for Academic Excellence
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Everything an engineering student needs to replace chaotic spreadsheets, scattered PDFs, and last-night cramming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Smart Syllabus Tracker',
                desc: 'Break down complex engineering syllabi into modular topics, track unit completion, and prioritize high-weightage chapters.',
              },
              {
                icon: CalendarCheck,
                title: 'Daily Study Planner',
                desc: 'Intelligent daily task scheduling that allocates realistic study blocks according to your upcoming exam deadlines.',
              },
              {
                icon: Clock,
                title: 'Exam Countdown',
                desc: 'Live countdown timers for mid-terms, end-sems, and lab practicals with auto-urgency recalculation.',
              },
              {
                icon: Timer,
                title: 'Pomodoro Timer',
                desc: 'Distraction-free study interval timer with customizable deep-work sprints and short break intervals.',
              },
              {
                icon: Sparkles,
                title: 'AI Study Assistant',
                desc: 'Ask complex engineering doubts, simplify derivations, and generate quick conceptual summaries in seconds.',
              },
              {
                icon: RotateCcw,
                title: 'Revision Scheduler',
                desc: 'Spaced repetition algorithms that automatically prompt you to review forgotten formulas and theorems.',
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                desc: 'Visual velocity charts, study hour distributions, and readiness scores across all registered subjects.',
              },
              {
                icon: Users2,
                title: 'Collaborative Learning',
                desc: 'Form branch study groups, share annotated notes, and compete on friendly semester study leaderboards.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/50 dark:border-brand-850/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Three Steps to Ace Your Semester
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              A structured preparation framework tailored around typical university examination patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Set up your semester',
                desc: 'Select your degree (B.Tech/B.E.), branch, semester, and input your theory and practical subjects with exam dates.',
              },
              {
                step: '02',
                title: 'Plan and track preparation',
                desc: 'Organize daily study targets, log completed topics, utilize focused Pomodoro sprints, and get AI assistance for hard concepts.',
              },
              {
                step: '03',
                title: 'Analyze progress and improve',
                desc: 'Review your revision intervals, check syllabus readiness heatmaps, and walk into the examination hall with confidence.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card relative"
              >
                <div className="text-4xl font-black text-brand-600/20 dark:text-brand-400/20 mb-4 font-mono">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Acadly & AI Learning Section */}
      <section id="why-acadly" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
                Why Acadly?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Built specifically for engineering coursework, not generic note-taking.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Generic to-do apps don’t understand credit systems, university exam timetables, or unit-wise syllabi. Acadly was architected specifically to cater to engineering students managing 6 theory subjects and multiple labs simultaneously.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  'Credit-weighted syllabus prioritization',
                  'Automated revision cycles before mid-terms & end-sems',
                  'Dedicated AI assistant trained on technical explanations',
                  'Clean, distraction-free SaaS design for deep focus',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Learning Feature Showcase */}
            <div id="ai-learning" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-elevated space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-subtle">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Study Assistant In Action
                  </h4>
                  <p className="text-[11px] text-slate-400">Personalized exam-oriented conceptual tutor</p>
                </div>
              </div>

              {/* Chat preview */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-100 dark:bg-slate-800/70 p-3 rounded-xl max-w-[85%] text-slate-700 dark:text-slate-200">
                  <span className="font-semibold text-brand-600 dark:text-brand-400 block mb-0.5">
                    Student:
                  </span>
                  Explain the difference between Paging and Segmentation in 3 short points for a 5-mark question.
                </div>

                <div className="bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-850/50 p-3 rounded-xl ml-auto max-w-[90%] text-slate-800 dark:text-slate-100">
                  <span className="font-semibold text-brand-600 dark:text-brand-400 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Acadly AI:
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                    <li><strong>Allocation:</strong> Paging uses fixed-size memory blocks (pages/frames); Segmentation uses variable-size logical units.</li>
                    <li><strong>Visibility:</strong> Paging is invisible to the programmer; Segmentation is user-visible.</li>
                    <li><strong>Fragmentation:</strong> Paging suffers from internal fragmentation; Segmentation suffers from external fragmentation.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly labelled demo content) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
              Student Stories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trusted by Engineering Undergrads
            </h2>
            <p className="text-xs text-slate-400 italic">
              (Demo feedback from early collegiate testers)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Acadly kept me sane during 6th semester end-sems. Being able to see syllabus completion percentages alongside countdown timers stopped my procrastination.',
                name: 'Aarav Sharma',
                info: 'B.Tech CSE, 6th Sem • NIT Trichy',
              },
              {
                quote:
                  'The spaced revision reminders alone helped me jump my GPA from 7.2 to 8.8. The UI is super smooth and distraction-free.',
                name: 'Ananya Verma',
                info: 'B.E. ECE, 4th Sem • BITS Pilani',
              },
              {
                quote:
                  'Finally an ed-tech tool that does not feel bloated. The AI assistant helped summarize tricky Signals & Systems derivations effortlessly.',
                name: 'Rohan Deshmukh',
                info: 'B.Tech IT, 5th Sem • DTU Delhi',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-b from-brand-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md mb-2">
            <GraduationCap className="w-8 h-8 text-brand-300" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Conquer Your Semester?
          </h2>
          <p className="text-base sm:text-lg text-brand-100/90 max-w-xl mx-auto font-normal">
            Join thousands of engineering students preparing systematically with Acadly. Create your account in under 60 seconds.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-900 hover:bg-slate-100 shadow-lg">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                Acadly<span className="text-brand-600 dark:text-brand-400">.</span>
              </span>
              <span className="text-xs text-slate-400 ml-2">
                Study smarter. Prepare better. Achieve more.
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} Acadly. All rights reserved. Crafted for engineering undergraduates.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
