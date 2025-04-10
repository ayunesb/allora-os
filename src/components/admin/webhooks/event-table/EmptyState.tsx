
import React from 'react';

interface EmptyStateProps {
  isLoading: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isLoading }) => {
  const message = isLoading 
    ? "Loading webhook event history..." 
    : "No webhook events found matching the current filters.";
    
  return (
    <div className="py-8 text-center text-muted-foreground">
      {message}
    </div>
  );
};
