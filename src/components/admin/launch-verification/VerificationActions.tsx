import React from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  RefreshCw,
  Database,
  Table2,
  Lock,
  Code,
} from "lucide-react";
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
  hasVerifiedTables,
  hasVerifiedIndexes,
  hasVerifiedRLS,
  hasVerifiedFunctions,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={onRunChecks}
        disabled={isChecking}
        variant={hasResults ? "outline" : "default"}
        size="sm"
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${isChecking ? "animate-spin" : ""}`}
        />
        {isChecking
          ? "Running Checks..."
          : hasResults
            ? "Re-run Checks"
            : "Run All Checks"}
      </Button>

      {onAddDemoData && (
        <Button
          onClick={onAddDemoData}
          disabled={isAddingDemo}
          variant="outline"
          size="sm"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isAddingDemo ? "Adding Data..." : "Add Demo Data"}
        </Button>
      )}

      {onVerifyTables && (
        <Button
          onClick={onVerifyTables}
          disabled={isVerifyingTables}
          variant="outline"
          size="sm"
          className={
            hasVerifiedTables
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : ""
          }
        >
          <Table2 className="mr-2 h-4 w-4" />
          {isVerifyingTables ? "Checking Tables..." : "Verify Tables"}
        </Button>
      )}

      {onCheckIndexes && (
        <Button
          onClick={onCheckIndexes}
          disabled={isCheckingIndexes}
          variant="outline"
          size="sm"
          className={
            hasVerifiedIndexes
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : ""
          }
        >
          <Database className="mr-2 h-4 w-4" />
          {isCheckingIndexes ? "Checking Indexes..." : "Check Indexes"}
        </Button>
      )}

      {onVerifyRLS && (
        <Button
          onClick={onVerifyRLS}
          disabled={isVerifyingRLS}
          variant="outline"
          size="sm"
          className={
            hasVerifiedRLS
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : ""
          }
        >
          <Lock className="mr-2 h-4 w-4" />
          {isVerifyingRLS ? "Checking RLS..." : "Verify RLS"}
        </Button>
      )}

      {onVerifyFunctions && (
        <Button
          onClick={onVerifyFunctions}
          disabled={isVerifyingFunctions}
          variant="outline"
          size="sm"
          className={
            hasVerifiedFunctions
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : ""
          }
        >
          <Code className="mr-2 h-4 w-4" />
          {isVerifyingFunctions ? "Checking Functions..." : "Verify Functions"}
        </Button>
      )}
    </div>
  );
}
