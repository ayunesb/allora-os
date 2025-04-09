
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import useDebateMessages from '@/hooks/useDebateMessages';
import useDebateParticipants from '@/hooks/useDebateParticipants';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';
import { UserPreferences } from '@/hooks/useUserPreferences';
import { AIModelType } from '@/utils/consultation/types';

const BotDebate: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [businessContext, setBusinessContext] = useState('');
  const [showRationale, setShowRationale] = useState(true);
  const [isDebating, setIsDebating] = useState(false);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const [businessPriority, setBusinessPriority] = useState('growth');
  const [selectedModel, setSelectedModel] = useState<AIModelType>('auto');
  
  const { participants, setParticipants, availableExecutives } = useDebateParticipants();
  const { messages, isLoading, simulateBotResponses } = useDebateMessages();

  const startDebate = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic for the debate');
      return;
    }
    
    setIsDebating(true);
    
    // Create a user preferences object for the debate
    const debatePreferences: UserPreferences = {
      responseStyle: 'balanced',
      technicalLevel: 'intermediate',
      showSources: showRationale,
      focusArea: 'general',
      riskAppetite,
      preferredExecutives: participants.map(p => p.name),
      favoriteTopics: [topic],
      modelPreference: selectedModel
    };
    
    // Simulate bot responses with the given context
    await simulateBotResponses(
      participants, 
      topic, 
      riskAppetite, 
      businessPriority, 
      debatePreferences
    );
  };

  // Toggle participant selection
  const toggleParticipant = (name: string, role: string) => {
    const isSelected = participants.some(p => p.name === name);
    
    if (isSelected) {
      setParticipants(participants.filter(p => p.name !== name));
    } else {
      // Add the executive to participants
      const newParticipant = {
        id: `bot-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        role,
        title: formatRoleTitle(role),
        specialty: role === 'ceo' ? 'Leadership' : formatRoleTitle(role),
        avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`
      };
      
      setParticipants([...participants, newParticipant]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Executive Strategy Debate</CardTitle>
          <CardDescription>
            Let our AI executives debate the best strategy for your business challenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Business Challenge or Topic</Label>
              <Textarea
                id="topic"
                placeholder="e.g., How should we approach our product pricing strategy?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="context">Business Context (optional)</Label>
              <Textarea
                id="context"
                placeholder="Provide any relevant context about your business situation..."
                value={businessContext}
                onChange={(e) => setBusinessContext(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="risk">Risk Appetite</Label>
                <Select value={riskAppetite} onValueChange={(value: 'low' | 'medium' | 'high') => setRiskAppetite(value)}>
                  <SelectTrigger id="risk">
                    <SelectValue placeholder="Select risk appetite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">Business Priority</Label>
                <Select value={businessPriority} onValueChange={setBusinessPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select business priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="profit">Profitability</SelectItem>
                    <SelectItem value="innovation">Innovation</SelectItem>
                    <SelectItem value="stability">Stability</SelectItem>
                    <SelectItem value="market_share">Market Share</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="model">AI Model</Label>
                <Select value={selectedModel} onValueChange={(value: AIModelType) => setSelectedModel(value)}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o (Balanced)</SelectItem>
                    <SelectItem value="claude-3">Claude 3 (Detailed)</SelectItem>
                    <SelectItem value="gemini-1.5">Gemini 1.5 (Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="showRationale" 
                checked={showRationale} 
                onCheckedChange={(checked) => setShowRationale(!!checked)} 
              />
              <label
                htmlFor="showRationale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show reasoning and rationale in responses
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Executive Participants</CardTitle>
          <CardDescription>
            Choose which AI executives will participate in the debate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible className="space-y-2">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Selected Executives: {participants.length}</span>
                <span>{participants.length > 0 ? '↑' : '↓'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              {Object.entries(executiveBots).map(([role, names]) => (
                <div key={role} className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">{formatRoleTitle(role)}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {names.map(name => (
                      <div 
                        key={name} 
                        className={`border rounded p-2 cursor-pointer ${
                          participants.some(p => p.name === name) 
                            ? 'bg-primary/10 border-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleParticipant(name, role)}
                      >
                        <div className="flex items-center">
                          <Checkbox 
                            checked={participants.some(p => p.name === name)}
                            className="mr-2"
                            // Remove readOnly prop as it's not supported
                          />
                          <span>{name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      
      <Button 
        onClick={startDebate} 
        disabled={isLoading || !topic.trim()} 
        className="w-full md:w-auto"
      >
        {isLoading ? 'Executives are debating...' : isDebating ? 'Restart Debate' : 'Start Executive Debate'}
      </Button>
      
      {messages.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Executive Debate Results</CardTitle>
            <CardDescription>
              Our AI executives have debated your topic and provided their insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="font-medium">{message.sender}</div>
                  <div className="text-sm text-muted-foreground">
                    {participants.find(p => p.name === message.sender)?.title || 'Executive'}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  {showRationale ? (
                    <div>
                      <div className="font-medium mb-2">Strategy:</div>
                      <div className="mb-4">{message.content.split('Rationale:')[0]}</div>
                      
                      {message.content.includes('Rationale:') && (
                        <div>
                          <div className="font-medium mb-2">Rationale:</div>
                          <div>{message.content.split('Rationale:')[1]}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>{message.content.split('Rationale:')[0]}</div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BotDebate;
