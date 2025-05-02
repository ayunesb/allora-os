
import React, { useState, useCallback } from 'react';
import { useWebhookTest } from '@/hooks/admin/useWebhookTest';
import { WebhookType } from '@/types/fixed/Webhook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WebhookConfigTab from './config/WebhookConfigTab';
import WebhookHistoryTab from './WebhookHistoryTab';
import { toast } from 'sonner';

interface WebhooksTabProps {
  defaultTab?: string;
}

export const WebhooksTab: React.FC<WebhooksTabProps> = ({ defaultTab = "config" }) => {
  // Webhook configuration state
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  const [githubWebhook, setGithubWebhook] = useState<string>('');
  const [slackWebhook, setSlackWebhook] = useState<string>('');
  const [customWebhook, setCustomWebhook] = useState<string>('');
  
  // Validation state
  const [isStripeWebhookValid, setIsStripeWebhookValid] = useState<boolean>(false);
  const [isZapierWebhookValid, setIsZapierWebhookValid] = useState<boolean>(false);
  const [isGithubWebhookValid, setIsGithubWebhookValid] = useState<boolean>(false);
  const [isSlackWebhookValid, setIsSlackWebhookValid] = useState<boolean>(false);
  const [isCustomWebhookValid, setIsCustomWebhookValid] = useState<boolean>(false);
  
  // Test webhook functionality
  const { testWebhook, isLoading: testLoading, lastResult } = useWebhookTest();
  const [testingWebhook, setTestingWebhook] = useState<WebhookType | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // Webhook history - create a minimal mock if no real hook available
  const webhookHistory = {
    events: [],
    filteredEvents: [],
    isLoading: false,
    error: '',
    searchTerm: '',
    setSearchTerm: () => {},
    refetch: () => {},
    paginatedEvents: []
  };
  
  const handleTestStripeWebhook = async (): Promise<boolean> => {
    setTestingWebhook('stripe' as WebhookType);
    const result = await testWebhook(stripeWebhook, 'stripe' as WebhookType);
    setIsStripeWebhookValid(result.success);
    setTestingWebhook(null);
    return result.success;
  };
  
  const handleTestZapierWebhook = async (): Promise<boolean> => {
    setTestingWebhook('zapier' as WebhookType);
    const result = await testWebhook(zapierWebhook, 'zapier' as WebhookType);
    setIsZapierWebhookValid(result.success);
    setTestingWebhook(null);
    return result.success;
  };
  
  const handleTestGithubWebhook = async (): Promise<boolean> => {
    setTestingWebhook('github' as WebhookType);
    const result = await testWebhook(githubWebhook, 'github' as WebhookType);
    setIsGithubWebhookValid(result.success);
    setTestingWebhook(null);
    return result.success;
  };
  
  const handleTestSlackWebhook = async (): Promise<boolean> => {
    setTestingWebhook('slack' as WebhookType);
    const result = await testWebhook(slackWebhook, 'slack' as WebhookType);
    setIsSlackWebhookValid(result.success);
    setTestingWebhook(null);
    return result.success;
  };
  
  const handleTestCustomWebhook = async (): Promise<boolean> => {
    setTestingWebhook('custom' as WebhookType);
    const result = await testWebhook(customWebhook, 'custom' as WebhookType);
    setIsCustomWebhookValid(result.success);
    setTestingWebhook(null);
    return result.success;
  };
  
  const handleSaveWebhooks = async () => {
    setIsSaving(true);
    
    try {
      // Replace this with your actual save logic
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Webhook settings saved successfully');
    } catch (error) {
      console.error('Error saving webhook settings:', error);
      toast.error('Failed to save webhook settings');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleRefreshEvents = () => {
    if (webhookHistory && typeof webhookHistory.refetch === 'function') {
      webhookHistory.refetch();
    }
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="config" className="space-y-4 py-4">
        <WebhookConfigTab
          stripeWebhook={stripeWebhook}
          zapierWebhook={zapierWebhook}
          githubWebhook={githubWebhook}
          slackWebhook={slackWebhook}
          customWebhook={customWebhook}
          onStripeWebhookChange={setStripeWebhook}
          onZapierWebhookChange={setZapierWebhook}
          onGithubWebhookChange={setGithubWebhook}
          onSlackWebhookChange={setSlackWebhook}
          onCustomWebhookChange={setCustomWebhook}
          onTestStripeWebhook={handleTestStripeWebhook}
          onTestZapierWebhook={handleTestZapierWebhook}
          onTestGithubWebhook={handleTestGithubWebhook}
          onTestSlackWebhook={handleTestSlackWebhook}
          onTestCustomWebhook={handleTestCustomWebhook}
          onSave={handleSaveWebhooks}
          isSaving={isSaving}
          testingWebhook={testingWebhook}
          testLoading={testLoading}
          isStripeWebhookValid={isStripeWebhookValid}
          isZapierWebhookValid={isZapierWebhookValid}
          isGithubWebhookValid={isGithubWebhookValid}
          isSlackWebhookValid={isSlackWebhookValid}
          isCustomWebhookValid={isCustomWebhookValid}
        />
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSaveWebhooks}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save All Webhook Settings'}
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="history" className="space-y-4 py-4">
        {webhookHistory && (
          <WebhookHistoryTab 
            isLoading={webhookHistory.isLoading} 
            events={webhookHistory.events} 
            onRefresh={handleRefreshEvents} 
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default WebhooksTab;
