
import React from 'react';
import { Button } from "@/components/ui/button";
import { Database, ListChecks, Zap, Lock, FileCode } from 'lucide-react';

interface VerificationActionsProps {
  isChecking: boolean;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  onRunChecks: () => void;
  onAddDemoData: () => void;
  onVerifyTables: () => void;
  onCheckIndexes: () => void;
  onVerifyRLS: () => void;
  onVerifyFunctions: () => void;
  hasResults: boolean;
}

export function VerificationActions({
  isChecking,
  isAddingDemo,
  isVerifyingTables,
  isCheckingIndexes,
  isVerifyingRLS,
  isVerifyingFunctions,
  onRunChecks,
  onAddDemoData,
  onVerifyTables,
  onCheckIndexes,
  onVerifyRLS,
  onVerifyFunctions,
  hasResults,
}: VerificationActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={onRunChecks} 
        disabled={isChecking}
        className="w-full sm:w-auto"
      >
        {isChecking ? 'Checking...' : hasResults ? 'Run Checks Again' : 'Run Pre-Launch Checks'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onAddDemoData}
        disabled={isAddingDemo}
        className="w-full sm:w-auto"
      >
        <Database className="mr-2 h-4 w-4" />
        {isAddingDemo ? 'Adding...' : 'Add Demo Data'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onVerifyTables}
        disabled={isVerifyingTables}
        className="w-full sm:w-auto"
      >
        <ListChecks className="mr-2 h-4 w-4" />
        {isVerifyingTables ? 'Verifying...' : 'Verify Tables'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onCheckIndexes}
        disabled={isCheckingIndexes}
        className="w-full sm:w-auto"
      >
        <Zap className="mr-2 h-4 w-4" />
        {isCheckingIndexes ? 'Checking...' : 'Verify Indexes'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onVerifyRLS}
        disabled={isVerifyingRLS}
        className="w-full sm:w-auto"
      >
        <Lock className="mr-2 h-4 w-4" />
        {isVerifyingRLS ? 'Verifying...' : 'Verify RLS'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onVerifyFunctions}
        disabled={isVerifyingFunctions}
        className="w-full sm:w-auto"
      >
        <FileCode className="mr-2 h-4 w-4" />
        {isVerifyingFunctions ? 'Checking...' : 'Verify Functions'}
      </Button>
    </div>
  );
}
