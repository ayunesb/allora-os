
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChecklistItem as ChecklistItemType } from './types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onCheckItem: (id: string, checked: boolean) => void;
}

export function ChecklistItemComponent({ item, onCheckItem }: ChecklistItemProps) {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex items-start space-x-2 py-2">
      <Checkbox 
        id={item.id} 
        checked={item.checked} 
        onCheckedChange={(checked) => onCheckItem(item.id, checked === true)}
        className="mt-1"
      />
      <div className="space-y-1 flex-1">
        <label 
          htmlFor={item.id}
          className="font-medium cursor-pointer text-sm flex justify-between"
        >
          <span>{item.label}</span>
          <Badge variant="outline" className={getSeverityClass(item.severity)}>
            {item.severity}
          </Badge>
        </label>
        {item.description && (
          <p className="text-muted-foreground text-xs">{item.description}</p>
        )}
      </div>
    </div>
  );
}
