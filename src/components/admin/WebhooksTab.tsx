
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Webhook, WebhookOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useZapier } from '@/lib/zapier';
import { sanitizeUrl } from '@/utils/sanitizers';

const WebhooksTab = () => {
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const { triggerWorkflow } = useZapier();
  
  // Validation states
  const [isStripeWebhookValid, setIsStripeWebhookValid] = useState<boolean | null>(null);
  const [isZapierWebhookValid, setIsZapierWebhookValid] = useState<boolean | null>(null);

  // Load webhooks from localStorage on mount
  useEffect(() => {
    const savedStripeWebhook = localStorage.getItem('stripe_webhook_url');
    const savedZapierWebhook = localStorage.getItem('zapier_webhook_url');
    
    if (savedStripeWebhook) {
      setStripeWebhook(savedStripeWebhook);
      validateUrl(savedStripeWebhook, 'stripe');
    }
    
    if (savedZapierWebhook) {
      setZapierWebhook(savedZapierWebhook);
      validateUrl(savedZapierWebhook, 'zapier');
    }
  }, []);

  // URL validation function
  const validateUrl = (url: string, type: 'stripe' | 'zapier'): boolean => {
    if (!url.trim()) {
      if (type === 'stripe') setIsStripeWebhookValid(null);
      else setIsZapierWebhookValid(null);
      return false;
    }
    
    try {
      // Use the sanitizeUrl utility to sanitize and validate the URL
      const sanitized = sanitizeUrl(url);
      const isValid = !!sanitized && new URL(sanitized).toString() === sanitized;
      
      // Additional specific validation
      if (type === 'zapier') {
        const isZapierUrl = sanitized.includes('hooks.zapier.com');
        setIsZapierWebhookValid(isValid && isZapierUrl);
        if (isValid && !isZapierUrl) {
          console.warn('URL is valid but does not appear to be a Zapier webhook');
        }
        return isValid && isZapierUrl;
      } else {
        setIsStripeWebhookValid(isValid);
        return isValid;
      }
    } catch (e) {
      if (type === 'stripe') setIsStripeWebhookValid(false);
      else setIsZapierWebhookValid(false);
      return false;
    }
  };

  const handleStripeWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStripeWebhook(value);
    validateUrl(value, 'stripe');
  };

  const handleZapierWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZapierWebhook(value);
    validateUrl(value, 'zapier');
  };

  const handleSaveWebhooks = () => {
    // Validate URLs before saving
    const isStripeValid = !stripeWebhook || validateUrl(stripeWebhook, 'stripe');
    const isZapierValid = !zapierWebhook || validateUrl(zapierWebhook, 'zapier');
    
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

  const handleTestZapierWebhook = async () => {
    if (!zapierWebhook) {
      toast.error("Please enter a Zapier webhook URL first");
      return;
    }

    if (!validateUrl(zapierWebhook, 'zapier')) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Webhooks
        </CardTitle>
        <CardDescription>
          Configure webhook endpoints for events and integrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
          <div className="flex items-center gap-2">
            <Webhook className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Stripe Webhook</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stripe-webhook" className="flex items-center gap-2">
              Stripe Webhook URL
              {isStripeWebhookValid === false && 
                <AlertTriangle className="h-4 w-4 text-destructive" title="Invalid URL format" />
              }
              {isStripeWebhookValid === true && 
                <CheckCircle2 className="h-4 w-4 text-green-500" title="Valid URL format" />
              }
            </Label>
            <Input 
              id="stripe-webhook" 
              placeholder="https://your-domain.com/api/webhooks/stripe" 
              value={stripeWebhook}
              onChange={handleStripeWebhookChange}
              className={isStripeWebhookValid === false ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Enter the URL where Stripe should send webhook events. This is used for payment processing.
            </p>
          </div>
        </div>
        
        <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
          <div className="flex items-center gap-2">
            <Webhook className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Zapier Integration</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zapier-webhook" className="flex items-center gap-2">
              Zapier Webhook URL
              {isZapierWebhookValid === false && 
                <AlertTriangle className="h-4 w-4 text-destructive" title="Invalid Zapier webhook URL" />
              }
              {isZapierWebhookValid === true && 
                <CheckCircle2 className="h-4 w-4 text-green-500" title="Valid Zapier webhook URL" />
              }
            </Label>
            <Input 
              id="zapier-webhook" 
              placeholder="https://hooks.zapier.com/hooks/catch/..." 
              value={zapierWebhook}
              onChange={handleZapierWebhookChange}
              className={isZapierWebhookValid === false ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Enter your Zapier webhook URL to automate workflows when events occur in the platform.
            </p>
            {isZapierWebhookValid === false && zapierWebhook && (
              <p className="text-xs text-destructive">
                This does not appear to be a valid Zapier webhook URL. It should start with https://hooks.zapier.com/
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestZapierWebhook}
              disabled={testLoading || !zapierWebhook || isZapierWebhookValid !== true}
            >
              {testLoading ? "Testing..." : "Test Webhook"}
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
        
        <Button 
          onClick={handleSaveWebhooks} 
          disabled={isSaving || (isStripeWebhookValid === false) || (isZapierWebhookValid === false)}
        >
          {isSaving ? "Saving..." : "Save Webhook Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
