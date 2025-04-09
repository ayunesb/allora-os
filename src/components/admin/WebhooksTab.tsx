
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Webhook } from "lucide-react";
import StripeWebhookSection from './webhooks/StripeWebhookSection';
import ZapierWebhookSection from './webhooks/ZapierWebhookSection';
import { useWebhooks } from './webhooks/useWebhooks';
import { useWebhookValidation as useStripeWebhookValidation } from './webhooks/useWebhookValidation';
import { useWebhookValidation as useZapierWebhookValidation } from './webhooks/useWebhookValidation';

const WebhooksTab = () => {
  // Custom hooks for state management and functionality
  const {
    stripeWebhook,
    setStripeWebhook,
    zapierWebhook,
    setZapierWebhook,
    isSaving,
    testLoading,
    handleSaveWebhooks,
    handleTestZapierWebhook
  } = useWebhooks();

  // Validation hooks
  const { isValid: isStripeWebhookValid, validateUrl: validateStripeUrl } = useStripeWebhookValidation('stripe');
  const { isValid: isZapierWebhookValid, validateUrl: validateZapierUrl } = useZapierWebhookValidation('zapier');

  // Initialize validation on mount
  React.useEffect(() => {
    if (stripeWebhook) validateStripeUrl(stripeWebhook);
    if (zapierWebhook) validateZapierUrl(zapierWebhook);
  }, [stripeWebhook, zapierWebhook, validateStripeUrl, validateZapierUrl]);

  // Handlers
  const handleStripeWebhookChange = (value: string) => {
    setStripeWebhook(value);
  };

  const handleZapierWebhookChange = (value: string) => {
    setZapierWebhook(value);
  };

  const handleTestWebhook = () => {
    handleTestZapierWebhook(isZapierWebhookValid);
  };

  const handleSave = () => {
    handleSaveWebhooks(isStripeWebhookValid, isZapierWebhookValid);
  };

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
          onTestWebhook={handleTestWebhook}
          isTestLoading={testLoading}
        />
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving || (isStripeWebhookValid === false) || (isZapierWebhookValid === false)}
        >
          {isSaving ? "Saving..." : "Save Webhook Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
