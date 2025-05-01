
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CheckItem {
  name: string;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

interface DatabaseChecksSectionProps {
  title: string;
  items: CheckItem[];
}

export function DatabaseChecksSection({ title, items }: DatabaseChecksSectionProps) {
  return (
    <div className="bg-muted/50 rounded-md p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md">
            <div className="flex items-center gap-2">
              {item.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
              {item.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              {item.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
              <span>{item.name}</span>
            </div>
            {item.message && (
              <span className="text-xs text-muted-foreground">
                {item.message}
              </span>
            )}
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-2 text-muted-foreground">
            No checks available
          </div>
        )}
      </div>
    </div>
  );
}
