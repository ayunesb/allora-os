
import React from 'react';
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';

interface CustomWebhookSectionProps {
  customWebhook: string;
  onCustomWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
  webhookName?: string;
}

const CustomWebhookSection = ({ 
  customWebhook, 
  onCustomWebhookChange,
  onTestWebhook,
  isTestLoading,
  webhookName = "Custom"
}: CustomWebhookSectionProps) => {
  const { isValid, validationMessage, validateUrl } = useWebhookValidation('custom');

  // Handle input change
  const handleCustomWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onCustomWebhookChange(value);
    validateUrl(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <Link className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">{webhookName} Webhook</h3>
      </div>
      
      <WebhookInput
        id="custom-webhook"
        label={`${webhookName} Webhook URL`}
        placeholder="https://api.example.com/webhooks/your-endpoint"
        value={customWebhook}
        onChange={handleCustomWebhookChange}
        isValid={isValid}
        errorMessage="Invalid webhook URL"
        validMessage="Valid webhook URL"
        validationMessage={validationMessage}
        description={`Enter your ${webhookName.toLowerCase()} webhook URL to integrate with external services.`}
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTestWebhook}
          disabled={isTestLoading || !customWebhook || isValid !== true}
        >
          {isTestLoading ? "Testing..." : "Test Webhook"}
        </Button>
      </div>
    </div>
  );
};

export default CustomWebhookSection;
