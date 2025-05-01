
import React from 'react';
import { Check, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface ValidationResultItemProps {
  name: string;
  result: ValidationResult;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'error'; // Add status property
}

export function ValidationResultItem({ name, result, icon, status }: ValidationResultItemProps) {
  const { valid, message } = result;
  
  const StatusIcon = () => {
    if (valid) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  // Determine badge variant based on status or valid state
  const badgeVariant = status === 'warning' ? 'outline' : 
                      status === 'error' || !valid ? 'destructive' : 
                      'success';

  return (
    <Card className={valid ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {icon || <StatusIcon />}
          </div>
          <div>
            <h4 className="text-sm font-medium capitalize">{name.replace(/([A-Z])/g, ' $1').trim()}</h4>
            <p className="text-xs text-muted-foreground">{message}</p>
          </div>
        </div>
        <Badge variant={badgeVariant as any}>
          {valid ? "Passed" : "Failed"}
        </Badge>
      </CardContent>
    </Card>
  );
}
