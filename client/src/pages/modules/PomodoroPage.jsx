import React from 'react';
import { Timer } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const PomodoroPage = () => {
  return (
    <ModulePlaceholder
      icon={<Timer className="w-7 h-7" />}
      title="Pomodoro Focus Timer"
      subtitle="Deep-work intervals with automatic break triggers and study streak logs."
      emptyTitle="Ready for a deep study sprint?"
      emptyDescription="Boost your concentration with customizable 25-minute study sessions and 5-minute restorative intervals."
      actionLabel="Start Focus Sprint"
      onAction={() => alert('Pomodoro timer runner is coming in Phase 2!')}
    />
  );
};

export default PomodoroPage;
