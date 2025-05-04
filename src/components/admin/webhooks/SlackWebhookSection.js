import React from 'react';
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';
const SlackWebhookSection = ({ slackWebhook, onSlackWebhookChange, onTestWebhook, isTestLoading }) => {
    const { isValid, validationMessage, validateUrl } = useWebhookValidation('slack');
    // Handle input change
    const handleSlackWebhookChange = (e) => {
        const value = e.target.value;
        onSlackWebhookChange(value);
        validateUrl(value);
    };
    return (<div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary"/>
        <h3 className="text-sm font-medium">Slack Integration</h3>
      </div>
      
      <WebhookInput id="slack-webhook" label="Slack Webhook URL" placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX" value={slackWebhook} onChange={handleSlackWebhookChange} isValid={isValid} errorMessage="Invalid Slack webhook URL" validMessage="Valid Slack webhook URL" validationMessage={validationMessage} description="Enter your Slack incoming webhook URL to send notifications to your Slack channels."/>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onTestWebhook} disabled={isTestLoading || !slackWebhook || isValid !== true}>
          {isTestLoading ? "Testing..." : "Test Webhook"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open("https://api.slack.com/messaging/webhooks", "_blank")}>
          Slack Webhooks Documentation
        </Button>
      </div>
    </div>);
};
export default SlackWebhookSection;
