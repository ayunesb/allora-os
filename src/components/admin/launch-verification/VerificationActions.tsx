
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface VerificationActionsProps {
  isChecking: boolean;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  onRunChecks: () => Promise<void>;
  onAddDemoData: () => Promise<void>;
  onVerifyTables: () => Promise<void>;
  onCheckIndexes: () => Promise<void>;
  onVerifyRLS: () => Promise<void>;
  onVerifyFunctions: () => Promise<void>;
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
  hasResults
}: VerificationActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        onClick={onRunChecks} 
        disabled={isChecking || isAddingDemo || isVerifyingTables || isCheckingIndexes || isVerifyingRLS || isVerifyingFunctions}
      >
        {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isChecking ? 'Running Checks...' : 'Run All Checks'}
      </Button>
      
      {hasResults && (
        <>
          <Button
            variant="outline"
            onClick={onVerifyTables}
            disabled={isChecking || isAddingDemo || isVerifyingTables}
          >
            {isVerifyingTables && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isVerifyingTables ? 'Verifying...' : 'Verify Tables'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onCheckIndexes}
            disabled={isChecking || isAddingDemo || isCheckingIndexes}
          >
            {isCheckingIndexes && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isCheckingIndexes ? 'Checking...' : 'Check Indexes'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onAddDemoData}
            disabled={isChecking || isAddingDemo}
          >
            {isAddingDemo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isAddingDemo ? 'Adding Demo Data...' : 'Add Demo Data'}
          </Button>
        </>
      )}
    </div>
  );
}
