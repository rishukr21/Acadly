import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  School,
  Moon,
  Sun,
  Laptop,
  LogOut,
  Save,
  CheckCircle2,
  Shield,
  GraduationCap,
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { userService } from '../services/userService';

const POPULAR_BRANCHES = [
  'Computer Science & Engineering',
  'Artificial Intelligence & Machine Learning',
  'Information Technology',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science',
];

export const SettingsPage = () => {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    degree: user?.degree || 'B.Tech',
    branch: user?.branch || 'Computer Science & Engineering',
    semester: user?.semester || 1,
    academicYear: user?.academicYear || '2024-2025',
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userService.updateProfile(formData);
      if (response.success && response.data?.user) {
        updateUser(response.data.user);
        toast.success('Your profile settings have been successfully updated!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update profile settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info('You have logged out.');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Account Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information, academic affiliation, and application preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar src={user?.avatar} name={user?.name} size="xl" />
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {user?.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
                {user?.degree || 'B.Tech'} • Semester {user?.semester || 1}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {user?.college || 'Engineering Undergraduate'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Academic Details Form */}
      <form onSubmit={handleSaveProfile}>
        <Card>
          <CardHeader>
            <CardTitle>Academic & Personal Details</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">
              These details help Acadly structure your semester syllabus and schedules.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />

              <Input
                label="College / Institute Name"
                value={formData.college}
                onChange={(e) => handleChange('college', e.target.value)}
                placeholder="e.g. NIT Trichy"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Degree
                </label>
                <select
                  value={formData.degree}
                  onChange={(e) => handleChange('degree', e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E.">B.E.</option>
                  <option value="Dual Degree">Dual Degree</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Semester
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => handleChange('semester', Number(e.target.value))}
                  className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-brand-500/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Academic Year"
                value={formData.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
                placeholder="2024-2025"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Branch / Engineering Discipline
              </label>
              <select
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-brand-500/20"
              >
                {POPULAR_BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Theme Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance & Theme</CardTitle>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose how Acadly looks to suit your study environment and reduce eye strain.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === 'light'
                  ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs font-bold">Light Mode</p>
                <p className="text-[10px] text-slate-500">Crisp and clean daylight</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === 'dark'
                  ? 'bg-brand-950/60 border-brand-500 text-white ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Moon className="w-5 h-5 text-brand-400" />
              <div>
                <p className="text-xs font-bold">Dark Mode</p>
                <p className="text-[10px] text-slate-400">Easy on the eyes for night study</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account Security & Logout */}
      <Card className="border-rose-200/50 dark:border-rose-900/30">
        <CardHeader>
          <CardTitle className="text-rose-600 dark:text-rose-400">Session & Security</CardTitle>
          <p className="text-xs text-slate-400 mt-0.5">Manage your active authentication session</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Sign out from this device
            </p>
            <p className="text-[11px] text-slate-500">
              Clears your secure session cookie from this browser.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
