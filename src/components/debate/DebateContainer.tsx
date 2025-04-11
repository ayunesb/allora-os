
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDebateSession from '@/hooks/useDebateSession';
import useDebateState from '@/hooks/useDebateState';
import DebateSetup from './DebateSetup';
import DebateChat from './DebateChat';
import DebateSummary from './DebateSummary';

const DebateContainer: React.FC = () => {
  const {
    participants,
    selectedTopic,
    messages,
    isDebateActive,
    debateTitle,
    debateObjective,
    debateDuration,
    isLoading,
    debateTopics,
    startDebate,
    sendUserMessage,
    setSelectedTopic,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setParticipants,
    voteMessage,
    toggleFavorite
  } = useDebateSession();

  const {
    newMessage,
    activeTab,
    handleNewMessageChange,
    handleTabChange,
    setNewMessage,
    exportDebate,
    saveDebate,
    exportSummary,
    saveToReports,
  } = useDebateState();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    sendUserMessage(newMessage);
    setNewMessage('');
  };

  const handleGenerateSummary = () => {
    // This would connect to an AI service in a real app
    handleTabChange('summary');
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col flex-1">
        <TabsList className="mb-4">
          <TabsTrigger value="setup" disabled={isDebateActive && activeTab !== 'setup'}>
            Setup
          </TabsTrigger>
          <TabsTrigger value="debate" disabled={!isDebateActive}>
            Debate
          </TabsTrigger>
          <TabsTrigger value="summary" disabled={!isDebateActive || messages.length < 5}>
            Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="flex-1 space-y-4">
          <DebateSetup 
            participants={participants}
            selectedTopic={selectedTopic}
            debateTopics={debateTopics}
            debateTitle={debateTitle}
            debateObjective={debateObjective}
            debateDuration={debateDuration}
            isLoading={isLoading}
            onTopicChange={setSelectedTopic}
            onTitleChange={setDebateTitle}
            onObjectiveChange={setDebateObjective}
            onDurationChange={setDebateDuration}
            onStartDebate={startDebate}
            onParticipantsChange={setParticipants}
          />
        </TabsContent>
        
        <TabsContent value="debate" className="flex-1 flex flex-col">
          <DebateChat 
            debateTitle={debateTitle}
            debateObjective={debateObjective}
            messages={messages}
            participants={participants}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onSaveDebate={saveDebate}
            onExportDebate={() => exportDebate(messages, debateTitle)}
            onGenerateSummary={handleGenerateSummary}
            newMessage={newMessage}
            onNewMessageChange={handleNewMessageChange}
            onVoteMessage={voteMessage}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>
        
        <TabsContent value="summary" className="flex-1">
          <DebateSummary 
            debateTitle={debateTitle}
            onReturnToDebate={() => handleTabChange('debate')}
            onExportSummary={exportSummary}
            onSaveToReports={saveToReports}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DebateContainer;
