
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Loader2, Info } from "lucide-react";
import { useZapier } from "@/lib/zapier";
import { 
  onCampaignLaunched, 
  onNewLeadAdded, 
  onStrategyApproved,
  onLeadConverted,
  onRevenueMilestoneReached
} from "@/utils/zapierEventTriggers";
import { toast } from "sonner";

const ZapierReadinessTest = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const { triggerWorkflow } = useZapier();
  
  const testEvents = [
    {
      name: "Campaign Launch",
      handler: async () => {
        const result = await onCampaignLaunched({
          campaignTitle: "Test Launch Campaign",
          platform: "Facebook",
          owner: "QA Tester",
          campaignId: "test-123",
          companyId: "qa-company-123"
        });
        return result.success;
      }
    },
    {
      name: "Lead Added",
      handler: async () => {
        const result = await onNewLeadAdded({
          company: "Test Company Inc",
          leadName: "John Tester",
          source: "Website Form",
          leadId: "lead-test-123"
        });
        return result.success;
      }
    },
    {
      name: "Strategy Approved",
      handler: async () => {
        const result = await onStrategyApproved({
          strategyTitle: "Market Expansion Strategy",
          strategyId: "strat-test-123",
          companyId: "qa-company-123",
          approvedBy: "QA Administrator"
        });
        return result.success;
      }
    },
    {
      name: "Lead Converted",
      handler: async () => {
        const result = await onLeadConverted({
          leadId: "lead-test-123",
          leadName: "John Tester",
          conversionValue: 5000,
          companyId: "qa-company-123",
          convertedBy: "QA Sales Rep"
        });
        return result.success;
      }
    },
    {
      name: "Revenue Milestone",
      handler: async () => {
        const result = await onRevenueMilestoneReached({
          milestoneName: "First $10k",
          revenueAmount: 10000,
          companyId: "qa-company-123",
          milestoneId: "milestone-test-123"
        });
        return result.success;
      }
    },
    {
      name: "Custom Webhook",
      handler: async () => {
        // Test a direct webhook call
        try {
          const result = await triggerWorkflow(
            "https://hooks.zapier.com/hooks/catch/123456/test-hook/", // replace with actual test webhook
            "qa_test_event",
            { test: true, source: "QA Readiness Test" }
          );
          return result.success;
        } catch (error) {
          console.error("Custom webhook test error:", error);
          return false;
        }
      }
    }
  ];
  
  const runSingleTest = async (testName: string, handler: () => Promise<boolean>) => {
    setIsLoading(testName);
    try {
      const success = await handler();
      setTestResults(prev => ({ ...prev, [testName]: success }));
      if (success) {
        toast.success(`${testName} webhook test passed`);
      } else {
        toast.error(`${testName} webhook test failed`);
      }
    } catch (error) {
      console.error(`Error testing ${testName}:`, error);
      setTestResults(prev => ({ ...prev, [testName]: false }));
      toast.error(`${testName} webhook test failed with error`);
    } finally {
      setIsLoading(null);
    }
  };
  
  const runAllTests = async () => {
    toast.info("Running all Zapier webhook tests");
    for (const test of testEvents) {
      await runSingleTest(test.name, test.handler);
    }
    toast.info("All Zapier webhook tests completed");
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Zapier Integration Readiness
          <Badge variant={Object.values(testResults).every(Boolean) && Object.keys(testResults).length > 0 ? "success" : "outline"}>
            {Object.values(testResults).every(Boolean) && Object.keys(testResults).length > 0 ? "PASSING" : "UNTESTED"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Test all Zapier webhook integrations to ensure they fire correctly when business events occur
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Testing Instructions</AlertTitle>
          <AlertDescription>
            These tests will fire real Zapier webhooks. Ensure your Zaps are set to catch these test events or are in draft mode.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-3">
          {testEvents.map(test => (
            <div key={test.name} className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-3">
                {testResults[test.name] === true && <Check className="h-5 w-5 text-green-500" />}
                {testResults[test.name] === false && <AlertCircle className="h-5 w-5 text-red-500" />}
                <span>{test.name} Event</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                disabled={isLoading !== null}
                onClick={() => runSingleTest(test.name, test.handler)}
              >
                {isLoading === test.name ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test"
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {Object.keys(testResults).length > 0 && (
            <div className="text-sm">
              {Object.values(testResults).filter(Boolean).length}/{Object.keys(testResults).length} tests passing
            </div>
          )}
        </div>
        <Button 
          onClick={runAllTests} 
          disabled={isLoading !== null}
        >
          {isLoading === "all" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing All...
            </>
          ) : (
            "Test All Webhooks"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZapierReadinessTest;
