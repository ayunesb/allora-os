
import React from 'react';
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';
import ZapierWebhookDemo from './ZapierWebhookDemo';
import ZapierEventDemo from '@/components/integrations/ZapierEventDemo';

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
  const { isValid: isZapierWebhookValid, validationMessage, validateUrl } = useWebhookValidation('zapier');

  // Handle input change
  const handleZapierWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onZapierWebhookChange(value);
    validateUrl(value);
    
    // Also store in localStorage for the automatic event system
    if (value) {
      localStorage.setItem('zapier_webhook_url', value);
    }
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
        validationMessage={validationMessage}
        description="Enter your Zapier webhook URL to automate workflows when events occur in the platform."
      />
      
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
      
      {/* Show demo section only when webhook URL is valid */}
      {zapierWebhook && isZapierWebhookValid && (
        <ZapierWebhookDemo webhookUrl={zapierWebhook} />
      )}
    </div>
  );
};

export default ZapierWebhookSection;
