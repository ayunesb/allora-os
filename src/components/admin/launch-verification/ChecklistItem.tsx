
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { ChecklistItem as ChecklistItemType } from './types';

interface ChecklistItemProps {
  item: ChecklistItemType;
}

export function ChecklistItem({ item }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Map status to icon and color
  const getStatusInfo = () => {
    switch (item.status) {
      case 'completed':
        return { 
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          textColor: 'text-green-600'
        };
      case 'warning':
        return { 
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          textColor: 'text-amber-600'
        };
      case 'in-progress':
        return { 
          icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
          textColor: 'text-blue-600'
        };
      case 'error':
        return { 
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          textColor: 'text-red-600'
        };
      case 'pending':
      default:
        return { 
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          textColor: 'text-gray-500'
        };
    }
  };
  
  const { icon, textColor } = getStatusInfo();
  
  return (
    <div className="border-b last:border-b-0 py-3">
      <div className="flex items-start gap-3 px-4">
        <div className="pt-0.5">
          {icon}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
            
            {(item.status === 'error' || item.status === 'warning') && item.statusMessage && (
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn("text-xs", textColor)}
                onClick={toggleExpanded}
              >
                {isExpanded ? "Hide Details" : "Show Details"}
              </Button>
            )}
          </div>
          
          {/* Status message and details */}
          {item.statusMessage && (
            <div className={cn("text-sm mt-1", textColor)}>
              {item.statusMessage}
            </div>
          )}
          
          {item.details && isExpanded && (
            <div className="mt-2 p-3 bg-muted/50 rounded-md text-sm">
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {item.details}
              </pre>
            </div>
          )}
        </div>
        
        {/* Required badge for required items */}
        {item.isRequired && (
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Required
          </div>
        )}
      </div>
    </div>
  );
}
