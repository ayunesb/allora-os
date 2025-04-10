
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Update import paths for the webhook sections
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
  onTestStripeWebhook: () => void;
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
  onTestStripeWebhook,
  onSave,
  isSaving,
  testingWebhook,
  testLoading,
  isStripeWebhookValid,
  isZapierWebhookValid,
  isGithubWebhookValid,
  isSlackWebhookValid,
  isCustomWebhookValid,
}) => {
  const { toast } = useToast();
  const [isAutomaticEventsEnabled, setIsAutomaticEventsEnabled] = React.useState(localStorage.getItem('automatic_events_enabled') === 'true');

  const handleAutomaticEventsToggle = (checked: boolean) => {
    setIsAutomaticEventsEnabled(checked);
    localStorage.setItem('automatic_events_enabled', String(checked));
    
    toast({
      title: "Automatic Events",
      description: checked ? "Automatic event triggering enabled." : "Automatic event triggering disabled.",
    })
  };

  return (
    <div className="space-y-6">
      <StripeWebhookSection
        stripeWebhook={stripeWebhook}
        onStripeWebhookChange={onStripeWebhookChange}
        isTestLoading={testingWebhook === 'stripe' && testLoading}
        onTestWebhook={onTestStripeWebhook}
        isValid={isStripeWebhookValid}
      />
      
      <ZapierWebhookSection
        zapierWebhook={zapierWebhook}
        onZapierWebhookChange={onZapierWebhookChange}
        onTestWebhook={onTestZapierWebhook}
        isTestLoading={testingWebhook === 'zapier' && testLoading}
      />
      
      <GitHubWebhookSection
        githubWebhook={githubWebhook}
        onGithubWebhookChange={onGithubWebhookChange}
        onTestWebhook={onTestGithubWebhook}
        isTestLoading={testingWebhook === 'github' && testLoading}
      />
      
      <SlackWebhookSection
        slackWebhook={slackWebhook}
        onSlackWebhookChange={onSlackWebhookChange}
        onTestWebhook={onTestSlackWebhook}
        isTestLoading={testingWebhook === 'slack' && testLoading}
      />
      
      <CustomWebhookSection
        customWebhook={customWebhook}
        onCustomWebhookChange={onCustomWebhookChange}
        onTestWebhook={onTestCustomWebhook}
        isTestLoading={testingWebhook === 'custom' && testLoading}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Automatic Event Triggering</CardTitle>
          <CardDescription>
            Enable or disable automatic triggering of business events to Zapier.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="automatic-events">Enable Automatic Events</Label>
            <Switch 
              id="automatic-events" 
              checked={isAutomaticEventsEnabled}
              onCheckedChange={handleAutomaticEventsToggle}
            />
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <>
            Saving <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
};

export default WebhookConfigTab;
