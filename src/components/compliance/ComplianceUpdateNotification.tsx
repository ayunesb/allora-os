import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompliance } from "@/context/ComplianceContext";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ComplianceUpdateNotification({ className }) {
  const { pendingUpdates, applyAllUpdates, isApplyingUpdate } = useCompliance();
  const navigate = useNavigate();
  // We only show this component if there are pending updates
  if (pendingUpdates.length === 0) return null;
  return (
    <div
      className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 ${className}`}
    >
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-amber-800 dark:text-amber-300">
            Compliance Updates Available
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
            {`${pendingUpdates.length} document${pendingUpdates.length > 1 ? "s" : ""} require${pendingUpdates.length === 1 ? "s" : ""} updates to stay compliant with the latest regulatory changes.`}
          </p>
          <div className="mt-3 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30"
              onClick={() => navigate("/compliance/reports")}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={applyAllUpdates}
              disabled={isApplyingUpdate}
            >
              {isApplyingUpdate ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Apply All Updates"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
