import React from 'react';
import { Trophy } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const LeaderboardPage = () => {
  return (
    <ModulePlaceholder
      icon={<Trophy className="w-7 h-7" />}
      title="Semester Study Leaderboard"
      subtitle="Friendly peer benchmarks based on Pomodoro consistency and topic mastery."
      emptyTitle="Semester rankings are not active yet"
      emptyDescription="Rankings will calibrate as you and your batchmates log study minutes and complete syllabus topics."
      actionLabel="View Scoring Guidelines"
      onAction={() => alert('Leaderboard rankings are coming in Phase 4!')}
    />
  );
};

export default LeaderboardPage;
