import React from 'react';
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';
const StripeWebhookSection = ({ stripeWebhook, onStripeWebhookChange, onTestWebhook, isTestLoading, isValid: externalIsValid }) => {
    const { isValid: internalIsValid, validationMessage, validateUrl } = useWebhookValidation('stripe');
    // Use external isValid if provided, otherwise use internal validation
    const isStripeWebhookValid = externalIsValid !== undefined ? externalIsValid : internalIsValid;
    // Handle input change
    const handleStripeWebhookChange = (e) => {
        const value = e.target.value;
        onStripeWebhookChange(value);
        validateUrl(value);
    };
    return (<div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <Webhook className="h-4 w-4 text-primary"/>
        <h3 className="text-sm font-medium">Stripe Webhook</h3>
      </div>
      
      <WebhookInput id="stripe-webhook" label="Stripe Webhook URL" placeholder="https://your-domain.com/api/webhooks/stripe" value={stripeWebhook} onChange={handleStripeWebhookChange} isValid={isStripeWebhookValid} errorMessage="Invalid URL format" validMessage="Valid URL format" validationMessage={validationMessage} description="Enter the URL where Stripe should send webhook events. This is used for payment processing."/>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onTestWebhook} disabled={isTestLoading || !stripeWebhook || isStripeWebhookValid !== true}>
          {isTestLoading ? "Testing..." : "Test Webhook"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open("https://stripe.com/docs/webhooks", "_blank")}>
          Stripe Documentation
        </Button>
      </div>
    </div>);
};
export default StripeWebhookSection;
