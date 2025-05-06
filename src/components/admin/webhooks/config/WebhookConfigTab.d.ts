import React from "react";
interface WebhookConfigFormProps {
  webhookType: string;
  onWebhookTypeChange: (type: string) => void;
  stripeWebhook?: string;
  stripeSecret?: string;
  zapierWebhook?: string;
  githubWebhook?: string;
  githubSecret?: string;
  slackWebhook?: string;
  customWebhook?: string;
  stripeValid?: boolean;
  zapierValid?: boolean;
  githubValid?: boolean;
  slackValid?: boolean;
  customValid?: boolean;
  onSave?: (type: string, data: any) => void;
  onDelete?: (type: string) => void;
  onTest?: (type: string) => void;
}
export declare const WebhookConfigForm: ({
  webhookType,
  onWebhookTypeChange,
  stripeWebhook,
  stripeSecret,
  zapierWebhook,
  githubWebhook,
  githubSecret,
  slackWebhook,
  customWebhook,
  stripeValid,
  zapierValid,
  githubValid,
  slackValid,
  customValid,
  onSave,
  onDelete,
  onTest,
}: WebhookConfigFormProps) => JSX.Element;
export interface WebhookConfigTabProps {
  stripeWebhook?: string;
  stripeSecret?: string;
  zapierWebhook?: string;
  githubWebhook?: string;
  githubSecret?: string;
  slackWebhook?: string;
  customWebhook?: string;
  stripeValid?: boolean;
  zapierValid?: boolean;
  githubValid?: boolean;
  slackValid?: boolean;
  customValid?: boolean;
  onSave?: (type: string, data: any) => void;
  onDelete?: (type: string) => void;
  onTest?: (type: string) => void;
  onTypeChange?: (type: string) => void;
  stripeWebhookId?: string;
  stripeEndpointSecret?: string;
  zapierWebhookUrl?: string;
  githubWebhookUrl?: string;
  slackWebhookUrl?: string;
  customWebhookUrl?: string;
}
export declare const WebhookConfigTab: React.FC<WebhookConfigTabProps>;
export default WebhookConfigTab;
