
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { triggerBusinessEvent } from '@/lib/zapier';
import { BusinessEventType } from '@/utils/webhookTypes';

export default function ZapierWebhookDemo() {
  const { toast } = useToast();
  const [isLeadLoading, setIsLeadLoading] = useState(false);
  const [isStrategyLoading, setIsStrategyLoading] = useState(false);
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  
  const handleSendLeadEvent = async () => {
    setIsLeadLoading(true);
    try {
      const result = await triggerBusinessEvent('new_lead_added', {
        companyId: "demo-company-123",
        entityType: "lead",
        lead_name: "Demo Lead",
        source: "Zapier Demo",
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Lead event sent to Zapier webhook",
        });
      } else {
        throw new Error(result.message || "Failed to send lead event");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send lead event to Zapier",
        variant: "destructive",
      });
    } finally {
      setIsLeadLoading(false);
    }
  };
  
  const handleSendStrategyEvent = async () => {
    setIsStrategyLoading(true);
    try {
      const result = await triggerBusinessEvent('new_strategy_approved', {
        companyId: "demo-company-123",
        entityType: "strategy",
        strategy_title: "Expansion Strategy",
        suggested_by: "AI Executive Team",
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Strategy event sent to Zapier webhook",
        });
      } else {
        throw new Error(result.message || "Failed to send strategy event");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send strategy event to Zapier",
        variant: "destructive",
      });
    } finally {
      setIsStrategyLoading(false);
    }
  };
  
  const handleSendRevenueEvent = async () => {
    setIsRevenueLoading(true);
    try {
      const result = await triggerBusinessEvent('revenue_milestone', {
        companyId: "demo-company-123",
        entityType: "revenue",
        company_name: "Demo Company",
        amount: 100000,
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Revenue milestone event sent to Zapier webhook",
        });
      } else {
        throw new Error(result.message || "Failed to send revenue event");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send revenue event to Zapier",
        variant: "destructive",
      });
    } finally {
      setIsRevenueLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Zapier Webhooks</CardTitle>
        <CardDescription>
          Send test events to your Zapier webhooks to verify integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trigger actions when a new lead is added to the system
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSendLeadEvent} 
                disabled={isLeadLoading}
                className="w-full"
              >
                {isLeadLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : "Send Test Event"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Strategy Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trigger actions when a new business strategy is approved
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSendStrategyEvent} 
                disabled={isStrategyLoading}
                className="w-full"
              >
                {isStrategyLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : "Send Test Event"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trigger actions when a revenue milestone is achieved
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSendRevenueEvent} 
                disabled={isRevenueLoading}
                className="w-full"
              >
                {isRevenueLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : "Send Test Event"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
