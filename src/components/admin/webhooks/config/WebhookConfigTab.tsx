
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebhookForm from "./WebhookForm";
import { WebhookType } from "@/utils/webhookValidation";

export interface WebhookConfigTabProps {
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
  onTestStripeWebhook: () => Promise<boolean>;
  onTestZapierWebhook: () => Promise<boolean>;
  onTestGithubWebhook: () => Promise<boolean>;
  onTestSlackWebhook: () => Promise<boolean>;
  onTestCustomWebhook: () => Promise<boolean>;
  onSave: () => void;
  isSaving: boolean;
  testingWebhook: WebhookType | null;
  testLoading: boolean;
  isStripeWebhookValid: boolean;
  isZapierWebhookValid: boolean;
  isGithubWebhookValid: boolean;
  isSlackWebhookValid: boolean;
  isCustomWebhookValid: boolean;
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
  onTestStripeWebhook,
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Configuration</CardTitle>
        <CardDescription>
          Configure webhooks to integrate with external services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stripe">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="zapier">Zapier</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="slack">Slack</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stripe">
            <WebhookForm
              title="Stripe Webhook"
              description="Configure a webhook endpoint for Stripe payment events"
              placeholder="https://api.stripe.com/webhook"
              value={stripeWebhook}
              onChange={onStripeWebhookChange}
              onTest={onTestStripeWebhook}
              onSave={onSave}
              isSaving={isSaving}
              isValid={isStripeWebhookValid}
              isTestLoading={testLoading && testingWebhook === 'stripe'}
              webhookType="stripe"
            />
          </TabsContent>
          
          <TabsContent value="zapier">
            <WebhookForm
              title="Zapier Webhook"
              description="Send data to Zapier workflows"
              placeholder="https://hooks.zapier.com/hooks/catch/"
              value={zapierWebhook}
              onChange={onZapierWebhookChange}
              onTest={onTestZapierWebhook}
              onSave={onSave}
              isSaving={isSaving}
              isValid={isZapierWebhookValid}
              isTestLoading={testLoading && testingWebhook === 'zapier'}
              webhookType="zapier"
            />
          </TabsContent>
          
          <TabsContent value="github">
            <WebhookForm
              title="GitHub Webhook"
              description="Trigger GitHub workflows or actions"
              placeholder="https://api.github.com/repos/owner/repo/hooks"
              value={githubWebhook}
              onChange={onGithubWebhookChange}
              onTest={onTestGithubWebhook}
              onSave={onSave}
              isSaving={isSaving}
              isValid={isGithubWebhookValid}
              isTestLoading={testLoading && testingWebhook === 'github'}
              webhookType="github"
            />
          </TabsContent>
          
          <TabsContent value="slack">
            <WebhookForm
              title="Slack Webhook"
              description="Send notifications to Slack channels"
              placeholder="https://hooks.slack.com/services/"
              value={slackWebhook}
              onChange={onSlackWebhookChange}
              onTest={onTestSlackWebhook}
              onSave={onSave}
              isSaving={isSaving}
              isValid={isSlackWebhookValid}
              isTestLoading={testLoading && testingWebhook === 'slack'}
              webhookType="slack"
            />
          </TabsContent>
          
          <TabsContent value="custom">
            <WebhookForm
              title="Custom Webhook"
              description="Configure a custom webhook endpoint"
              placeholder="https://your-api.com/webhook"
              value={customWebhook}
              onChange={onCustomWebhookChange}
              onTest={onTestCustomWebhook}
              onSave={onSave}
              isSaving={isSaving}
              isValid={isCustomWebhookValid}
              isTestLoading={testLoading && testingWebhook === 'custom'}
              webhookType="custom"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebhookConfigTab;
