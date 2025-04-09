
import React from 'react';
import { Webhook } from "lucide-react";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';

interface StripeWebhookSectionProps {
  stripeWebhook: string;
  onStripeWebhookChange: (value: string) => void;
}

const StripeWebhookSection = ({ 
  stripeWebhook, 
  onStripeWebhookChange 
}: StripeWebhookSectionProps) => {
  const { isValid: isStripeWebhookValid, validateUrl } = useWebhookValidation('stripe');

  // Handle input change
  const handleStripeWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onStripeWebhookChange(value);
    validateUrl(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <Webhook className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Stripe Webhook</h3>
      </div>
      
      <WebhookInput
        id="stripe-webhook"
        label="Stripe Webhook URL"
        placeholder="https://your-domain.com/api/webhooks/stripe"
        value={stripeWebhook}
        onChange={handleStripeWebhookChange}
        isValid={isStripeWebhookValid}
        errorMessage="Invalid URL format"
        validMessage="Valid URL format"
        description="Enter the URL where Stripe should send webhook events. This is used for payment processing."
      />
    </div>
  );
};

export default StripeWebhookSection;
