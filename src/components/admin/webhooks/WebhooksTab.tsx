
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useWebhooks } from "@/hooks/useWebhooks";
import { validateWebhookUrlFormat, testWebhook } from "@/utils/webhookValidation";
import { WebhookType } from "@/types/unified-types";

interface WebhookFormData {
  url: string;
  webhookType: WebhookType;
}

export function WebhooksTab() {
  const [activeTab, setActiveTab] = useState("zapier");
  const [formData, setFormData] = useState<WebhookFormData>({
    url: "",
    webhookType: "zapier",
  });

  const { webhooks, isLoading, saveWebhook, error } = useWebhooks();

  useEffect(() => {
    // Pre-fill form if there's an existing webhook of the selected type
    const existingWebhook = webhooks.find(
      (webhook) => webhook.type === activeTab
    );
    if (existingWebhook) {
      setFormData({
        url: existingWebhook.url || "",
        webhookType: existingWebhook.type as WebhookType,
      });
    } else {
      setFormData({
        url: "",
        webhookType: activeTab as WebhookType,
      });
    }
  }, [activeTab, webhooks]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, url: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL format
    const isValidUrl = validateWebhookUrlFormat(formData.url);
    if (!isValidUrl) {
      toast.error("Please enter a valid webhook URL starting with https://");
      return;
    }

    try {
      await saveWebhook({
        url: formData.url,
        type: formData.webhookType,
      });
      toast.success(`${formData.webhookType} webhook saved successfully`);
    } catch (err) {
      toast.error(
        `Error saving webhook: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };

  const handleTestWebhook = async () => {
    // Validate URL format first
    const isValidUrl = validateWebhookUrlFormat(formData.url);
    if (!isValidUrl) {
      toast.error("Please enter a valid webhook URL starting with https://");
      return;
    }

    toast.info("Testing webhook connection...");
    
    try {
      const result = await testWebhook(formData.url);
      if (result.success) {
        toast.success("Webhook test successful!");
      } else {
        toast.error(`Webhook test failed: ${result.message}`);
      }
    } catch (err) {
      toast.error(
        `Error testing webhook: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };

  return (
    <Tabs defaultValue="zapier" value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="zapier">Zapier</TabsTrigger>
        <TabsTrigger value="stripe">Stripe</TabsTrigger>
        <TabsTrigger value="slack">Slack</TabsTrigger>
        <TabsTrigger value="github">GitHub</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      
      {/* Zapier Content */}
      <TabsContent value="zapier">
        <Card>
          <CardHeader>
            <CardTitle>Zapier Webhook</CardTitle>
            <CardDescription>
              Connect your Zapier zaps to receive events from Allora
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="zapier-webhook">Webhook URL</Label>
                  <Input
                    id="zapier-webhook"
                    placeholder="https://hooks.zapier.com/hooks/catch/your-webhook-id"
                    value={formData.url}
                    onChange={handleUrlChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleTestWebhook}>
                Test Connection
              </Button>
              <Button type="submit">Save Webhook</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* Stripe Content */}
      <TabsContent value="stripe">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Webhook</CardTitle>
            <CardDescription>
              Receive payment and subscription events from Stripe
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stripe-webhook">Webhook URL</Label>
                  <Input
                    id="stripe-webhook"
                    placeholder="https://api.stripe.com/webhook-endpoint"
                    value={formData.url}
                    onChange={handleUrlChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleTestWebhook}>
                Test Connection
              </Button>
              <Button type="submit">Save Webhook</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* Slack Content */}
      <TabsContent value="slack">
        <Card>
          <CardHeader>
            <CardTitle>Slack Webhook</CardTitle>
            <CardDescription>
              Send notifications to your Slack workspace
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slack-webhook">Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    placeholder="https://hooks.slack.com/services/your-webhook-id"
                    value={formData.url}
                    onChange={handleUrlChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleTestWebhook}>
                Test Connection
              </Button>
              <Button type="submit">Save Webhook</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* GitHub Content */}
      <TabsContent value="github">
        <Card>
          <CardHeader>
            <CardTitle>GitHub Webhook</CardTitle>
            <CardDescription>
              Trigger GitHub actions or workflows
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="github-webhook">Webhook URL</Label>
                  <Input
                    id="github-webhook"
                    placeholder="https://api.github.com/repos/owner/repo/hooks"
                    value={formData.url}
                    onChange={handleUrlChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleTestWebhook}>
                Test Connection
              </Button>
              <Button type="submit">Save Webhook</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* Custom Webhook Content */}
      <TabsContent value="custom">
        <Card>
          <CardHeader>
            <CardTitle>Custom Webhook</CardTitle>
            <CardDescription>
              Connect to any custom webhook endpoint
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="custom-webhook">Webhook URL</Label>
                  <Input
                    id="custom-webhook"
                    placeholder="https://your-custom-endpoint.com/webhook"
                    value={formData.url}
                    onChange={handleUrlChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleTestWebhook}>
                Test Connection
              </Button>
              <Button type="submit">Save Webhook</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
