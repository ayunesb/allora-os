
import React from 'react';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DebateTopic } from '@/utils/consultation/types';

interface TopicSelectorProps {
  selectedTopic: string;
  debateTopics: DebateTopic[];
  onTopicChange: (value: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  debateTopics = [], // Ensure this has a default value to prevent the iterator error
  onTopicChange,
}) => {
  const [open, setOpen] = React.useState(false);

  // Ensure debateTopics is an array before trying to find in it
  const currentTopic = Array.isArray(debateTopics) 
    ? debateTopics.find((topic) => topic.id === selectedTopic)?.topic 
    : '';

  return (
    <div className="space-y-2">
      <Label htmlFor="topic">Topic</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {currentTopic || "Select a topic..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search topics..." />
            <CommandEmpty>No topic found.</CommandEmpty>
            {Array.isArray(debateTopics) && debateTopics.length > 0 ? (
              <CommandGroup>
                <CommandList>
                  {debateTopics.map((topic) => (
                    <CommandItem
                      key={topic.id}
                      value={topic.id}
                      onSelect={() => {
                        onTopicChange(topic.id);
                        setOpen(false);
                      }}
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
                </CommandList>
              </CommandGroup>
            ) : (
              <div className="py-6 text-center text-sm">
                No debate topics available
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TopicSelector;
