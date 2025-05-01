
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useZapier } from '@/lib/zapier';
import { WebhookType, sanitizeWebhookUrl, testWebhook } from '@/utils/webhookValidation';
import { testWebhookAdvanced } from './hookUtils';

export const useWebhooks = () => {
  // Basic webhook URLs
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  
  // Extended webhook URLs
  const [githubWebhook, setGithubWebhook] = useState<string>('');
  const [slackWebhook, setSlackWebhook] = useState<string>('');
  const [customWebhook, setCustomWebhook] = useState<string>('');
  
  // State for UI
  const [isSaving, setIsSaving] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState<WebhookType | null>(null);
  
  const { triggerWorkflow } = useZapier();

  // Load webhooks from localStorage on mount
  useEffect(() => {
    const savedStripeWebhook = localStorage.getItem('stripe_webhook_url');
    const savedZapierWebhook = localStorage.getItem('zapier_webhook_url') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
    const savedGithubWebhook = localStorage.getItem('github_webhook_url');
    const savedSlackWebhook = localStorage.getItem('slack_webhook_url');
    const savedCustomWebhook = localStorage.getItem('custom_webhook_url');
    
    if (savedStripeWebhook) setStripeWebhook(savedStripeWebhook);
    if (savedZapierWebhook) setZapierWebhook(savedZapierWebhook);
    if (savedGithubWebhook) setGithubWebhook(savedGithubWebhook);
    if (savedSlackWebhook) setSlackWebhook(savedSlackWebhook);
    if (savedCustomWebhook) setCustomWebhook(savedCustomWebhook);
  }, []);

  const handleSaveWebhooks = (
    isStripeWebhookValid: boolean | null,
    isZapierWebhookValid: boolean | null,
    isGithubWebhookValid: boolean | null,
    isSlackWebhookValid: boolean | null,
    isCustomWebhookValid: boolean | null
  ) => {
    // Validate URLs before saving
    const isStripeValid = !stripeWebhook || isStripeWebhookValid === true;
    const isZapierValid = !zapierWebhook || isZapierWebhookValid === true;
    const isGithubValid = !githubWebhook || isGithubWebhookValid === true;
    const isSlackValid = !slackWebhook || isSlackWebhookValid === true;
    const isCustomValid = !customWebhook || isCustomWebhookValid === true;
    
    const hasInvalidUrls = !isStripeValid || !isZapierValid || !isGithubValid || !isSlackValid || !isCustomValid;
    
    if (hasInvalidUrls) {
      toast.error("Please correct the invalid webhook URLs before saving");
      return;
    }
    
    setIsSaving(true);
    
    // Sanitize URLs before saving
    const sanitizedStripeWebhook = sanitizeWebhookUrl(stripeWebhook);
    const sanitizedZapierWebhook = sanitizeWebhookUrl(zapierWebhook);
    const sanitizedGithubWebhook = sanitizeWebhookUrl(githubWebhook);
    const sanitizedSlackWebhook = sanitizeWebhookUrl(slackWebhook);
    const sanitizedCustomWebhook = sanitizeWebhookUrl(customWebhook);
    
    // Save to localStorage (in a real app, you would save to a database)
    localStorage.setItem('stripe_webhook_url', sanitizedStripeWebhook || '');
    localStorage.setItem('zapier_webhook_url', sanitizedZapierWebhook || '');
    localStorage.setItem('github_webhook_url', sanitizedGithubWebhook || '');
    localStorage.setItem('slack_webhook_url', sanitizedSlackWebhook || '');
    localStorage.setItem('custom_webhook_url', sanitizedCustomWebhook || '');
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Webhook settings saved successfully");
    }, 500);
  };

  const handleTestWebhook = async (type: WebhookType, webhookUrl: string, isWebhookValid: boolean | null) => {
    if (!webhookUrl) {
      toast.error(`Please enter a ${type} webhook URL first`);
      return;
    }

    if (isWebhookValid !== true) {
      toast.error(`Please enter a valid ${type} webhook URL`);
      return;
    }

    setTestLoading(true);
    setTestingWebhook(type);
    
    try {
      let result;
      
      // For Zapier, use the existing trigger method
      if (type === 'zapier') {
        result = await triggerWorkflow({
          webhookUrl,
          eventType: 'test_webhook',
          payload: { 
            timestamp: new Date().toISOString(),
            source: 'Webhook Test',
            message: 'This is a test from the Allora AI Platform'
          }
        });
      } else {
        // For other webhook types, use the advanced test method
        result = await testWebhookAdvanced(webhookUrl, type);
      }
      
      if (result.success) {
        toast.success(`${type} webhook test successful!`);
      } else {
        toast.error(`Failed to trigger ${type} webhook: ${result.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(`Error testing ${type} webhook:`, error);
      toast.error(`An error occurred while testing the webhook: ${error.message || "Unknown error"}`);
    } finally {
      setTestLoading(false);
      setTestingWebhook(null);
    }
  };

  const handleTestZapierWebhook = (isZapierWebhookValid: boolean | null) => {
    handleTestWebhook('zapier', zapierWebhook, isZapierWebhookValid);
  };

  const handleTestGithubWebhook = (isGithubWebhookValid: boolean | null) => {
    handleTestWebhook('github', githubWebhook, isGithubWebhookValid);
  };

  const handleTestSlackWebhook = (isSlackWebhookValid: boolean | null) => {
    handleTestWebhook('slack', slackWebhook, isSlackWebhookValid);
  };

  const handleTestCustomWebhook = (isCustomWebhookValid: boolean | null) => {
    handleTestWebhook('custom', customWebhook, isCustomWebhookValid);
  };

  const handleTestStripeWebhook = (isStripeWebhookValid: boolean | null) => {
    handleTestWebhook('stripe', stripeWebhook, isStripeWebhookValid);
  };

  return {
    // Basic webhooks
    stripeWebhook,
    setStripeWebhook,
    zapierWebhook,
    setZapierWebhook,
    
    // Extended webhooks
    githubWebhook,
    setGithubWebhook,
    slackWebhook,
    setSlackWebhook,
    customWebhook,
    setCustomWebhook,
    
    // UI state
    isSaving,
    testLoading,
    testingWebhook,
    
    // Handlers
    handleSaveWebhooks,
    handleTestZapierWebhook,
    handleTestGithubWebhook,
    handleTestSlackWebhook,
    handleTestCustomWebhook,
    handleTestStripeWebhook
  };
};
