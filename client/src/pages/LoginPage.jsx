import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GraduationCap, Lock, Mail, AlertCircle, Info } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import GoogleLoginButton from '../components/common/GoogleLoginButton';
import ThemeToggle from '../components/common/ThemeToggle';
import Modal from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const user = await login({
        email: data.email,
        password: data.password,
      });
      toast.success(`Welcome back, ${user.name}!`);
      if (user.onboardingCompleted) {
        navigate(from, { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    } catch (err) {
      setServerError(err.message || 'Invalid email or password.');
      toast.error(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-slate-950 transition-colors">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-subtle group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            Acadly<span className="text-brand-600 dark:text-brand-400">.</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Create one free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-elevated rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {serverError && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Google Sign-in */}
          <GoogleLoginButton text="signin_with" />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="rahul@college.edu"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              required
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              required
              {...register('password', {
                required: 'Password is required',
              })}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500/20"
                  {...register('rememberMe')}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" isLoading={loading} size="md">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Your Password"
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-850/50 text-slate-700 dark:text-slate-300">
            <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              In this development phase, password resets can be requested by reaching out to your
              administrator or re-registering with your academic email.
            </p>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Automated email-based OTP/Magic link password reset is scheduled for integration in the
            upcoming notifications sprint.
          </p>
          <div className="pt-2 flex justify-end">
            <Button size="sm" onClick={() => setForgotModalOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
