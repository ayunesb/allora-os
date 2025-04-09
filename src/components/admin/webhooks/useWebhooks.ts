
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useZapier } from '@/lib/zapier';
import { sanitizeUrl } from '@/utils/sanitizers';

export const useWebhooks = () => {
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const { triggerWorkflow } = useZapier();

  // Load webhooks from localStorage on mount
  useEffect(() => {
    const savedStripeWebhook = localStorage.getItem('stripe_webhook_url');
    const savedZapierWebhook = localStorage.getItem('zapier_webhook_url');
    
    if (savedStripeWebhook) {
      setStripeWebhook(savedStripeWebhook);
    }
    
    if (savedZapierWebhook) {
      setZapierWebhook(savedZapierWebhook);
    }
  }, []);

  const handleSaveWebhooks = (
    isStripeWebhookValid: boolean | null,
    isZapierWebhookValid: boolean | null
  ) => {
    // Validate URLs before saving
    const isStripeValid = !stripeWebhook || isStripeWebhookValid === true;
    const isZapierValid = !zapierWebhook || isZapierWebhookValid === true;
    
    if (!isStripeValid || !isZapierValid) {
      toast.error("Please correct the invalid webhook URLs before saving");
      return;
    }
    
    setIsSaving(true);
    
    // Sanitize URLs before saving
    const sanitizedStripeWebhook = sanitizeUrl(stripeWebhook);
    const sanitizedZapierWebhook = sanitizeUrl(zapierWebhook);
    
    // Save to localStorage (in a real app, you would save to a database)
    localStorage.setItem('stripe_webhook_url', sanitizedStripeWebhook || '');
    localStorage.setItem('zapier_webhook_url', sanitizedZapierWebhook || '');
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Webhook settings saved successfully");
    }, 500);
  };

  const handleTestZapierWebhook = async (isZapierWebhookValid: boolean | null) => {
    if (!zapierWebhook) {
      toast.error("Please enter a Zapier webhook URL first");
      return;
    }

    if (isZapierWebhookValid !== true) {
      toast.error("Please enter a valid Zapier webhook URL");
      return;
    }

    setTestLoading(true);
    
    try {
      const result = await triggerWorkflow(
        zapierWebhook,
        'test_webhook',
        { 
          timestamp: new Date().toISOString(),
          source: 'Webhook Test',
          message: 'This is a test from the Allora AI Platform'
        }
      );
      
      if (result.success) {
        toast.success("Zapier webhook test successful!");
      } else {
        toast.error("Failed to trigger Zapier webhook: " + (result.error?.message || "Unknown error"));
      }
    } catch (error: any) {
      console.error("Error testing webhook:", error);
      toast.error("An error occurred while testing the webhook: " + (error.message || "Unknown error"));
    } finally {
      setTestLoading(false);
    }
  };

  return {
    stripeWebhook,
    setStripeWebhook,
    zapierWebhook,
    setZapierWebhook,
    isSaving,
    testLoading,
    handleSaveWebhooks,
    handleTestZapierWebhook
  };
};
