
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, XCircle } from 'lucide-react';
import { DatabaseCheckItem, DatabaseChecksSectionProps } from './types';

export function DatabaseChecksSection({ title, items }: DatabaseChecksSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item: DatabaseCheckItem, index: number) => (
            <div 
              key={`${item.name}-${index}`} 
              className={`p-3 rounded-md flex items-center justify-between ${
                item.status === 'success' 
                  ? 'bg-green-50 border border-green-100' 
                  : item.status === 'warning'
                  ? 'bg-amber-50 border border-amber-100'
                  : 'bg-red-50 border border-red-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getStatusIcon(item.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.message || (item.exists ? 'Found' : 'Not found')}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : item.status === 'warning'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.status === 'success' ? 'Passed' : item.status === 'warning' ? 'Warning' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
