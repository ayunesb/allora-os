
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebhookHistoryTab from './webhooks/WebhookHistoryTab';
import { useWebhookValidation } from '@/hooks/admin/useWebhookValidation';
import WebhookHeader from './webhooks/WebhookHeader';
import WebhookConfigTab from './webhooks/config/WebhookConfigTab';
import { useBreakpoint } from "@/hooks/use-mobile";
import { WebhookType } from '@/types/fixed/Webhook';
import { useWebhookHistory } from '@/components/admin/webhooks/useWebhookHistory';
import { useWebhookTest } from '@/hooks/admin/useWebhookTest';

const WebhooksTab = () => {
  const [activeTab, setActiveTab] = useState<string>("config");
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  // Webhook state
  const [stripeWebhook, setStripeWebhook] = useState<string>("");
  const [zapierWebhook, setZapierWebhook] = useState<string>("");
  const [githubWebhook, setGithubWebhook] = useState<string>("");
  const [slackWebhook, setSlackWebhook] = useState<string>("");
  const [customWebhook, setCustomWebhook] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [testingWebhook, setTestingWebhook] = useState<string>("");
  
  // Webhook history
  const { loading: historyLoading, events, fetchEvents } = useWebhookHistory();
  
  // Webhook testing
  const { testWebhook } = useWebhookTest();

  // Validation hooks
  const { isValid: isStripeWebhookValid, validateUrl: validateStripeUrl } = useWebhookValidation('stripe' as WebhookType);
  const { isValid: isZapierWebhookValid, validateUrl: validateZapierUrl } = useWebhookValidation('zapier' as WebhookType);
  const { isValid: isGithubWebhookValid, validateUrl: validateGithubUrl } = useWebhookValidation('github' as WebhookType);
  const { isValid: isSlackWebhookValid, validateUrl: validateSlackUrl } = useWebhookValidation('slack' as WebhookType);
  const { isValid: isCustomWebhookValid, validateUrl: validateCustomUrl } = useWebhookValidation('custom' as WebhookType);

  // Initialize validation on mount
  React.useEffect(() => {
    if (stripeWebhook) validateStripeUrl(stripeWebhook);
    if (zapierWebhook) validateZapierUrl(zapierWebhook);
    if (githubWebhook) validateGithubUrl(githubWebhook);
    if (slackWebhook) validateSlackUrl(slackWebhook);
    if (customWebhook) validateCustomUrl(customWebhook);
  }, [
    stripeWebhook, zapierWebhook, githubWebhook, slackWebhook, customWebhook,
    validateStripeUrl, validateZapierUrl, validateGithubUrl, validateSlackUrl, validateCustomUrl
  ]);

  // Handlers
  const handleStripeWebhookChange = (value: string) => {
    setStripeWebhook(value);
    validateStripeUrl(value);
  };

  const handleZapierWebhookChange = (value: string) => {
    setZapierWebhook(value);
    validateZapierUrl(value);
  };

  const handleGithubWebhookChange = (value: string) => {
    setGithubWebhook(value);
    validateGithubUrl(value);
  };

  const handleSlackWebhookChange = (value: string) => {
    setSlackWebhook(value);
    validateSlackUrl(value);
  };

  const handleCustomWebhookChange = (value: string) => {
    setCustomWebhook(value);
    validateCustomUrl(value);
  };

  // Save all webhooks
  const handleSaveWebhooks = (
    isStripeValid: boolean, 
    isZapierValid: boolean,
    isGithubValid: boolean,
    isSlackValid: boolean,
    isCustomValid: boolean
  ) => {
    setIsSaving(true);
    
    // Implementation would go here to save webhooks to database
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  // Test webhook handlers
  const handleTestStripeWebhook = async (isValid: boolean) => {
    if (!isValid) return false;
    setTestLoading(true);
    setTestingWebhook('stripe');
    
    try {
      const result = await testWebhook(stripeWebhook, 'stripe' as WebhookType);
      return !!result;
    } finally {
      setTestLoading(false);
      setTestingWebhook('');
    }
  };
  
  const handleTestZapierWebhook = async (isValid: boolean) => {
    if (!isValid) return false;
    setTestLoading(true);
    setTestingWebhook('zapier');
    
    try {
      const result = await testWebhook(zapierWebhook, 'zapier' as WebhookType);
      return !!result;
    } finally {
      setTestLoading(false);
      setTestingWebhook('');
    }
  };
  
  const handleTestGithubWebhook = async (isValid: boolean) => {
    if (!isValid) return false;
    setTestLoading(true);
    setTestingWebhook('github');
    
    try {
      const result = await testWebhook(githubWebhook, 'github' as WebhookType);
      return !!result;
    } finally {
      setTestLoading(false);
      setTestingWebhook('');
    }
  };
  
  const handleTestSlackWebhook = async (isValid: boolean) => {
    if (!isValid) return false;
    setTestLoading(true);
    setTestingWebhook('slack');
    
    try {
      const result = await testWebhook(slackWebhook, 'slack' as WebhookType);
      return !!result;
    } finally {
      setTestLoading(false);
      setTestingWebhook('');
    }
  };
  
  const handleTestCustomWebhook = async (isValid: boolean) => {
    if (!isValid) return false;
    setTestLoading(true);
    setTestingWebhook('custom');
    
    try {
      const result = await testWebhook(customWebhook, 'custom' as WebhookType);
      return !!result;
    } finally {
      setTestLoading(false);
      setTestingWebhook('');
    }
  };

  // Test handlers that correctly return Promise<boolean>
  const testStripeWebhook = () => handleTestStripeWebhook(isStripeWebhookValid || false);
  const testZapierWebhook = () => handleTestZapierWebhook(isZapierWebhookValid || false);
  const testGithubWebhook = () => handleTestGithubWebhook(isGithubWebhookValid || false);
  const testSlackWebhook = () => handleTestSlackWebhook(isSlackWebhookValid || false);
  const testCustomWebhook = () => handleTestCustomWebhook(isCustomWebhookValid || false);

  return (
    <Card>
      <CardHeader>
        <WebhookHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="config" className="mt-0">
          <CardContent className={isMobileView ? 'p-3' : ''}>
            <WebhookConfigTab 
              stripeWebhook={stripeWebhook}
              zapierWebhook={zapierWebhook}
              githubWebhook={githubWebhook}
              slackWebhook={slackWebhook}
              customWebhook={customWebhook}
              onStripeWebhookChange={handleStripeWebhookChange}
              onZapierWebhookChange={handleZapierWebhookChange}
              onGithubWebhookChange={handleGithubWebhookChange}
              onSlackWebhookChange={handleSlackWebhookChange}
              onCustomWebhookChange={handleCustomWebhookChange}
              onTestStripeWebhook={testStripeWebhook}
              onTestZapierWebhook={testZapierWebhook}
              onTestGithubWebhook={testGithubWebhook}
              onTestSlackWebhook={testSlackWebhook}
              onTestCustomWebhook={testCustomWebhook}
              onSave={handleSaveWebhooks}
              isSaving={isSaving}
              testingWebhook={testingWebhook}
              testLoading={testLoading}
              isStripeWebhookValid={isStripeWebhookValid || false}
              isZapierWebhookValid={isZapierWebhookValid || false}
              isGithubWebhookValid={isGithubWebhookValid || false}
              isSlackWebhookValid={isSlackWebhookValid || false}
              isCustomWebhookValid={isCustomWebhookValid || false}
            />
          </CardContent>
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <WebhookHistoryTab loading={historyLoading} events={events} onRefresh={fetchEvents} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default WebhooksTab;
