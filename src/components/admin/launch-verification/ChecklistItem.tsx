
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink 
} from 'lucide-react';
import { ChecklistItem as ItemType } from './types';

interface ChecklistItemProps {
  item: ItemType;
}

export function ChecklistItem({ item }: ChecklistItemProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getStatusColor = () => {
    switch (item.status) {
      case 'completed':
        return 'text-green-600';
      case 'warning':
        return 'text-amber-600';
      case 'error':
        return 'text-red-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
      default:
        return 'text-gray-600';
    }
  };
  
  const getStatusText = () => {
    switch (item.status) {
      case 'completed':
        return 'Completed';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
      default:
        return 'Pending';
    }
  };
  
  return (
    <div className={`border rounded-md p-3 ${item.status === 'error' ? 'border-red-200 bg-red-50' : 'border-border'}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{item.name}</span>
              {item.isRequired && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  Required
                </span>
              )}
            </div>
            <span className={`text-sm ${getStatusColor()}`}>{getStatusText()}</span>
          </div>
          
          {item.statusMessage && (
            <p className="text-sm text-muted-foreground mt-1">
              {item.statusMessage}
            </p>
          )}
          
          {item.details && item.details.length > 0 && (
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-xs flex items-center hover:bg-transparent text-muted-foreground"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" /> 
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" /> 
                    View Details
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {expanded && item.details && item.details.length > 0 && (
        <Alert className="mt-3 text-sm">
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1">
              {item.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {(item.status === 'warning' || item.status === 'error') && (
        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
            <ExternalLink className="h-3 w-3" /> 
            Learn More
          </Button>
        </div>
      )}
    </div>
  );
}
