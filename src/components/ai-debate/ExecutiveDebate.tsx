
import React, { useState } from 'react';
import { useDebateSession } from '@/hooks/useDebateSession';
import { useExecutiveBoard } from '@/hooks/useExecutiveBoard';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, MessageSquare, Settings, Users, ArrowUpCircle, ArrowDownCircle, Star, Share, Save } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ExecutiveBot, RiskLevel } from '@/hooks/useExecutiveBoard';
import { DebateParticipant } from '@/utils/consultation/types';

const ExecutiveDebate: React.FC = () => {
  const {
    participants,
    messages,
    isDebateActive,
    debateTitle,
    debateObjective,
    isLoading,
    startDebate,
    sendUserMessage,
    voteMessage,
    toggleFavorite
  } = useDebateSession();
  
  const {
    executives,
    filteredExecutives,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    riskFilter,
    setRiskFilter
  } = useExecutiveBoard();
  
  const { preferences, updatePreference } = useUserPreferences();
  
  const [activeTab, setActiveTab] = useState('debate');
  const [userMessage, setUserMessage] = useState('');
  const [selectedExecutives, setSelectedExecutives] = useState<ExecutiveBot[]>([]);
  const [newDebateTitle, setNewDebateTitle] = useState('');
  const [debateTopic, setDebateTopic] = useState('');
  
  // Convert an ExecutiveBot to a DebateParticipant
  const convertToParticipant = (exec: ExecutiveBot): DebateParticipant => ({
    id: exec.id,
    name: exec.name,
    role: exec.role,
    title: exec.title,
    specialty: exec.specialization.join(', '),
    avatar: exec.avatar
  });
  
  // Start a new debate with selected executives
  const handleStartDebate = () => {
    if (!newDebateTitle || !debateTopic || selectedExecutives.length === 0) {
      return;
    }
    
    const debateParticipants = selectedExecutives.map(convertToParticipant);
    
    // Here we would normally update the debate session with these participants and settings
    // For now, just log them
    console.log('Starting debate with:', {
      title: newDebateTitle,
      topic: debateTopic,
      participants: debateParticipants,
      riskAppetite: preferences.riskAppetite,
      modelPreference: preferences.modelPreference
    });
    
    // Change to debate tab
    setActiveTab('debate');
  };
  
  // Toggle executive selection
  const toggleExecutiveSelection = (exec: ExecutiveBot) => {
    if (selectedExecutives.some(e => e.id === exec.id)) {
      setSelectedExecutives(selectedExecutives.filter(e => e.id !== exec.id));
    } else {
      if (selectedExecutives.length < 6) { // Limit to 6 executives
        setSelectedExecutives([...selectedExecutives, exec]);
      }
    }
  };
  
  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    
    sendUserMessage(userMessage);
    setUserMessage('');
  };
  
  // Filter for executives based on risk level
  const filterByRisk = (risk: RiskLevel) => {
    setRiskFilter(risk);
    updatePreference('riskAppetite', risk.toLowerCase());
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">AI Executive Debate</CardTitle>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-primary">Core AI System</Badge>
              <Badge variant="outline" className="text-blue-500">BETA</Badge>
            </div>
          </div>
          <CardDescription>
            Get strategic insights from AI executives with different perspectives
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Setup Debate</span>
          </TabsTrigger>
          <TabsTrigger value="debate" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Active Debate</span>
          </TabsTrigger>
          <TabsTrigger value="executives" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Executives</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configure Your AI Executive Debate</CardTitle>
              <CardDescription>
                Select executives and define the debate topic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Debate Title</h3>
                <Input 
                  placeholder="e.g., Growth Strategy for Q3 2023" 
                  value={newDebateTitle}
                  onChange={(e) => setNewDebateTitle(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Debate Topic</h3>
                <Input 
                  placeholder="e.g., How to increase customer retention by 20%" 
                  value={debateTopic}
                  onChange={(e) => setDebateTopic(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Risk Appetite</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant={riskFilter === 'Low' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => filterByRisk('Low')}
                  >
                    Conservative
                  </Button>
                  <Button 
                    variant={riskFilter === 'Medium' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => filterByRisk('Medium')}
                  >
                    Balanced
                  </Button>
                  <Button 
                    variant={riskFilter === 'High' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => filterByRisk('High')}
                  >
                    Aggressive
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">AI Model Preference</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant={preferences.modelPreference === 'auto' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => updatePreference('modelPreference', 'auto')}
                  >
                    Auto (Best for task)
                  </Button>
                  <Button 
                    variant={preferences.modelPreference === 'gpt-4o' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => updatePreference('modelPreference', 'gpt-4o')}
                  >
                    GPT-4o
                  </Button>
                  <Button 
                    variant={preferences.modelPreference === 'claude-3' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => updatePreference('modelPreference', 'claude-3')}
                  >
                    Claude 3
                  </Button>
                  <Button 
                    variant={preferences.modelPreference === 'gemini-1.5' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => updatePreference('modelPreference', 'gemini-1.5')}
                  >
                    Gemini 1.5
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Select Executive Participants ({selectedExecutives.length}/6)</h3>
                  <Input 
                    placeholder="Search executives..." 
                    className="w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-1">
                  {filteredExecutives.map(exec => (
                    <div 
                      key={exec.id}
                      className={`border p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedExecutives.some(e => e.id === exec.id) 
                          ? 'bg-primary/10 border-primary/50' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleExecutiveSelection(exec)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={exec.avatar} alt={exec.name} />
                          <AvatarFallback>{exec.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{exec.name}</h4>
                          <p className="text-xs text-muted-foreground">{exec.title}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs mr-1">
                          {exec.riskAppetite} Risk
                        </Badge>
                        {exec.specialization.slice(0, 1).map(spec => (
                          <Badge key={spec} variant="outline" className="text-xs mr-1">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleStartDebate} disabled={!newDebateTitle || !debateTopic || selectedExecutives.length === 0}>
                  Start Debate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debate" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>{debateTitle || "AI Executive Debate"}</CardTitle>
              <CardDescription>
                {debateObjective || debateTopic || "Start a new debate from the Setup tab"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto pb-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-grow">
                        <Skeleton className="h-4 w-[30%]" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-4 ${message.isUser ? 'justify-end' : ''}`}>
                      {!message.isUser && (
                        <Avatar>
                          <AvatarImage src={`/avatars/${message.sender.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={message.sender} />
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`space-y-1 max-w-[80%] ${message.isUser ? 'bg-primary/20' : 'bg-muted'} p-3 rounded-lg`}>
                        {!message.isUser && (
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm">{message.sender}</h4>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => voteMessage(message.id, 1)}>
                                <ArrowUpCircle className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{message.votes}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => voteMessage(message.id, -1)}>
                                <ArrowDownCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleFavorite(message.id)}>
                                <Star className={`h-4 w-4 ${message.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                              </Button>
                            </div>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.isUser && (
                        <Avatar>
                          <AvatarImage src="/avatars/user.jpg" alt="You" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="max-w-md space-y-2">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Active Debate</h3>
                    <p className="text-muted-foreground">
                      Configure your debate in the Setup tab or send a message below to start with default executives.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t mt-auto">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  placeholder="Ask your question to the executive board..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !userMessage.trim()}>
                  Send
                </Button>
              </form>
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-1">
                  {selectedExecutives.slice(0, 3).map(exec => (
                    <Avatar key={exec.id} className="h-6 w-6">
                      <AvatarImage src={exec.avatar} alt={exec.name} />
                      <AvatarFallback>{exec.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {selectedExecutives.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedExecutives.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled={messages.length === 0}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button variant="outline" size="sm" disabled={messages.length === 0}>
                    <Share className="h-4 w-4 mr-1" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="executives" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Executive Bot Roster</CardTitle>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search executives..." 
                    className="w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                Browse all available AI executives for your strategic debates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExecutives.map(exec => (
                  <Card key={exec.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={exec.avatar} alt={exec.name} />
                          <AvatarFallback>{exec.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">{exec.name}</h3>
                          <p className="text-sm text-muted-foreground">{exec.title}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Specialization</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {exec.specialization.map(spec => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Optimization</h4>
                          <p className="text-sm text-muted-foreground">{exec.optimization}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Risk Level</h4>
                          <Badge className={`
                            ${exec.riskAppetite === 'Low' ? 'bg-green-500/10 text-green-500' : 
                              exec.riskAppetite === 'High' ? 'bg-red-500/10 text-red-500' : 
                              'bg-amber-500/10 text-amber-500'}
                          `}>
                            {exec.riskAppetite}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleExecutiveSelection(exec)}
                      >
                        {selectedExecutives.some(e => e.id === exec.id) ? 'Remove' : 'Add to Debate'}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveDebate;
