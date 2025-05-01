
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  onCampaignLaunched,
  onNewLeadAdded,
  onStrategyApproved,
  BusinessEventType
} from '@/utils/zapierEventTriggers';

const ZapierReadinessTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastTriggered, setLastTriggered] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const triggerWebhook = async (eventType: BusinessEventType, data: Record<string, any>) => {
    const webhookUrl = localStorage.getItem('zapier_webhook_url');
    
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first", {
        description: "Go to the Configure tab to set up your webhook URL"
      });
      return false;
    }
    
    setIsLoading(true);
    setTestStatus('idle');
    setActiveTest(eventType);
    setError(null);
    
    try {
      let result = false;
      
      if (eventType === 'strategy_approved') {
        result = await onStrategyApproved({
          companyId: 'test-company-123',
          entityId: 'test-strategy-123',
          entityType: 'business_strategy',
          strategyName: 'Test Strategy',
          botName: 'CEO Bot',
          suggestedBy: 'Marketing Director',
          riskLevel: 'medium',
          timestamp: new Date().toISOString()
        });
      } else if (eventType === 'new_lead_added') {
        result = await onNewLeadAdded({
          leadId: 'test-lead-123',
          leadName: 'John Smith',
          company: 'Acme Corp',
          email: 'john.smith@example.com',
          source: 'Website Contact Form'
        });
      } else if (eventType === 'campaign_launched') {
        result = await onCampaignLaunched({
          campaignId: 'test-campaign-123',
          name: 'Summer Promotion',
          type: 'email',
          budget: 5000,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          targetAudience: 'Small Business Owners'
        });
      } else if (eventType === 'lead_converted') {
        // This is a generic test - use the triggerWebhook directly
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({
            eventType: 'lead_converted',
            data: {
              leadId: 'test-lead-123',
              leadName: 'Jane Smith',
              dealValue: 10000,
              dealType: 'annual subscription',
              conversionDate: new Date().toISOString()
            },
            timestamp: new Date().toISOString()
          })
        });
        result = true; // Assume success with no-cors mode
      } else if (eventType === 'revenue_milestone') {
        // This is a generic test - use the triggerWebhook directly
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({
            eventType: 'revenue_milestone',
            data: {
              companyId: 'test-company-123',
              milestone: 'first_10k_mrr',
              amount: 10000,
              currency: 'USD'
            },
            timestamp: new Date().toISOString()
          })
        });
        result = true; // Assume success with no-cors mode
      }
      
      if (result) {
        setTestStatus('success');
        setLastTriggered(new Date().toISOString());
        toast.success(`Test event sent to Zapier!`, {
          description: "Check your Zap to confirm it processed correctly."
        });
      } else {
        throw new Error("Failed to trigger webhook");
      }
      
      return result;
    } catch (error) {
      setTestStatus('error');
      setError(error instanceof Error ? error.message : String(error));
      toast.error("Failed to trigger webhook", {
        description: "There was an error sending the test event. Please check your configuration."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Your Zapier Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!localStorage.getItem('zapier_webhook_url') && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to configure your Zapier webhook URL in the Configure tab before testing.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-md p-4 relative">
            <h3 className="font-medium mb-2">Strategy Approved</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tests the webhook when a business strategy is approved.
            </p>
            <Button 
              onClick={() => triggerWebhook('strategy_approved', {})} 
              disabled={isLoading}
              size="sm"
              className="mt-2"
            >
              {isLoading && activeTest === 'strategy_approved' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Trigger Test'}
            </Button>
            {activeTest === 'strategy_approved' && testStatus === 'success' && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-4 relative">
            <h3 className="font-medium mb-2">New Lead Added</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tests the webhook when a new lead is created.
            </p>
            <Button 
              onClick={() => triggerWebhook('new_lead_added', {})} 
              disabled={isLoading}
              size="sm"
              className="mt-2"
            >
              {isLoading && activeTest === 'new_lead_added' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Trigger Test'}
            </Button>
            {activeTest === 'new_lead_added' && testStatus === 'success' && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-4 relative">
            <h3 className="font-medium mb-2">Campaign Launched</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tests the webhook when a marketing campaign is launched.
            </p>
            <Button 
              onClick={() => triggerWebhook('campaign_launched', {})} 
              disabled={isLoading}
              size="sm"
              className="mt-2"
            >
              {isLoading && activeTest === 'campaign_launched' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Trigger Test'}
            </Button>
            {activeTest === 'campaign_launched' && testStatus === 'success' && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
        </div>
        
        {lastTriggered && (
          <div className="text-sm text-muted-foreground mt-4">
            Last test sent: {new Date(lastTriggered).toLocaleString()}
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error: {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-muted rounded-md p-4 mt-4">
          <h3 className="font-medium mb-2 text-sm">How to verify your tests</h3>
          <p className="text-sm text-muted-foreground">
            After triggering these tests, you should check your Zap's task history in Zapier to confirm
            the webhook was received and processed correctly. If your Zap is properly configured, you
            should see the test event trigger the corresponding action.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZapierReadinessTest;
