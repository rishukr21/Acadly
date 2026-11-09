import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  School,
  BookOpen,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import Card, { CardContent } from '../components/common/Card';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userService } from '../services/userService';

const AVATAR_PRESETS = [
  'Felix',
  'Aneka',
  'Aria',
  'Jasper',
  'Milo',
  'Sora',
  'Leo',
  'Zoe',
];

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

export const OnboardingPage = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State initialized with existing user properties
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    college: user?.college || '',
    degree: user?.degree || 'B.Tech',
    branch: user?.branch || 'Computer Science & Engineering',
    semester: user?.semester || 1,
    academicYear: user?.academicYear || '2024-2025',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
    } else if (currentStep === 2) {
      if (!formData.college.trim()) newErrors.college = 'College/University name is required';
      if (!formData.degree) newErrors.degree = 'Please select your degree';
    } else if (currentStep === 3) {
      if (!formData.branch.trim()) newErrors.branch = 'Branch/Major is required';
      if (!formData.semester) newErrors.semester = 'Semester is required';
      if (!formData.academicYear.trim()) newErrors.academicYear = 'Academic year is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinishOnboarding = async () => {
    setLoading(true);
    try {
      const response = await userService.updateProfile({
        ...formData,
        onboardingCompleted: true,
      });

      if (response.success && response.data?.user) {
        updateUser(response.data.user);
        toast.success('Semester setup complete! Welcome to your dashboard.');
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save onboarding details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between transition-colors">
      <div className="max-w-2xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-subtle">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              Acadly<span className="text-brand-600 dark:text-brand-400">.</span>
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Step Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400">
              Step {step} of 4
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {step === 1 && 'Personal Details'}
              {step === 2 && 'College & Degree'}
              {step === 3 && 'Semester Setup'}
              {step === 4 && 'All Set!'}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Form Cards */}
        <Card className="shadow-elevated border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Tell us about yourself
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Let's personalize your Acadly study space.
                  </p>
                </div>

                <div className="flex flex-col items-center sm:flex-row gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <Avatar
                    src={formData.avatar}
                    name={formData.name || 'Student'}
                    size="xl"
                  />
                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Choose an avatar preset or use initial
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {AVATAR_PRESETS.map((preset) => {
                        const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${preset}&backgroundColor=7c3aed`;
                        const isSelected = formData.avatar === url;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleChange('avatar', url)}
                            className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                              isSelected
                                ? 'border-brand-600 ring-2 ring-brand-500/20'
                                : 'border-transparent'
                            }`}
                          >
                            <img src={url} alt={preset} className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  error={errors.name}
                  required
                />
              </div>
            )}

            {/* STEP 2: Academic Info */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Where do you study?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Acadly organizes schedules according to typical university patterns.
                  </p>
                </div>

                <Input
                  label="College / Institute Name"
                  leftIcon={<School className="w-4 h-4" />}
                  placeholder="e.g. IIT Bombay, NIT Trichy, BITS Pilani, Delhi Technological University"
                  value={formData.college}
                  onChange={(e) => handleChange('college', e.target.value)}
                  error={errors.college}
                  required
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Degree Program <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['B.Tech', 'B.E.', 'Dual Degree', 'Other'].map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => handleChange('degree', deg)}
                        className={`p-3.5 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${
                          formData.degree === deg
                            ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <span>{deg}</span>
                        {formData.degree === deg && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Semester Setup */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Semester & Branch Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Select your current semester standing and engineering specialization.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Engineering Branch / Major <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => handleChange('branch', e.target.value)}
                    className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    {POPULAR_BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Current Semester <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => handleChange('semester', sem)}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all text-center ${
                          formData.semester === sem
                            ? 'bg-brand-600 text-white border-brand-600 shadow-subtle'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        Sem {sem}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Academic Session Year"
                  leftIcon={<Calendar className="w-4 h-4" />}
                  placeholder="e.g. 2024-2025"
                  value={formData.academicYear}
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                  error={errors.academicYear}
                  required
                />
              </div>
            )}

            {/* STEP 4: Completion Screen */}
            {step === 4 && (
              <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-850/60 flex items-center justify-center text-emerald-600 mx-auto shadow-subtle">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    You're All Set, {formData.name.split(' ')[0]}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Your semester profile has been successfully configured. Here is your academic setup summary:
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800 text-left space-y-2.5 max-w-md mx-auto text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400 font-medium">College:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[220px]">
                      {formData.college}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400 font-medium">Program:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formData.degree} in {formData.branch}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400 font-medium">Standing:</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">
                      Semester {formData.semester} ({formData.academicYear})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800/80 mt-6">
              {step > 1 && step < 4 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleFinishOnboarding}
                  isLoading={loading}
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Enter Acadly Dashboard
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-slate-400 pt-6">
        Acadly — B.Tech Examination Preparation System
      </div>
    </div>
  );
};

export default OnboardingPage;
