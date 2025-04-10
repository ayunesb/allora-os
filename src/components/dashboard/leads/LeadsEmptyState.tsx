
import React from 'react';

export const LeadsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">
        Leads data will be displayed here. Please check the admin panel for full leads management.
      </p>
    </div>
  );
};
