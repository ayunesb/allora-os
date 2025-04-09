
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Lead } from '@/models/lead';

type LeadStatusBadgeProps = {
  status: Lead['status'];
};

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: Lead['status']) => {
    switch(status) {
      case 'new': return 'bg-blue-500/10 text-blue-500';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-500';
      case 'qualified': return 'bg-green-500/10 text-green-500';
      case 'closed': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
