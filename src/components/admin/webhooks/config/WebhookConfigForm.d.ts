import React from 'react';
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
export declare const WebhookConfigForm: React.FC<WebhookConfigFormProps>;
export {};
