import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import OnboardingRoute from './OnboardingRoute';
import PublicRoute from './PublicRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import OnboardingPage from '../pages/OnboardingPage';
import DashboardPage from '../pages/DashboardPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

// Module Placeholders
import MySubjectsPage from '../pages/modules/MySubjectsPage';
import StudyPlannerPage from '../pages/modules/StudyPlannerPage';
import ExamSchedulePage from '../pages/modules/ExamSchedulePage';
import PomodoroPage from '../pages/modules/PomodoroPage';
import RevisionCenterPage from '../pages/modules/RevisionCenterPage';
import AIStudyAssistantPage from '../pages/modules/AIStudyAssistantPage';
import NotesResourcesPage from '../pages/modules/NotesResourcesPage';
import StudyGroupsPage from '../pages/modules/StudyGroupsPage';
import LeaderboardPage from '../pages/modules/LeaderboardPage';
import AnalyticsPage from '../pages/modules/AnalyticsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Guest-only routes (redirect to dashboard/onboarding if logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Onboarding Route (requires auth, redirects if already completed) */}
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>

      {/* Protected Dashboard Routes (requires auth + completed onboarding) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/subjects" element={<MySubjectsPage />} />
          <Route path="/dashboard/planner" element={<StudyPlannerPage />} />
          <Route path="/dashboard/exams" element={<ExamSchedulePage />} />
          <Route path="/dashboard/pomodoro" element={<PomodoroPage />} />
          <Route path="/dashboard/revision" element={<RevisionCenterPage />} />
          <Route path="/dashboard/ai-assistant" element={<AIStudyAssistantPage />} />
          <Route path="/dashboard/notes" element={<NotesResourcesPage />} />
          <Route path="/dashboard/groups" element={<StudyGroupsPage />} />
          <Route path="/dashboard/leaderboard" element={<LeaderboardPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 Catch All */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
