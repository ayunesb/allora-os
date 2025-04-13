
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { testWebhook, sanitizeWebhookUrl, validateWebhookUrlFormat } from '@/utils/webhookValidation';
import { WebhookType } from '@/utils/webhookValidation';
import { useWebhookStorage } from './useWebhookStorage';

/**
 * Custom hook to manage webhook configurations
 * Provides state management and validation for different webhook types
 */
export function useWebhooks() {
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  const [githubWebhook, setGithubWebhook] = useState<string>('');
  const [slackWebhook, setSlackWebhook] = useState<string>('');
  const [customWebhook, setCustomWebhook] = useState<string>('');
  
  const [testingWebhook, setTestingWebhook] = useState<WebhookType | null>(null);
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  const { saveWebhookSettings, loadWebhookSettings } = useWebhookStorage();
  
  // Load stored webhook settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await loadWebhookSettings();
      if (settings) {
        setStripeWebhook(settings.stripe || '');
        setZapierWebhook(settings.zapier || '');
        setGithubWebhook(settings.github || '');
        setSlackWebhook(settings.slack || '');
        setCustomWebhook(settings.custom || '');
      }
    };
    
    loadSettings();
  }, []);
  
  /**
   * Test a webhook URL with error handling and feedback
   */
  const testWebhookUrl = useCallback(async (url: string, type: WebhookType, isValid: boolean): Promise<boolean> => {
    if (!isValid) {
      toast.error(`Invalid ${type} webhook URL`);
      return false;
    }
    
    setTestingWebhook(type);
    setTestLoading(true);
    
    try {
      const result = await testWebhook(url, type);
      
      if (result.success) {
        toast.success(`${type} webhook test successful`);
        return true;
      } else {
        toast.error(`${type} webhook test failed: ${result.message || 'Unknown error'}`);
        return false;
      }
    } catch (error) {
      console.error(`Error testing ${type} webhook:`, error);
      toast.error(`Failed to test ${type} webhook`);
      return false;
    } finally {
      setTestingWebhook(null);
      setTestLoading(false);
    }
  }, []);
  
  /**
   * Handlers for testing different webhook types
   */
  const handleTestStripeWebhook = useCallback((isValid: boolean) => {
    return testWebhookUrl(stripeWebhook, 'stripe', isValid);
  }, [stripeWebhook, testWebhookUrl]);
  
  const handleTestZapierWebhook = useCallback((isValid: boolean) => {
    return testWebhookUrl(zapierWebhook, 'zapier', isValid);
  }, [zapierWebhook, testWebhookUrl]);
  
  const handleTestGithubWebhook = useCallback((isValid: boolean) => {
    return testWebhookUrl(githubWebhook, 'github', isValid);
  }, [githubWebhook, testWebhookUrl]);
  
  const handleTestSlackWebhook = useCallback((isValid: boolean) => {
    return testWebhookUrl(slackWebhook, 'slack', isValid);
  }, [slackWebhook, testWebhookUrl]);
  
  const handleTestCustomWebhook = useCallback((isValid: boolean) => {
    return testWebhookUrl(customWebhook, 'custom', isValid);
  }, [customWebhook, testWebhookUrl]);
  
  /**
   * Save all webhook configurations
   */
  const handleSaveWebhooks = useCallback(async (
    isStripeWebhookValid: boolean,
    isZapierWebhookValid: boolean,
    isGithubWebhookValid: boolean,
    isSlackWebhookValid: boolean,
    isCustomWebhookValid: boolean
  ) => {
    setIsSaving(true);
    
    try {
      // Sanitize URLs before saving
      const sanitizedStripeWebhook = isStripeWebhookValid ? sanitizeWebhookUrl(stripeWebhook, 'stripe') : '';
      const sanitizedZapierWebhook = isZapierWebhookValid ? sanitizeWebhookUrl(zapierWebhook, 'zapier') : '';
      const sanitizedGithubWebhook = isGithubWebhookValid ? sanitizeWebhookUrl(githubWebhook, 'github') : '';
      const sanitizedSlackWebhook = isSlackWebhookValid ? sanitizeWebhookUrl(slackWebhook, 'slack') : '';
      const sanitizedCustomWebhook = isCustomWebhookValid ? sanitizeWebhookUrl(customWebhook, 'custom') : '';
      
      // Save to storage/database
      await saveWebhookSettings({
        stripe: sanitizedStripeWebhook,
        zapier: sanitizedZapierWebhook,
        github: sanitizedGithubWebhook,
        slack: sanitizedSlackWebhook,
        custom: sanitizedCustomWebhook
      });
      
      toast.success('Webhook settings saved successfully');
    } catch (error) {
      console.error('Error saving webhook settings:', error);
      toast.error('Failed to save webhook settings');
    } finally {
      setIsSaving(false);
    }
  }, [
    stripeWebhook,
    zapierWebhook,
    githubWebhook,
    slackWebhook,
    customWebhook,
    saveWebhookSettings
  ]);
  
  // Update validation to use validateWebhookUrlFormat
  const validateWebhookUrl = useCallback((url: string, type: WebhookType) => {
    return validateWebhookUrlFormat(url, type);
  }, []);
  
  return {
    // Webhook values
    stripeWebhook,
    zapierWebhook,
    githubWebhook,
    slackWebhook,
    customWebhook,
    
    // Setters
    setStripeWebhook,
    setZapierWebhook,
    setGithubWebhook,
    setSlackWebhook,
    setCustomWebhook,
    
    // State
    isSaving,
    testLoading,
    testingWebhook,
    
    // Handlers
    handleSaveWebhooks,
    handleTestStripeWebhook,
    handleTestZapierWebhook,
    handleTestGithubWebhook,
    handleTestSlackWebhook,
    handleTestCustomWebhook,
    
    // Validation
    validateWebhookUrl
  };
}
