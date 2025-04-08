
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DebateParticipant, DebateTopic } from '@/utils/consultation/types';

interface DebateSetupProps {
  participants: DebateParticipant[];
  selectedTopic: string;
  debateTopics: DebateTopic[];
  debateTitle: string;
  debateObjective: string;
  debateDuration: string;
  isLoading: boolean;
  onTopicChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onObjectiveChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onStartDebate: () => void;
}

const DebateSetup: React.FC<DebateSetupProps> = ({
  participants,
  selectedTopic,
  debateTopics,
  debateTitle,
  debateObjective,
  debateDuration,
  isLoading,
  onTopicChange,
  onTitleChange,
  onObjectiveChange,
  onDurationChange,
  onStartDebate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Debate Setup</CardTitle>
        <CardDescription>
          Configure the AI executive debate parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Debate Topic</Label>
          <Select value={selectedTopic} onValueChange={onTopicChange}>
            <SelectTrigger id="topic">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {debateTopics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTopic && (
            <p className="text-sm text-muted-foreground">
              {debateTopics.find(t => t.id === selectedTopic)?.description}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Debate Title</Label>
          <Input 
            id="title" 
            value={debateTitle} 
            onChange={(e) => onTitleChange(e.target.value)} 
            placeholder="Enter a title for this debate" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="objective">Debate Objective</Label>
          <Textarea 
            id="objective" 
            value={debateObjective} 
            onChange={(e) => onObjectiveChange(e.target.value)} 
            placeholder="What should this debate achieve?" 
            rows={3} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Approximate Duration (minutes)</Label>
          <Select value={debateDuration} onValueChange={onDurationChange}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Participants</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {participants.map((bot) => (
              <div key={bot.id} className="flex items-center space-x-3 p-3 border rounded-md">
                <Avatar>
                  <AvatarImage src={bot.avatar} />
                  <AvatarFallback>{bot.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{bot.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{bot.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStartDebate} 
          disabled={!selectedTopic || !debateTitle || !debateObjective || isLoading}
          className="ml-auto"
        >
          {isLoading ? 'Starting Debate...' : 'Start Debate'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DebateSetup;
