import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
export const StatusBadge = ({ status }) => {
    switch (status) {
        case 'success':
            return (<Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
          <CheckCircle className="h-3 w-3"/>
          Success
        </Badge>);
        case 'failed':
            return (<Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1">
          <AlertCircle className="h-3 w-3"/>
          Failed
        </Badge>);
        case 'pending':
            return (<Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
          <Clock className="h-3 w-3"/>
          Pending
        </Badge>);
        default:
            return (<Badge variant="outline">
          {status}
        </Badge>);
    }
};
export default StatusBadge;
