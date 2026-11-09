import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 ${className}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200/50 dark:border-brand-850/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-subtle">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1.5">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
