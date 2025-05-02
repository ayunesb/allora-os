
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import WebhookHeader from './webhooks/WebhookHeader';
import { useWebhookHistory } from './webhooks/useWebhookHistory';
import WebhookHistoryTab from './webhooks/WebhookHistoryTab';
import WebhookConfigTab from './webhooks/config/WebhookConfigTab';
import { WebhookType } from '@/types/fixed/Webhook';

/**
 * Main component for managing webhooks in the admin section
 */
export default function WebhooksTab() {
  const [activeTab, setActiveTab] = useState('config');
  const {
    events,
    isLoading,
    error,
    onRefresh
  } = useWebhookHistory();

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Refresh events when switching to history tab
    if (value === 'history' && onRefresh) {
      onRefresh();
    }
  };

  // Configuration state for webhook validity
  const [webhookConfig, setWebhookConfig] = useState({
    stripeConfigValid: false,
    zapierConfigValid: false,
    githubConfigValid: false,
    slackConfigValid: false,
    customConfigValid: false
  });

  // Update webhook configuration validity
  const handleConfigUpdate = () => {
    // This function signature needs to be updated in the real implementation
    // to match any parameters expected by calling code
  };

  // Set up initial validation
  useEffect(() => {
    // Validate configured webhooks on mount
    const validateWebhookConfigs = async () => {
      try {
        // Simulate validation (replace with actual validation logic)
        setWebhookConfig({
          stripeConfigValid: true,
          zapierConfigValid: false,
          githubConfigValid: false,
          slackConfigValid: true,
          customConfigValid: false
        });
      } catch (error) {
        console.error('Error validating webhook configurations:', error);
      }
    };

    validateWebhookConfigs();
  }, []);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <WebhookHeader 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {activeTab === 'config' ? (
          <WebhookConfigTab
            config={{
              stripeWebhookId: "whsec_1234567890",
              stripeEndpointSecret: "••••••••••••••••",
              zapierWebhookUrl: "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
              githubWebhookUrl: "https://api.github.com/repos/username/repo/hooks",
              githubSecret: "••••••••••••••••",
              slackWebhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
              customWebhookUrl: ""
            }}
            validState={{
              stripeValid: webhookConfig.stripeConfigValid,
              zapierValid: webhookConfig.zapierConfigValid,
              githubValid: webhookConfig.githubConfigValid,
              slackValid: webhookConfig.slackConfigValid,
              customValid: webhookConfig.customConfigValid
            }}
            onSave={(type: string) => {
              // Update validation state
              console.log(`Saved ${type} webhook config`);
              handleConfigUpdate();
            }}
            onDelete={(type: string) => {
              // Handle deletion
              console.log(`Deleted ${type as WebhookType} webhook config`);
            }}
            onTest={(type: string) => {
              // Handle testing
              console.log(`Testing ${type as WebhookType} webhook`);
            }}
          />
        ) : (
          <WebhookHistoryTab 
            isLoading={isLoading} 
            events={events}
            onRefresh={onRefresh}
          />
        )}
      </CardContent>
    </Card>
  );
}
