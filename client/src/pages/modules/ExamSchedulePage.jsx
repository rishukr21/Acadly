import React from 'react';
import { Clock } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const ExamSchedulePage = () => {
  return (
    <ModulePlaceholder
      icon={<Clock className="w-7 h-7" />}
      title="Exam Schedule & Countdown"
      subtitle="Upcoming mid-terms, semester end-terms, and laboratory practical timetables."
      emptyTitle="Add your first examination to get started"
      emptyDescription="Track real-time countdowns, remaining study days, and exam syllabus readiness in one unified dashboard."
      actionLabel="Schedule Examination"
      onAction={() => alert('Exam scheduling is coming in Phase 2!')}
    />
  );
};

export default ExamSchedulePage;
