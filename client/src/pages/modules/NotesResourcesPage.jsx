import React from 'react';
import { FileText } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const NotesResourcesPage = () => {
  return (
    <ModulePlaceholder
      icon={<FileText className="w-7 h-7" />}
      title="Notes & Resources"
      subtitle="Centralized repository for textbook chapters, lecture slides, and handwritten notes."
      emptyTitle="No study materials uploaded yet"
      emptyDescription="Upload lecture PDFs, organize topic-wise cheatsheets, and attach question banks for quick access."
      actionLabel="Upload Resource"
      onAction={() => alert('Resource management is coming in Phase 2!')}
    />
  );
};

export default NotesResourcesPage;
