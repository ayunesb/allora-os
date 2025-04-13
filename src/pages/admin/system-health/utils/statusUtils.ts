
/**
 * Utility functions for status display in system health components
 */

import { CheckCircle2, Activity, XCircle } from 'lucide-react';
import React from 'react';

// Get the icon component for a specific status
export const getStatusIcon = (status: 'healthy' | 'degraded' | 'down') => {
  switch (status) {
    case 'healthy':
      return React.createElement(CheckCircle2, { className: "h-5 w-5 text-green-500" });
    case 'degraded':
      return React.createElement(Activity, { className: "h-5 w-5 text-amber-500" });
    case 'down':
      return React.createElement(XCircle, { className: "h-5 w-5 text-red-500" });
    default:
      return null;
  }
};

// Get CSS class for status indicator
export const getStatusColorClass = (status: 'healthy' | 'degraded' | 'down') => {
  switch (status) {
    case 'healthy':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'degraded':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'down':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return '';
  }
};

// Get status description
export const getStatusDescription = (status: 'healthy' | 'degraded' | 'down') => {
  switch (status) {
    case 'healthy':
      return 'All systems operational';
    case 'degraded':
      return 'Some services degraded';
    case 'down':
      return 'Critical services down';
    default:
      return '';
  }
};
