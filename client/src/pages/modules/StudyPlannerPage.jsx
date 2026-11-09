import React from 'react';
import { CalendarDays } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const StudyPlannerPage = () => {
  return (
    <ModulePlaceholder
      icon={<CalendarDays className="w-7 h-7" />}
      title="Daily Study Planner"
      subtitle="Intelligent calendar and daily study blocks tailored around your exam schedule."
      emptyTitle="Your study plan is empty"
      emptyDescription="Create targeted daily revision slots to cover syllabus topics progressively without last-minute stress."
      actionLabel="Create Study Block"
      onAction={() => alert('Study block scheduling is coming in Phase 2!')}
    />
  );
};

export default StudyPlannerPage;
