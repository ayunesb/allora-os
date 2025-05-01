
import React from 'react';
import { AlertCircle, Search, Loader2 } from "lucide-react";

interface EmptyStateProps {
  isLoading?: boolean;
  filtered?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isLoading = false, filtered = false }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading webhook events...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30">
      {filtered ? (
        <>
          <Search className="h-8 w-8 text-muted-foreground mb-4" />
          <p className="font-medium">No matching webhook events found</p>
          <p className="text-muted-foreground text-center mt-1">
            Try adjusting your search or filters
          </p>
        </>
      ) : (
        <>
          <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
          <p className="font-medium">No webhook events</p>
          <p className="text-muted-foreground text-center mt-1">
            Webhook events will appear here once they are triggered
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
