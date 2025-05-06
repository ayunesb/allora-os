import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { upgradeAllExecutiveBots } from "@/utils/executive-os/integrationService";
import { executiveBots } from "@/backend/executiveBots";
import { ArrowUpCircle, CheckCircle, AlertCircle } from "lucide-react";
import { formatRoleTitle } from "@/utils/consultation/botRoleUtils";
import { toast } from "sonner";
export function UpgradeAllExecutives({ onUpgradeComplete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [upgradedCount, setUpgradedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // Format executives for upgrade
  const getAllExecutives = () => {
    const executives = [];
    for (const [role, names] of Object.entries(executiveBots)) {
      for (const name of names) {
        executives.push({
          name,
          role: formatRoleTitle(role),
        });
      }
    }
    return executives;
  };
  const handleUpgradeAll = async () => {
    setIsLoading(true);
    setProgress(0);
    setUpgradedCount(0);
    setFailedCount(0);
    setIsComplete(false);
    try {
      const executives = getAllExecutives();
      const totalExecutives = executives.length;
      // Simulate incremental progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 85 / totalExecutives;
        });
      }, 800);
      // Perform the actual upgrade
      const result = await upgradeAllExecutiveBots(executives);
      clearInterval(progressInterval);
      setProgress(100);
      setUpgradedCount(result.success);
      setFailedCount(result.failed);
      setIsComplete(true);
      if (onUpgradeComplete && result.upgraded.length > 0) {
        onUpgradeComplete(result.upgraded);
      }
      toast.success(`Upgraded ${result.success} executives`, {
        description:
          result.failed > 0
            ? `${result.failed} executives could not be upgraded`
            : "All executives successfully integrated with Executive OS",
      });
    } catch (error) {
      console.error("Error upgrading all bots:", error);
      toast.error("Upgrade process failed", {
        description: "An unexpected error occurred during the upgrade process.",
      });
      setProgress(0);
      setIsComplete(true);
    } finally {
      setIsLoading(false);
    }
  };
  const resetUpgrade = () => {
    setProgress(0);
    setUpgradedCount(0);
    setFailedCount(0);
    setIsComplete(false);
  };
  return (
    <Card className="border border-primary/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Executive OS Integration
        </CardTitle>
        <CardDescription>
          Upgrade all AI executives with enhanced cognitive capabilities
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        {isComplete ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              {failedCount === 0 ? (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-8 w-8" />
                  <span className="text-xl font-medium">Complete</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertCircle className="h-8 w-8" />
                  <span className="text-xl font-medium">
                    Partially Complete
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {upgradedCount}
                </div>
                <div className="text-sm text-muted-foreground">Upgraded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {failedCount}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                All upgraded executives now have Enhanced Executive OS
                capabilities including First Principles Thinking, OODA Loop, and
                Decision Frameworks.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Integration Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thinking Models</span>
                <span className="font-medium">First Principles, OODA Loop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Decision Framework
                </span>
                <span className="font-medium">
                  3x3 Priorities, Eisenhower Matrix
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delegation System</span>
                <span className="font-medium">5 Levels (Default: Level 3)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mental Models</span>
                <span className="font-medium">Custom Per Executive</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {isComplete ? (
          <Button className="w-full" variant="outline" onClick={resetUpgrade}>
            Reset
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="default"
            disabled={isLoading}
            onClick={handleUpgradeAll}
          >
            {isLoading ? (
              <>
                <ArrowUpCircle className="mr-2 h-4 w-4 animate-spin" />
                Upgrading All Executives...
              </>
            ) : (
              <>
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                Upgrade All Executives
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
