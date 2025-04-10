
import React from 'react';
import { Button } from "@/components/ui/button";
import StripeWebhookSection from '../StripeWebhookSection';
import ZapierWebhookSection from '../ZapierWebhookSection';
import GitHubWebhookSection from '../GitHubWebhookSection';
import SlackWebhookSection from '../SlackWebhookSection';
import CustomWebhookSection from '../CustomWebhookSection';

interface WebhookConfigTabProps {
  stripeWebhook: string;
  zapierWebhook: string;
  githubWebhook: string;
  slackWebhook: string;
  customWebhook: string;
  onStripeWebhookChange: (value: string) => void;
  onZapierWebhookChange: (value: string) => void;
  onGithubWebhookChange: (value: string) => void;
  onSlackWebhookChange: (value: string) => void;
  onCustomWebhookChange: (value: string) => void;
  onTestZapierWebhook: () => void;
  onTestGithubWebhook: () => void;
  onTestSlackWebhook: () => void;
  onTestCustomWebhook: () => void;
  onSave: () => void;
  isSaving: boolean;
  testingWebhook: string | null;
  testLoading: boolean;
  isStripeWebhookValid: boolean | null;
  isZapierWebhookValid: boolean | null;
  isGithubWebhookValid: boolean | null;
  isSlackWebhookValid: boolean | null;
  isCustomWebhookValid: boolean | null;
}

const WebhookConfigTab: React.FC<WebhookConfigTabProps> = ({
  stripeWebhook,
  zapierWebhook,
  githubWebhook,
  slackWebhook,
  customWebhook,
  onStripeWebhookChange,
  onZapierWebhookChange,
  onGithubWebhookChange,
  onSlackWebhookChange,
  onCustomWebhookChange,
  onTestZapierWebhook,
  onTestGithubWebhook,
  onTestSlackWebhook,
  onTestCustomWebhook,
  onSave,
  isSaving,
  testingWebhook,
  testLoading,
  isStripeWebhookValid,
  isZapierWebhookValid,
  isGithubWebhookValid,
  isSlackWebhookValid,
  isCustomWebhookValid
}) => {
  const isTestingZapier = testingWebhook === 'zapier';
  const isTestingGithub = testingWebhook === 'github';
  const isTestingSlack = testingWebhook === 'slack';
  const isTestingCustom = testingWebhook === 'custom';

  return (
    <div className="space-y-6">
      <StripeWebhookSection 
        stripeWebhook={stripeWebhook}
        onStripeWebhookChange={onStripeWebhookChange}
      />
      
      <ZapierWebhookSection 
        zapierWebhook={zapierWebhook}
        onZapierWebhookChange={onZapierWebhookChange}
        onTestWebhook={onTestZapierWebhook}
        isTestLoading={testLoading && isTestingZapier}
      />
      
      <GitHubWebhookSection 
        githubWebhook={githubWebhook}
        onGithubWebhookChange={onGithubWebhookChange}
        onTestWebhook={onTestGithubWebhook}
        isTestLoading={testLoading && isTestingGithub}
      />
      
      <SlackWebhookSection 
        slackWebhook={slackWebhook}
        onSlackWebhookChange={onSlackWebhookChange}
        onTestWebhook={onTestSlackWebhook}
        isTestLoading={testLoading && isTestingSlack}
      />
      
      <CustomWebhookSection 
        customWebhook={customWebhook}
        onCustomWebhookChange={onCustomWebhookChange}
        onTestWebhook={onTestCustomWebhook}
        isTestLoading={testLoading && isTestingCustom}
        webhookName="Custom"
      />
      
      <Button 
        onClick={onSave} 
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
    </div>
  );
};

export default WebhookConfigTab;
