
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Webhook, WebhookOff } from "lucide-react";
import { useZapier } from '@/lib/zapier';

const WebhooksTab = () => {
  const [stripeWebhook, setStripeWebhook] = useState<string>('');
  const [zapierWebhook, setZapierWebhook] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const { triggerWorkflow } = useZapier();

  // Load webhooks from localStorage on mount
  React.useEffect(() => {
    const savedStripeWebhook = localStorage.getItem('stripe_webhook_url');
    const savedZapierWebhook = localStorage.getItem('zapier_webhook_url');
    
    if (savedStripeWebhook) setStripeWebhook(savedStripeWebhook);
    if (savedZapierWebhook) setZapierWebhook(savedZapierWebhook);
  }, []);

  const handleSaveWebhooks = () => {
    setIsSaving(true);
    
    // Save to localStorage (in a real app, you would save to a database)
    localStorage.setItem('stripe_webhook_url', stripeWebhook);
    localStorage.setItem('zapier_webhook_url', zapierWebhook);
    
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
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast.error("An error occurred while testing the webhook");
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
            <Label htmlFor="stripe-webhook">Stripe Webhook URL</Label>
            <Input 
              id="stripe-webhook" 
              placeholder="https://your-domain.com/api/webhooks/stripe" 
              value={stripeWebhook}
              onChange={(e) => setStripeWebhook(e.target.value)}
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
            <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
            <Input 
              id="zapier-webhook" 
              placeholder="https://hooks.zapier.com/hooks/catch/..." 
              value={zapierWebhook}
              onChange={(e) => setZapierWebhook(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter your Zapier webhook URL to automate workflows when events occur in the platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestZapierWebhook}
              disabled={testLoading || !zapierWebhook}
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
        
        <Button onClick={handleSaveWebhooks} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Webhook Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
