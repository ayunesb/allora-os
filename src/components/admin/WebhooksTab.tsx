
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Webhook } from "lucide-react";
import StripeWebhookSection from './webhooks/StripeWebhookSection';
import ZapierWebhookSection from './webhooks/ZapierWebhookSection';
import GitHubWebhookSection from './webhooks/GitHubWebhookSection';
import SlackWebhookSection from './webhooks/SlackWebhookSection';
import CustomWebhookSection from './webhooks/CustomWebhookSection';
import { useWebhooks } from './webhooks/useWebhooks';
import { useWebhookValidation } from './webhooks/useWebhookValidation';

const WebhooksTab = () => {
  // Custom hooks for state management and functionality
  const {
    stripeWebhook,
    setStripeWebhook,
    zapierWebhook,
    setZapierWebhook,
    githubWebhook,
    setGithubWebhook,
    slackWebhook,
    setSlackWebhook,
    customWebhook,
    setCustomWebhook,
    isSaving,
    testLoading,
    testingWebhook,
    handleSaveWebhooks,
    handleTestZapierWebhook,
    handleTestGithubWebhook,
    handleTestSlackWebhook,
    handleTestCustomWebhook
  } = useWebhooks();

  // Validation hooks
  const { isValid: isStripeWebhookValid, validateUrl: validateStripeUrl } = useWebhookValidation('stripe');
  const { isValid: isZapierWebhookValid, validateUrl: validateZapierUrl } = useWebhookValidation('zapier');
  const { isValid: isGithubWebhookValid, validateUrl: validateGithubUrl } = useWebhookValidation('github');
  const { isValid: isSlackWebhookValid, validateUrl: validateSlackUrl } = useWebhookValidation('slack');
  const { isValid: isCustomWebhookValid, validateUrl: validateCustomUrl } = useWebhookValidation('custom');

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
  };

  const handleZapierWebhookChange = (value: string) => {
    setZapierWebhook(value);
  };

  const handleGithubWebhookChange = (value: string) => {
    setGithubWebhook(value);
  };

  const handleSlackWebhookChange = (value: string) => {
    setSlackWebhook(value);
  };

  const handleCustomWebhookChange = (value: string) => {
    setCustomWebhook(value);
  };

  const handleSave = () => {
    handleSaveWebhooks(
      isStripeWebhookValid, 
      isZapierWebhookValid,
      isGithubWebhookValid,
      isSlackWebhookValid,
      isCustomWebhookValid
    );
  };

  const isTestingZapier = testingWebhook === 'zapier';
  const isTestingGithub = testingWebhook === 'github';
  const isTestingSlack = testingWebhook === 'slack';
  const isTestingCustom = testingWebhook === 'custom';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Webhooks
        </CardTitle>
        <CardDescription>
          Configure webhook endpoints for events and integrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StripeWebhookSection 
          stripeWebhook={stripeWebhook}
          onStripeWebhookChange={handleStripeWebhookChange}
        />
        
        <ZapierWebhookSection 
          zapierWebhook={zapierWebhook}
          onZapierWebhookChange={handleZapierWebhookChange}
          onTestWebhook={() => handleTestZapierWebhook(isZapierWebhookValid)}
          isTestLoading={testLoading && isTestingZapier}
        />
        
        <GitHubWebhookSection 
          githubWebhook={githubWebhook}
          onGithubWebhookChange={handleGithubWebhookChange}
          onTestWebhook={() => handleTestGithubWebhook(isGithubWebhookValid)}
          isTestLoading={testLoading && isTestingGithub}
        />
        
        <SlackWebhookSection 
          slackWebhook={slackWebhook}
          onSlackWebhookChange={handleSlackWebhookChange}
          onTestWebhook={() => handleTestSlackWebhook(isSlackWebhookValid)}
          isTestLoading={testLoading && isTestingSlack}
        />
        
        <CustomWebhookSection 
          customWebhook={customWebhook}
          onCustomWebhookChange={handleCustomWebhookChange}
          onTestWebhook={() => handleTestCustomWebhook(isCustomWebhookValid)}
          isTestLoading={testLoading && isTestingCustom}
          webhookName="Custom"
        />
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving || 
            (isStripeWebhookValid === false) || 
            (isZapierWebhookValid === false) ||
            (isGithubWebhookValid === false) ||
            (isSlackWebhookValid === false) ||
            (isCustomWebhookValid === false)
          }
        >
          {isSaving ? "Saving..." : "Save Webhook Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
