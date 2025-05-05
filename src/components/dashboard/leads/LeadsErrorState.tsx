import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
export const LeadsErrorState = ({ onRetry }) => {
    return (<div className="space-y-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4"/>
        <AlertTitle>Error loading leads</AlertTitle>
        <AlertDescription>
          There was a problem loading your leads data. Please try refreshing the page or contact support.
        </AlertDescription>
      </Alert>
      <Button onClick={onRetry}>Retry</Button>
    </div>);
};
