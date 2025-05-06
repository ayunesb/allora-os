import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
export const WebhookConfigForm = ({
  webhookType,
  onWebhookTypeChange,
  stripeWebhook = "",
  stripeSecret = "",
  zapierWebhook = "",
  githubWebhook = "",
  githubSecret = "",
  slackWebhook = "",
  customWebhook = "",
  stripeValid = false,
  zapierValid = false,
  githubValid = false,
  slackValid = false,
  customValid = false,
  onSave,
  onDelete,
  onTest,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={webhookType} onValueChange={onWebhookTypeChange}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="zapier">Zapier</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="slack">Slack</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="stripe" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-webhook">Webhook ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="stripe-webhook"
                    placeholder="whsec_..."
                    value={stripeWebhook}
                  />
                  {stripeValid && <Check className="text-green-500 mt-2" />}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Secret Key</Label>
                <Input
                  id="stripe-secret"
                  placeholder="sk_..."
                  type="password"
                  value={stripeSecret}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.("stripe")}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTest?.("stripe")}
              >
                Test
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  onSave?.("stripe", {
                    webhook: stripeWebhook,
                    secret: stripeSecret,
                  })
                }
              >
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="zapier" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="zapier-webhook">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="zapier-webhook"
                  placeholder="https://hooks.zapier.com/..."
                  value={zapierWebhook}
                />
                {zapierValid && <Check className="text-green-500 mt-2" />}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.("zapier")}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTest?.("zapier")}
              >
                Test
              </Button>
              <Button
                size="sm"
                onClick={() => onSave?.("zapier", { webhook: zapierWebhook })}
              >
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github-webhook">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="github-webhook"
                    placeholder="https://api.github.com/repos/..."
                    value={githubWebhook}
                  />
                  {githubValid && <Check className="text-green-500 mt-2" />}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="github-secret">Secret Key</Label>
                <Input
                  id="github-secret"
                  placeholder="GitHub webhook secret"
                  type="password"
                  value={githubSecret}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.("github")}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTest?.("github")}
              >
                Test
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  onSave?.("github", {
                    webhook: githubWebhook,
                    secret: githubSecret,
                  })
                }
              >
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="slack" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="slack-webhook">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="slack-webhook"
                  placeholder="https://hooks.slack.com/services/..."
                  value={slackWebhook}
                />
                {slackValid && <Check className="text-green-500 mt-2" />}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.("slack")}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTest?.("slack")}
              >
                Test
              </Button>
              <Button
                size="sm"
                onClick={() => onSave?.("slack", { webhook: slackWebhook })}
              >
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="custom-webhook">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-webhook"
                  placeholder="https://your-api.com/webhook"
                  value={customWebhook}
                />
                {customValid && <Check className="text-green-500 mt-2" />}
              </div>
              <p className="text-sm text-muted-foreground">
                Custom webhooks can be used to integrate with any service that
                accepts HTTP requests.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.("custom")}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTest?.("custom")}
              >
                Test
              </Button>
              <Button
                size="sm"
                onClick={() => onSave?.("custom", { webhook: customWebhook })}
              >
                Save
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
