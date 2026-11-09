import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import { Sparkles } from 'lucide-react';

export const ModulePlaceholder = ({
  icon,
  title,
  subtitle,
  emptyTitle,
  emptyDescription,
  actionLabel,
  onAction,
  badge = 'Phase 2 Module',
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/50 dark:border-brand-850 text-[11px] font-semibold text-brand-700 dark:text-brand-300 mb-2">
            <Sparkles className="w-3 h-3 text-brand-600" />
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-8 sm:p-12">
          <EmptyState
            icon={icon}
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={actionLabel}
            onAction={onAction}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePlaceholder;
