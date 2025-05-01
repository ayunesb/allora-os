
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  RefreshCcw, 
  Play, 
  AlertCircle, 
  CheckCircle, 
  CheckCircle2, 
  FunctionSquare 
} from 'lucide-react';

export interface VerificationActionsProps {
  onRefresh: () => void;
  onLaunch: () => void;
  isLoading: boolean;
  canLaunch: boolean;
}

export function VerificationActions({ onRefresh, onLaunch, isLoading, canLaunch }: VerificationActionsProps) {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={onRefresh}
        variant="outline"
        disabled={isLoading}
        size="sm"
        className="gap-2"
      >
        <RefreshCcw className="h-4 w-4" />
        <span>Refresh</span>
      </Button>
      
      <Button
        onClick={onLaunch}
        variant="default"
        disabled={!canLaunch || isLoading}
        size="sm"
        className="gap-2"
      >
        <Play className="h-4 w-4" />
        <span>Launch</span>
      </Button>
    </div>
  );
}
