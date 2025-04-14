
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDebateSession from '@/hooks/useDebateSession';
import useDebateState from '@/hooks/useDebateState';
import DebateSetup from './DebateSetup';
import DebateChat from './DebateChat';
import DebateSummary from './DebateSummary';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, MessageCircle, PenTool, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    toggleFavorite,
    riskAppetite,
    businessPriority
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

  const [showActiveIndicator, setShowActiveIndicator] = useState(false);
  const [debateInitializing, setDebateInitializing] = useState(false);

  // Auto-switch to debate tab when debate becomes active
  useEffect(() => {
    if (isDebateActive && activeTab === 'setup') {
      handleTabChange('debate');
    }
  }, [isDebateActive, activeTab, handleTabChange]);

  // Animate active debate indicator
  useEffect(() => {
    if (isDebateActive) {
      setShowActiveIndicator(true);
    }
  }, [isDebateActive]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    sendUserMessage(newMessage);
    setNewMessage('');
  };

  const handleStartDebate = async () => {
    setDebateInitializing(true);
    // Add a slight delay for animation purposes
    setTimeout(() => {
      startDebate();
      setDebateInitializing(false);
    }, 800);
  };

  const handleGenerateSummary = () => {
    // This would connect to an AI service in a real app
    handleTabChange('summary');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isDebateActive && showActiveIndicator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center"
            >
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 flex items-center gap-1.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium">Debate Active</span>
              </Badge>
            </motion.div>
          )}
          {riskAppetite && businessPriority && isDebateActive && (
            <div className="ml-2 flex gap-2">
              <Badge variant="secondary" className="text-xs">
                {riskAppetite.charAt(0).toUpperCase() + riskAppetite.slice(1)} Risk
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {businessPriority.charAt(0).toUpperCase() + businessPriority.slice(1)} Priority
              </Badge>
            </div>
          )}
        </div>
        
        {messages.length > 0 && activeTab === 'debate' && (
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              onClick={() => saveDebate()}
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Save</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              onClick={handleGenerateSummary}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Summary</span>
            </motion.div>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col flex-1">
        <TabsList className="mb-4 relative">
          <TabsTrigger value="setup" disabled={isDebateActive && activeTab !== 'setup'}>
            <div className="flex items-center gap-1.5">
              <PenTool className="h-4 w-4" />
              <span>Setup</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="debate" disabled={!isDebateActive}>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>Debate</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="summary" disabled={!isDebateActive || messages.length < 5}>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Summary</span>
            </div>
          </TabsTrigger>
          
          {debateInitializing && (
            <motion.div 
              className="absolute -bottom-8 left-0 right-0 flex justify-center text-sm text-primary"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Assembling executive team...</span>
              </div>
            </motion.div>
          )}
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <TabsContent value="setup" className="flex-1 space-y-4 m-0 h-full">
              <DebateSetup 
                participants={participants}
                selectedTopic={selectedTopic}
                debateTopics={Array.isArray(debateTopics) ? debateTopics : []}
                debateTitle={debateTitle}
                debateObjective={debateObjective}
                debateDuration={debateDuration}
                isLoading={isLoading}
                onTopicChange={setSelectedTopic}
                onTitleChange={setDebateTitle}
                onObjectiveChange={setDebateObjective}
                onDurationChange={setDebateDuration}
                onStartDebate={handleStartDebate}
                onParticipantsChange={setParticipants}
              />
            </TabsContent>
            
            <TabsContent value="debate" className="flex-1 flex flex-col m-0 h-full">
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
            
            <TabsContent value="summary" className="flex-1 m-0 h-full">
              <DebateSummary 
                debateTitle={debateTitle}
                onReturnToDebate={() => handleTabChange('debate')}
                onExportSummary={exportSummary}
                onSaveToReports={saveToReports}
              />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default DebateContainer;
