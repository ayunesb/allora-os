
import React from 'react';
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';

interface ZapierWebhookSectionProps {
  zapierWebhook: string;
  onZapierWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
}

const ZapierWebhookSection = ({ 
  zapierWebhook, 
  onZapierWebhookChange,
  onTestWebhook,
  isTestLoading
}: ZapierWebhookSectionProps) => {
  const { isValid: isZapierWebhookValid, validateUrl } = useWebhookValidation('zapier');

  // Handle input change
  const handleZapierWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onZapierWebhookChange(value);
    validateUrl(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <Webhook className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Zapier Integration</h3>
      </div>
      
      <WebhookInput
        id="zapier-webhook"
        label="Zapier Webhook URL"
        placeholder="https://hooks.zapier.com/hooks/catch/..."
        value={zapierWebhook}
        onChange={handleZapierWebhookChange}
        isValid={isZapierWebhookValid}
        errorMessage="Invalid Zapier webhook URL"
        validMessage="Valid Zapier webhook URL"
        description="Enter your Zapier webhook URL to automate workflows when events occur in the platform."
      />
      
      {isZapierWebhookValid === false && zapierWebhook && (
        <p className="text-xs text-destructive">
          This does not appear to be a valid Zapier webhook URL. It should start with https://hooks.zapier.com/
        </p>
      )}
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTestWebhook}
          disabled={isTestLoading || !zapierWebhook || isZapierWebhookValid !== true}
        >
          {isTestLoading ? "Testing..." : "Test Webhook"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open("https://zapier.com/apps/webhook", "_blank")}
        >
          Zapier Documentation
        </Button>
      </div>
    </div>
  );
};

export default ZapierWebhookSection;
