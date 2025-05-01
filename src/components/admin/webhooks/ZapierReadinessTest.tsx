import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useZapier } from '@/lib/zapier';
import { 
  onCampaignLaunched,
  onNewLeadAdded,
  onStrategyApproved,
  onLeadConverted,
  onRevenueMilestoneReached
} from '@/utils/zapierEventTriggers';

export default function ZapierReadinessTest() {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Record<string, boolean | null>>({
    campaign: null,
    lead: null,
    strategy: null,
    conversion: null,
    revenue: null
  });
  const [isUrlSet, setIsUrlSet] = useState<boolean>(false);
  
  // Load webhook URL from localStorage
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem('zapier_webhook_url');
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
      setIsUrlSet(true);
    }
  }, []);
  
  const handleCampaignTest = async () => {
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first");
      return;
    }
    
    setIsLoading(true);
    setResults(prev => ({ ...prev, campaign: null }));
    
    try {
      // Test campaign webhook
      const campaign = {
        campaignId: 'test-campaign-' + Date.now(),
        campaignTitle: 'Test Campaign',
        platform: 'Facebook',
        owner: 'Test User',
        companyId: 'demo-company',
        budget: 1000
      };
      
      const result = await onCampaignLaunched(webhookUrl, campaign);
      
      const success = result.success;
      if (success) {
        toast.success("Test event sent successfully");
      } else {
        toast.error(`Failed to send test event: ${result.message || 'Unknown error'}`);
      }
      
      setResults(prev => ({ ...prev, campaign: success }));
    } catch (error) {
      console.error('Error testing campaign webhook:', error);
      setResults(prev => ({ ...prev, campaign: false }));
      toast.error("Campaign webhook test failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLeadTest = async () => {
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first");
      return;
    }
    
    setIsLoading(true);
    setResults(prev => ({ ...prev, lead: null }));
    
    try {
      // Test lead webhook
      const lead = {
        leadId: 'test-lead-' + Date.now(),
        leadName: 'Test Lead',
        company: 'ACME Inc',
        email: 'test@example.com',
        source: 'Website'
      };
      
      const result = await onNewLeadAdded(webhookUrl, lead);
      
      const success = result.success;
      if (success) {
        toast.success("Lead webhook test successful");
      } else {
        toast.error("Lead webhook test failed");
      }
      
      setResults(prev => ({ ...prev, lead: success }));
    } catch (error) {
      console.error('Error testing lead webhook:', error);
      setResults(prev => ({ ...prev, lead: false }));
      toast.error("Lead webhook test failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStrategyTest = async () => {
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first");
      return;
    }
    
    setIsLoading(true);
    setResults(prev => ({ ...prev, strategy: null }));
    
    try {
      // Test strategy webhook
      const strategy = {
        strategyId: 'test-strategy-' + Date.now(),
        strategyTitle: 'Market Expansion Strategy',
        companyId: 'demo-company',
        approvedBy: 'AI CEO'
      };
      
      const result = await onStrategyApproved(webhookUrl, strategy);
      
      const success = result.success;
      if (success) {
        toast.success("Strategy approved event sent successfully");
      } else {
        toast.error(`Failed to send strategy approved event: ${result.message || 'Unknown error'}`);
      }
      
      setResults(prev => ({ ...prev, strategy: success }));
    } catch (error) {
      console.error('Error testing strategy webhook:', error);
      setResults(prev => ({ ...prev, strategy: false }));
      toast.error("Strategy webhook test failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConversionTest = async () => {
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first");
      return;
    }
    
    setIsLoading(true);
    setResults(prev => ({ ...prev, conversion: null }));
    
    try {
      // Test conversion webhook
      const lead = {
        leadId: 'test-lead-' + Date.now(),
        leadName: 'Test Converted Lead',
        company: 'Converted Inc',
        email: 'converted@example.com',
        source: 'Website'
      };
      
      const result = await onLeadConverted(webhookUrl, lead);
      
      const success = result.success;
      if (success) {
        toast.success("Conversion webhook test successful");
      } else {
        toast.error("Conversion webhook test failed");
      }
      
      setResults(prev => ({ ...prev, conversion: success }));
    } catch (error) {
      console.error('Error testing conversion webhook:', error);
      setResults(prev => ({ ...prev, conversion: false }));
      toast.error("Conversion webhook test failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRevenueTest = async () => {
    if (!webhookUrl) {
      toast.error("Please configure your Zapier webhook URL first");
      return;
    }
    
    setIsLoading(true);
    setResults(prev => ({ ...prev, revenue: null }));
    
    try {
      // Test revenue milestone webhook
      const revenue = {
        companyId: 'demo-company',
        milestone: '100k',
        amount: 100000,
        currency: 'USD',
        achieved: new Date().toISOString()
      };
      
      const result = await onRevenueMilestoneReached(webhookUrl, revenue);
      
      const success = result.success;
      if (success) {
        toast.success("Revenue milestone webhook test successful");
      } else {
        toast.error("Revenue milestone webhook test failed");
      }
      
      setResults(prev => ({ ...prev, revenue: success }));
    } catch (error) {
      console.error('Error testing revenue webhook:', error);
      setResults(prev => ({ ...prev, revenue: false }));
      toast.error("Revenue milestone webhook test failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        {!isUrlSet ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Zapier webhook URL is not configured. Please go to the "Configure" tab to set it up.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Zapier webhook URL is configured. You can test the webhooks below.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="text-sm font-medium">Campaign Created Event</h3>
              <p className="text-xs text-muted-foreground">
                Triggers when a new marketing campaign is created
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleCampaignTest} 
              disabled={isLoading || !isUrlSet}
              variant={results.campaign === true ? "success" : results.campaign === false ? "destructive" : "outline"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Trigger"
              )}
            </Button>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="text-sm font-medium">New Lead Added Event</h3>
              <p className="text-xs text-muted-foreground">
                Triggers when a new sales lead is added
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleLeadTest}
              disabled={isLoading || !isUrlSet} 
              variant={results.lead === true ? "success" : results.lead === false ? "destructive" : "outline"}
            >
              Test Trigger
            </Button>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="text-sm font-medium">Strategy Approved Event</h3>
              <p className="text-xs text-muted-foreground">
                Triggers when a business strategy is approved
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleStrategyTest} 
              disabled={isLoading || !isUrlSet}
              variant={results.strategy === true ? "success" : results.strategy === false ? "destructive" : "outline"}
            >
              Test Trigger
            </Button>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="text-sm font-medium">Lead Conversion Event</h3>
              <p className="text-xs text-muted-foreground">
                Triggers when a lead is converted to a customer
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleConversionTest} 
              disabled={isLoading || !isUrlSet}
              variant={results.conversion === true ? "success" : results.conversion === false ? "destructive" : "outline"}
            >
              Test Trigger
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Revenue Milestone Event</h3>
              <p className="text-xs text-muted-foreground">
                Triggers when a revenue milestone is reached
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleRevenueTest} 
              disabled={isLoading || !isUrlSet}
              variant={results.revenue === true ? "success" : results.revenue === false ? "destructive" : "outline"}
            >
              Test Trigger
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
