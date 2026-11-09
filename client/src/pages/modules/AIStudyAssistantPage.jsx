import React from 'react';
import { Sparkles } from 'lucide-react';
import ModulePlaceholder from './ModulePlaceholder';

export const AIStudyAssistantPage = () => {
  return (
    <ModulePlaceholder
      icon={<Sparkles className="w-7 h-7" />}
      title="AI Study Assistant"
      subtitle="Engineering-tuned conversational agent for technical doubts, summaries, and exam prep."
      emptyTitle="Your AI tutor is ready to assist"
      emptyDescription="Ask technical questions, generate practice quizzes for upcoming modules, and clarify tough engineering concepts."
      actionLabel="Start New Conversation"
      onAction={() => alert('AI Assistant integration is scheduled for Phase 3!')}
    />
  );
};

export default AIStudyAssistantPage;
