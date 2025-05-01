
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem } from './ChecklistItem';
import type { ChecklistCategory as ChecklistCategoryType } from './types';

interface ChecklistCategoryProps {
  category: ChecklistCategoryType;
}

export function ChecklistCategory({ category }: ChecklistCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="border rounded-md">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50"
        onClick={toggleExpanded}
      >
        <div>
          <h3 className="font-medium text-lg">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
        <button className="p-1">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="border-t divide-y">
          {category.items.map(item => (
            <ChecklistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
