
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, ArrowRight, Brain, MessageSquare, ThumbsUp, ThumbsDown, Save, BarChart, Play, Sparkles, Lightbulb, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatRoleTitle } from '@/utils/consultation';
import { DebateMessage } from '@/utils/consultation/types';
import useExecutiveBoardroom from '@/hooks/useExecutiveBoardroom';
import ExecutiveSelectionDialog from './ExecutiveSelectionDialog';
import ExecutiveVotingResult from './ExecutiveVotingResult';
import ThoughtBubble from './ThoughtBubble';
import DebateSummaryDisplay from './DebateSummaryDisplay';
import { useToast } from '@/components/ui/use-toast';

const AIExecutiveBoardroom: React.FC = () => {
  const {
    participants,
    setParticipants,
    messages,
    isDebating,
    debateTitle,
    debateTopic,
    isLoadingMessages,
    reactions,
    votes,
    debateSummary,
    suggestedTopic,
    startDebate,
    saveStrategyToLibrary,
    resetDebate
  } = useExecutiveBoardroom();
  
  const [topicInput, setTopicInput] = useState('');
  const [activeTab, setActiveTab] = useState('debate');
  const [isExecutiveDialogOpen, setIsExecutiveDialogOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to the bottom when new messages come in
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Use the suggested topic when available
  useEffect(() => {
    if (suggestedTopic && !topicInput && !isDebating) {
      setTopicInput(suggestedTopic);
    }
  }, [suggestedTopic, isDebating]);
  
  const handleTopicInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicInput(e.target.value);
  };
  
  const handleStartDebate = () => {
    if (!topicInput.trim()) {
      toast({
        title: "Missing topic",
        description: "Please enter a topic for the executive debate",
        variant: "destructive"
      });
      return;
    }
    
    startDebate(topicInput);
  };
  
  const handleSaveStrategy = async () => {
    const strategyId = await saveStrategyToLibrary();
    if (strategyId) {
      toast({
        title: "Strategy Saved",
        description: "The winning strategy has been added to your library",
      });
    }
  };
  
  const handleNewDebate = () => {
    resetDebate();
    setTopicInput('');
    setActiveTab('debate');
  };
  
  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col bg-black border-gray-800 shadow-lg">
        <CardHeader className="pb-2 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-white font-bold flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                {isDebating ? debateTitle : 'AI Executive Boardroom'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {isDebating 
                  ? 'Your executive team is debating the best strategy'
                  : 'Simulate a boardroom debate with world-class AI executives'}
              </CardDescription>
            </div>
            {!isDebating && (
              <Button 
                variant="outline" 
                className="border-purple-600 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                onClick={() => setIsExecutiveDialogOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Choose Executives</span>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex flex-col flex-1"
        >
          <div className="px-6 pt-2 border-b border-gray-800">
            <TabsList className="bg-gray-900">
              <TabsTrigger 
                value="debate" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Debate</span>
              </TabsTrigger>
              <TabsTrigger 
                value="summary" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                disabled={!debateSummary}
              >
                <BarChart className="h-4 w-4 mr-2" />
                <span>Summary</span>
              </TabsTrigger>
              <TabsTrigger 
                value="replay" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                disabled={!isDebating || messages.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                <span>Replay</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="debate" className="flex-1 flex flex-col p-0 m-0">
            {!isDebating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-md text-center mb-8">
                  <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Start an Executive Debate</h3>
                  <p className="text-gray-400 mb-6">
                    Let our AI executive team debate and develop the best strategy for your business challenge.
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="debateTopic" className="block text-sm font-medium text-gray-400 mb-1 text-left">
                        Debate Topic
                      </label>
                      <Input
                        id="debateTopic"
                        placeholder="E.g., Expanding to international markets"
                        value={topicInput}
                        onChange={handleTopicInputChange}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                      {suggestedTopic && (
                        <div className="flex items-center mt-2 text-left">
                          <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                          <p className="text-xs text-amber-400">Suggested: {suggestedTopic}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <Button 
                        onClick={handleStartDebate} 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>Start Executive Debate</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
                  {participants.slice(0, 5).map((exec) => (
                    <div key={exec.id} className="flex flex-col items-center">
                      <Avatar className="h-20 w-20 mb-2 border-2 border-purple-600/50">
                        <AvatarImage src={exec.avatar} alt={exec.name} />
                        <AvatarFallback className="bg-purple-900 text-white">
                          {exec.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="text-white font-medium text-center">{exec.name}</h4>
                      <p className="text-xs text-gray-400 text-center">{formatRoleTitle(exec.role)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message: DebateMessage, index: number) => (
                      <div 
                        key={message.id} 
                        className={`relative ${message.senderId === 'system' ? 'flex justify-center' : 'flex'}`}
                      >
                        {message.senderId === 'system' ? (
                          <div className="bg-gray-800/70 border border-gray-700 rounded-lg py-3 px-4 max-w-2xl">
                            <p className="text-sm text-gray-300 whitespace-pre-line">{message.content}</p>
                          </div>
                        ) : (
                          <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-10 w-10 mt-1 border-2 border-gray-800 flex-shrink-0">
                              <AvatarImage 
                                src={participants.find(p => p.id === message.senderId)?.avatar} 
                                alt={message.sender} 
                              />
                              <AvatarFallback className="bg-purple-900 text-white">
                                {message.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-white">{message.sender}</span>
                                <span className="text-xs text-gray-400">
                                  {formatRoleTitle(participants.find(p => p.id === message.senderId)?.role || '')}
                                </span>
                              </div>
                              
                              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-1">
                                <p className="text-sm text-gray-300">{message.content}</p>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full hover:bg-gray-800"
                                >
                                  <ThumbsUp className="h-3 w-3 text-gray-400" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full hover:bg-gray-800"
                                >
                                  <ThumbsDown className="h-3 w-3 text-gray-400" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Thought bubbles */}
                        {reactions.filter(r => r.executiveId !== message.senderId).map(reaction => (
                          <ThoughtBubble
                            key={`${reaction.executiveId}-${reaction.timestamp.getTime()}`}
                            reaction={reaction}
                            executives={participants}
                          />
                        ))}
                      </div>
                    ))}
                    
                    {isLoadingMessages && (
                      <div className="flex justify-center">
                        <div className="bg-gray-800/70 border border-gray-700 rounded-lg py-2 px-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                            <p className="text-sm text-gray-400">Executives are discussing...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Voting results */}
                    {votes.length > 0 && (
                      <ExecutiveVotingResult votes={votes} executives={participants} />
                    )}
                    
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
                
                <CardFooter className="border-t border-gray-800 p-4">
                  {debateSummary ? (
                    <div className="flex flex-wrap gap-2 w-full justify-between">
                      <Button 
                        variant="secondary" 
                        className="bg-gray-800 hover:bg-gray-700"
                        onClick={handleNewDebate}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        <span>New Debate</span>
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="border-purple-600 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                          onClick={() => setActiveTab('summary')}
                        >
                          <BarChart className="h-4 w-4 mr-2" />
                          <span>View Summary</span>
                        </Button>
                        
                        <Button 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={handleSaveStrategy}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          <span>Save Strategy</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full py-2">
                      <p className="text-sm text-gray-400 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-purple-500" />
                        <span>AI executives are debating your topic in real-time</span>
                      </p>
                    </div>
                  )}
                </CardFooter>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="flex-1 p-0 m-0">
            {debateSummary && (
              <DebateSummaryDisplay 
                summary={debateSummary} 
                debateTopic={debateTopic}
                executives={participants}
                onSaveStrategy={handleSaveStrategy}
                onNewDebate={handleNewDebate}
              />
            )}
          </TabsContent>
          
          <TabsContent value="replay" className="flex-1 p-0 m-0">
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="max-w-md text-center">
                <Play className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Debate Replay</h3>
                <p className="text-gray-400 mb-6">
                  Watch the entire debate again with all executive interactions.
                </p>
                <Button 
                  onClick={() => setActiveTab('debate')} 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  <span>Start Replay</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <ExecutiveSelectionDialog 
        isOpen={isExecutiveDialogOpen}
        onClose={() => setIsExecutiveDialogOpen(false)}
        selectedExecutives={participants}
        onExecutivesChange={setParticipants}
      />
    </div>
  );
};

export default AIExecutiveBoardroom;

// Small helper component for the Users icon
const Users: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
