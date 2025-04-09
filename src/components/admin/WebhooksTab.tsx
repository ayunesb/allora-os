
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WebhooksTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhooks</CardTitle>
        <CardDescription>
          Configure webhook endpoints for events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="stripe-webhook">Stripe Webhook URL</Label>
          <Input id="stripe-webhook" placeholder="https://your-domain.com/api/webhooks/stripe" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
          <Input id="zapier-webhook" placeholder="https://hooks.zapier.com/hooks/catch/..." />
        </div>
        
        <Button>Save Webhook Settings</Button>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
