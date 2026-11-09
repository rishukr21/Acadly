import React from 'react';
import { RotateCcw } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const RevisionCenterPage = () => {
  return (
    <ModulePlaceholder
      icon={<RotateCcw className="w-7 h-7" />}
      title="Revision Center"
      subtitle="Spaced repetition algorithms to ensure long-term retention of technical concepts."
      emptyTitle="No revision cycles queued"
      emptyDescription="As you complete syllabus topics, Acadly will intelligently prompt you for 1-day, 3-day, and 7-day memory consolidation reviews."
      actionLabel="Queue Quick Revision"
      onAction={() => alert('Revision scheduler is coming in Phase 2!')}
    />
  );
};

export default RevisionCenterPage;
