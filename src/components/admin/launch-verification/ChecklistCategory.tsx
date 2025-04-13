
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ChecklistItem } from './ChecklistItem';
import { ChecklistItem as ChecklistItemType, ChecklistCategory as ChecklistCategoryType } from './types';

interface ChecklistCategoryProps {
  category: ChecklistCategoryType;
}

export function ChecklistCategory({ category }: ChecklistCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Calculate status counts
  const completedCount = category.items.filter(item => item.status === 'completed').length;
  const warningCount = category.items.filter(item => item.status === 'warning').length;
  const errorCount = category.items.filter(item => item.status === 'error').length;
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-secondary/40 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div>
          <h3 className="font-medium text-lg">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-muted-foreground">{category.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">{completedCount}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{category.items.length}</span>
            
            {warningCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                {warningCount} warning{warningCount !== 1 ? 's' : ''}
              </span>
            )}
            
            {errorCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs">
                {errorCount} error{errorCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="divide-y">
          {category.items.map(item => (
            <ChecklistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
