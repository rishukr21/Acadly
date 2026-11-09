import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-subtle mb-6">
        <GraduationCap className="w-6 h-6" />
      </div>
      <h1 className="text-6xl font-black text-brand-600 dark:text-brand-400 font-mono">404</h1>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">Page Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
        The semester study material or page you are looking for does not exist or has been relocated.
      </p>
      <Link to="/dashboard">
        <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
