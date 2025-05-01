
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { onStrategyApproved, onNewLeadAdded, onCampaignLaunched } from "@/utils/zapierEventTriggers";
import { 
  StrategyApprovalPayload, 
  LeadPayload, 
  CampaignPayload 
} from '@/utils/webhookTypes';

const ZapierReadinessTest: React.FC = () => {
  const [testingStrategy, setTestingStrategy] = useState(false);
  const [testingLead, setTestingLead] = useState(false);
  const [testingCampaign, setTestingCampaign] = useState(false);
  
  const [strategyResult, setStrategyResult] = useState<boolean | null>(null);
  const [leadResult, setLeadResult] = useState<boolean | null>(null);
  const [campaignResult, setCampaignResult] = useState<boolean | null>(null);
  
  const handleTestStrategy = async () => {
    setTestingStrategy(true);
    setStrategyResult(null);
    
    try {
      // Create a test strategy payload
      const strategyPayload: StrategyApprovalPayload = {
        entityId: 'strat-' + Date.now(),
        entityType: 'strategy',
        strategyName: 'Market Expansion Strategy',
        companyId: 'test-company',
        botName: 'AI CEO',
        suggestedBy: 'AI CEO',
        riskLevel: 'Medium',
        timestamp: new Date().toISOString(),
      };
      
      const result = await onStrategyApproved(strategyPayload);
      
      if (result.success) {
        toast.success('Strategy approval webhook triggered successfully');
        setStrategyResult(true);
      } else {
        toast.error(`Strategy webhook test failed: ${result.error ? (result.error instanceof Error ? result.error.message : String(result.error)) : 'Unknown error'}`);
        setStrategyResult(false);
      }
    } catch (error) {
      console.error('Error testing strategy webhook:', error);
      toast.error(`Error testing strategy webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStrategyResult(false);
    } finally {
      setTestingStrategy(false);
    }
  };
  
  const handleTestLeadAdded = async () => {
    setTestingLead(true);
    setLeadResult(null);
    
    try {
      // Create a test lead payload
      const leadPayload: LeadPayload = {
        leadId: 'lead-' + Date.now(),
        leadName: 'John Doe',
        company: 'Test Company',
        source: 'Website Form',
        email: 'john@example.com'
      };
      
      const result = await onNewLeadAdded(leadPayload);
      
      if (result.success) {
        toast.success('Lead added webhook triggered successfully');
        setLeadResult(true);
      } else {
        toast.error(`Lead webhook test failed: ${result.error ? (result.error instanceof Error ? result.error.message : String(result.error)) : 'Unknown error'}`);
        setLeadResult(false);
      }
    } catch (error) {
      console.error('Error testing lead webhook:', error);
      toast.error(`Error testing lead webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLeadResult(false);
    } finally {
      setTestingLead(false);
    }
  };
  
  const handleTestCampaign = async () => {
    setTestingCampaign(true);
    setCampaignResult(null);
    
    try {
      // Create a test campaign payload
      const campaignPayload: CampaignPayload = {
        campaignId: 'camp-' + Date.now(),
        name: 'Summer Promotion',
        type: 'Facebook',
        startDate: new Date().toISOString(),
        budget: 5000
      };
      
      const result = await onCampaignLaunched(campaignPayload);
      
      if (result.success) {
        toast.success('Campaign launched webhook triggered successfully');
        setCampaignResult(true);
      } else {
        toast.error(`Campaign webhook test failed: ${result.error ? (result.error instanceof Error ? result.error.message : String(result.error)) : 'Unknown error'}`);
        setCampaignResult(false);
      }
    } catch (error) {
      console.error('Error testing campaign webhook:', error);
      toast.error(`Error testing campaign webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCampaignResult(false);
    } finally {
      setTestingCampaign(false);
    }
  };

  // Helper function to render the status indicator
  const renderStatusIndicator = (isLoading: boolean, result: boolean | null) => {
    if (isLoading) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    }
    
    if (result === null) {
      return <div className="h-5 w-5 rounded-full border border-gray-300"></div>;
    }
    
    return result ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Test Zapier Webhooks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          <p>
            Send test events to your configured Zapier webhook to verify it's working correctly.
            Each test simulates a real business event that might occur in your Allora AI platform.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-accent/10 transition-colors">
            <div className="flex items-center gap-3">
              {renderStatusIndicator(testingStrategy, strategyResult)}
              <div>
                <h3 className="font-medium">Strategy Approval Event</h3>
                <p className="text-sm text-muted-foreground">
                  Triggers when a business strategy is approved
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestStrategy} 
              disabled={testingStrategy}
            >
              {testingStrategy ? (
                <>Testing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-accent/10 transition-colors">
            <div className="flex items-center gap-3">
              {renderStatusIndicator(testingLead, leadResult)}
              <div>
                <h3 className="font-medium">Lead Added Event</h3>
                <p className="text-sm text-muted-foreground">
                  Triggers when a new lead is added to the system
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestLeadAdded} 
              disabled={testingLead}
            >
              {testingLead ? (
                <>Testing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-accent/10 transition-colors">
            <div className="flex items-center gap-3">
              {renderStatusIndicator(testingCampaign, campaignResult)}
              <div>
                <h3 className="font-medium">Campaign Launch Event</h3>
                <p className="text-sm text-muted-foreground">
                  Triggers when a marketing campaign is launched
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestCampaign} 
              disabled={testingCampaign}
            >
              {testingCampaign ? (
                <>Testing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZapierReadinessTest;
