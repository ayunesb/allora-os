
import React from 'react';
import { CalendarIcon, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface ViewToggleProps {
  view: 'calendar' | 'list';
  onViewChange: (value: 'calendar' | 'list') => void;
  postCount: number;
}

export function ViewToggle({ view, onViewChange, postCount }: ViewToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <Tabs value={view} onValueChange={onViewChange}>
        <TabsList>
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            List
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {postCount > 0 && (
        <Badge variant="outline">
          {postCount} post{postCount !== 1 ? 's' : ''}
        </Badge>
      )}
    </div>
  );
}
