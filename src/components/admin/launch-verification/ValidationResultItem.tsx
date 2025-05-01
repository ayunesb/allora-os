
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

type Status = 'success' | 'error' | 'warning' | 'info';

export interface ValidationResultItem {
  name: string;
  status: Status;
  message: string;
  details?: string;
}

interface ValidationResultItemProps {
  item: ValidationResultItem;
}

export const ValidationResultItem: React.FC<ValidationResultItemProps> = ({ item }) => {
  const { name, status, message, details } = item;
  
  const statusIcon = () => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const statusBadge = () => {
    switch (status) {
      case 'success': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Success</Badge>;
      case 'error': return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Error</Badge>;
      case 'warning': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning</Badge>;
      case 'info': return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Info</Badge>;
    }
  };

  return (
    <div className="border rounded p-3 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {statusIcon()}
          <span className="font-medium">{name}</span>
        </div>
        {statusBadge()}
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">{message}</div>
      
      {details && (
        <div className="mt-1 text-xs bg-secondary/50 p-2 rounded">
          {details}
        </div>
      )}
    </div>
  );
};
