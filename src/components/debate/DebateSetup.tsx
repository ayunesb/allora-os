
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [open, setOpen] = React.useState(false);
  const [customTopic, setCustomTopic] = React.useState("");
  
  // Combine predefined topics with custom topic if entered
  const allTopics = React.useMemo(() => {
    const topics = [...debateTopics];
    if (customTopic && !topics.some(t => t.id === customTopic)) {
      topics.push({
        id: customTopic,
        topic: customTopic,
        description: "Custom topic"
      });
    }
    return topics;
  }, [debateTopics, customTopic]);

  // Handle selection of topic from combobox
  const handleSelectTopic = (value: string) => {
    onTopicChange(value);
    setOpen(false);
  };

  // Get selected topic display text
  const getTopicDisplayValue = () => {
    const topic = allTopics.find(topic => topic.id === selectedTopic);
    return topic?.topic || "Select a topic";
  };

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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {getTopicDisplayValue()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Search or enter a custom topic..." 
                  value={customTopic}
                  onValueChange={(value) => {
                    setCustomTopic(value);
                    // If no match is found in predefined topics, create a custom topic
                    if (value && !debateTopics.some(t => t.topic.toLowerCase() === value.toLowerCase())) {
                      handleSelectTopic(value);
                    }
                  }}
                />
                <CommandEmpty>
                  {customTopic ? (
                    <CommandItem 
                      value={customTopic}
                      onSelect={() => handleSelectTopic(customTopic)}
                    >
                      Create topic: "{customTopic}"
                    </CommandItem>
                  ) : (
                    "No topic found."
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {debateTopics.map((topic) => (
                    <CommandItem
                      key={topic.id}
                      value={topic.id}
                      onSelect={() => handleSelectTopic(topic.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTopic === topic.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {topic.topic}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedTopic && (
            <p className="text-sm text-muted-foreground">
              {allTopics.find(t => t.id === selectedTopic)?.description}
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
