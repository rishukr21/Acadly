import React from 'react';
import { BarChart3 } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const AnalyticsPage = () => {
  return (
    <ModulePlaceholder
      icon={<BarChart3 className="w-7 h-7" />}
      title="Productivity & Readiness Analytics"
      subtitle="Deep insights into your study habits, syllabus burn-down velocity, and exam confidence."
      emptyTitle="Insufficient study data collected"
      emptyDescription="After completing your first week of study sessions and subject topic milestones, rich charts and analytics will populate here."
      actionLabel="Learn About Velocity Metrics"
      onAction={() => alert('Analytics dashboard engine is coming in Phase 3!')}
    />
  );
};

export default AnalyticsPage;
