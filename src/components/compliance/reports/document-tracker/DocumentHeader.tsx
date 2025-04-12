
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock } from 'lucide-react';

interface DocumentHeaderProps {
  onCheckForUpdates: () => void;
  isCheckingUpdates: boolean;
  lastChecked: Date | null;
}

export default function DocumentHeader({
  onCheckForUpdates,
  isCheckingUpdates,
  lastChecked
}: DocumentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
      <div>
        <h2 className="text-xl font-semibold">Legal Document Tracker</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and update your compliance documents
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {lastChecked ? (
            <span>Last checked: {lastChecked.toLocaleString()}</span>
          ) : (
            <span>Not checked yet</span>
          )}
        </div>
        <Button
          onClick={onCheckForUpdates}
          disabled={isCheckingUpdates}
          size="sm"
        >
          {isCheckingUpdates ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Checking for updates...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Check for updates
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
