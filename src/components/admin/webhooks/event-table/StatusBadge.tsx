
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let variant: "default" | "destructive" | "outline" = "outline";
  let icon = null;
  
  switch(status) {
    case 'success':
      variant = "default";
      icon = <Check className="h-3 w-3 mr-1" />;
      break;
    case 'error':
      variant = "destructive";
      icon = <X className="h-3 w-3 mr-1" />;
      break;
    default:
      variant = "outline";
      break;
  }
  
  return (
    <Badge variant={variant} className="flex items-center capitalize">
      {icon}
      {status}
    </Badge>
  );
};
