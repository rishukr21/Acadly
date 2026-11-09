import React from 'react';
import { BookOpen } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const MySubjectsPage = () => {
  return (
    <ModulePlaceholder
      icon={<BookOpen className="w-7 h-7" />}
      title="My Subjects"
      subtitle="Syllabus unit tracking, subject credits, and chapter completion status."
      emptyTitle="You haven't added any subjects yet"
      emptyDescription="Organize your semester syllabus by adding your theory and laboratory courses. You will be able to check off topics and track completion percentages."
      actionLabel="Add First Subject"
      onAction={() => alert('Subject addition is coming in Phase 2!')}
    />
  );
};

export default MySubjectsPage;
