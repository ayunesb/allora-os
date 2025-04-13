
import React from 'react';
import { Webhook } from 'lucide-react';
import SlackWebhookSection from '@/components/admin/webhooks/SlackWebhookSection';
import GitHubWebhookSection from '@/components/admin/webhooks/GitHubWebhookSection';
import ZapierWebhookSection from '@/components/admin/webhooks/ZapierWebhookSection';
import StripeWebhookSection from '@/components/admin/webhooks/StripeWebhookSection';
import CustomWebhookSection from '@/components/admin/webhooks/CustomWebhookSection';

export default function WebhooksPage() {
  const [slackWebhook, setSlackWebhook] = React.useState('');
  const [githubWebhook, setGithubWebhook] = React.useState('');
  const [zapierWebhook, setZapierWebhook] = React.useState('');
  const [stripeWebhook, setStripeWebhook] = React.useState('');
  const [customWebhook, setCustomWebhook] = React.useState('');
  const [isTestingWebhook, setIsTestingWebhook] = React.useState(false);

  const handleTestSlackWebhook = async () => {
    setIsTestingWebhook(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Testing Slack webhook:', slackWebhook);
    setIsTestingWebhook(false);
  };

  const handleTestGithubWebhook = async () => {
    setIsTestingWebhook(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Testing GitHub webhook:', githubWebhook);
    setIsTestingWebhook(false);
  };

  const handleTestZapierWebhook = async () => {
    setIsTestingWebhook(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Testing Zapier webhook:', zapierWebhook);
    setIsTestingWebhook(false);
  };

  const handleTestStripeWebhook = async () => {
    setIsTestingWebhook(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Testing Stripe webhook:', stripeWebhook);
    setIsTestingWebhook(false);
  };

  const handleTestCustomWebhook = async () => {
    setIsTestingWebhook(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Testing custom webhook:', customWebhook);
    setIsTestingWebhook(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Webhook Management</h1>
        <p className="text-muted-foreground mt-2">
          Configure and manage webhooks to connect with external services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SlackWebhookSection
            slackWebhook={slackWebhook}
            onSlackWebhookChange={setSlackWebhook}
            onTestWebhook={handleTestSlackWebhook}
            isTestLoading={isTestingWebhook}
          />

          <GitHubWebhookSection
            githubWebhook={githubWebhook}
            onGithubWebhookChange={setGithubWebhook}
            onTestWebhook={handleTestGithubWebhook}
            isTestLoading={isTestingWebhook}
          />
        </div>

        <div className="space-y-6">
          <ZapierWebhookSection
            zapierWebhook={zapierWebhook}
            onZapierWebhookChange={setZapierWebhook}
            onTestWebhook={handleTestZapierWebhook}
            isTestLoading={isTestingWebhook}
          />

          <StripeWebhookSection
            stripeWebhook={stripeWebhook}
            onStripeWebhookChange={setStripeWebhook}
            onTestWebhook={handleTestStripeWebhook}
            isTestLoading={isTestingWebhook}
          />

          <CustomWebhookSection
            customWebhook={customWebhook}
            onCustomWebhookChange={setCustomWebhook}
            onTestWebhook={handleTestCustomWebhook}
            isTestLoading={isTestingWebhook}
            webhookName="Custom"
          />
        </div>
      </div>
    </div>
  );
}
