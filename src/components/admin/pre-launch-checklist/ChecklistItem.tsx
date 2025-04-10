
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ChecklistItem as ChecklistItemType } from '@/hooks/admin/usePreLaunchChecklist';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  return (
    <div 
      className={`flex items-center justify-between p-2 rounded-md ${
        item.completed ? 'bg-green-500/5' : item.critical ? 'bg-yellow-500/5' : 'bg-secondary/40'
      }`}
    >
      <div className="flex items-center gap-2">
        {item.completed ? 
          <Check className="h-5 w-5 text-green-500" /> : 
          item.critical ? 
            <AlertCircle className="h-5 w-5 text-yellow-500" /> : 
            <div className="h-5 w-5 border border-gray-300 rounded-md" />
        }
        <div>
          <div className="text-sm font-medium">{item.task}</div>
          <div className="text-xs text-muted-foreground">{item.category}</div>
        </div>
      </div>
      <Button 
        variant={item.completed ? "outline" : "default"} 
        size="sm"
        onClick={() => onToggle(item.id)}
      >
        {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
    </div>
  );
}
