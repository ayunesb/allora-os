
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  RefreshCw, 
  Database, 
  Table2, 
  KeyRound, 
  Functions, 
  Fingerprint
} from "lucide-react";

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
  hasResults
}: VerificationActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="default"
        onClick={onRunChecks}
        disabled={isChecking}
      >
        {isChecking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running Checks...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            {hasResults ? 'Run Checks Again' : 'Run All Checks'}
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onVerifyTables}
        disabled={isVerifyingTables || isChecking}
      >
        {isVerifyingTables ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Table2 className="mr-2 h-4 w-4" />
            Verify Tables
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onCheckIndexes}
        disabled={isCheckingIndexes || isChecking}
      >
        {isCheckingIndexes ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Database className="mr-2 h-4 w-4" />
            Check Indexes
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onVerifyRLS}
        disabled={isVerifyingRLS || isChecking}
      >
        {isVerifyingRLS ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <KeyRound className="mr-2 h-4 w-4" />
            Verify RLS Policies
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onVerifyFunctions}
        disabled={isVerifyingFunctions || isChecking}
      >
        {isVerifyingFunctions ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Functions className="mr-2 h-4 w-4" />
            Verify Functions
          </>
        )}
      </Button>
      
      <Button 
        variant="outline"
        onClick={onAddDemoData}
        disabled={isAddingDemo || isChecking}
      >
        {isAddingDemo ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Data...
          </>
        ) : (
          <>
            <Fingerprint className="mr-2 h-4 w-4" />
            Add Demo Data
          </>
        )}
      </Button>
    </div>
  );
}
