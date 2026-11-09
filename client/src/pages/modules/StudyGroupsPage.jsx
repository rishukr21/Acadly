import React from 'react';
import { Users2 } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const StudyGroupsPage = () => {
  return (
    <ModulePlaceholder
      icon={<Users2 className="w-7 h-7" />}
      title="Collaborative Study Groups"
      subtitle="Peer study rooms, shared exam checklists, and group accountability."
      emptyTitle="You haven't joined any study groups"
      emptyDescription="Create or join peer groups for your semester branch to share notes and hold each other accountable."
      actionLabel="Create Study Group"
      onAction={() => alert('Collaborative groups are coming in Phase 4!')}
    />
  );
};

export default StudyGroupsPage;
