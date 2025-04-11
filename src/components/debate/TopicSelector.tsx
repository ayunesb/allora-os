
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DebateTopic } from '@/utils/consultation/types';

interface TopicSelectorProps {
  selectedTopic: string;
  debateTopics: DebateTopic[];
  onTopicChange: (value: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  debateTopics,
  onTopicChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [customTopic, setCustomTopic] = React.useState("");
  
  // Ensure debateTopics is always an array (even if empty)
  const safeDebateTopics = React.useMemo(() => {
    return Array.isArray(debateTopics) ? debateTopics : [];
  }, [debateTopics]);
  
  // Combine predefined topics with custom topic if entered
  const allTopics = React.useMemo(() => {
    const topics = [...safeDebateTopics];
    if (customTopic && !topics.some(t => t.id === customTopic)) {
      topics.push({
        id: customTopic,
        topic: customTopic,
        description: "Custom topic"
      });
    }
    return topics;
  }, [safeDebateTopics, customTopic]);

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
    <div className="space-y-2">
      <Label htmlFor="topic">Debate Topic</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button"
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
                // Don't automatically select when typing - wait for explicit selection
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
            {safeDebateTopics.length > 0 && (
              <CommandGroup>
                {safeDebateTopics.map((topic) => (
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
            )}
          </Command>
        </PopoverContent>
      </Popover>
      {selectedTopic && (
        <p className="text-sm text-muted-foreground">
          {allTopics.find(t => t.id === selectedTopic)?.description}
        </p>
      )}
    </div>
  );
};

export default TopicSelector;
