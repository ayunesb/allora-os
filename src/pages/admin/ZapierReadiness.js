import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { validateWebhookUrlFormat } from "@/utils/webhookValidation";
export default function ZapierReadiness() {
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState("test");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    // Load webhook URL from localStorage on mount
    useEffect(() => {
        const savedWebhookUrl = localStorage.getItem('zapier_webhook_url');
        if (savedWebhookUrl) {
            setWebhookUrl(savedWebhookUrl);
            validateUrl(savedWebhookUrl);
        }
    }, []);
    const validateUrl = (url) => {
        if (!url) {
            setIsValid(false);
            return;
        }
        const validationResult = validateWebhookUrlFormat(url);
        setIsValid(validationResult);
    };
    const handleSave = () => {
        if (!webhookUrl) {
            toast.error("Please enter a webhook URL");
            return;
        }
        if (isValid !== true) {
            toast.error("Please enter a valid Zapier webhook URL");
            return;
        }
        setIsSaving(true);
        // Sanitize URL before saving
        const sanitizedUrl = webhookUrl.trim();
        // Save to localStorage
        localStorage.setItem('zapier_webhook_url', sanitizedUrl);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Zapier webhook URL saved successfully");
        }, 500);
    };
    return (<>
      <Helmet>
        <title>Zapier Integration Readiness | Allora AI</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Zapier Integration Readiness</h1>
            <p className="text-muted-foreground">
              Verify all Zapier webhooks are correctly configured and firing on business events
            </p>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="test">Webhook Tests</TabsTrigger>
            <TabsTrigger value="config">Configure</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="test" className="space-y-4 mt-6">
            <ZapierReadinessTest webhookUrl={webhookUrl} isValid={isValid}/>
          </TabsContent>
          
          <TabsContent value="config" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Configure Your Zapier Webhook</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="webhookUrl" className="text-sm font-medium">
                    Zapier Webhook URL
                  </label>
                  <Input id="webhookUrl" placeholder="https://hooks.zapier.com/hooks/catch/123456/abcdef/" value={webhookUrl} onChange={(e) => {
            setWebhookUrl(e.target.value);
            validateUrl(e.target.value);
        }} className={`max-w-xl ${isValid === false ? "border-red-500" : ""}`}/>
                  {isValid === false && webhookUrl && (<p className="text-red-500 text-sm">
                      Please enter a valid Zapier webhook URL
                    </p>)}
                </div>
                
                <Button onClick={handleSave} disabled={isSaving || isValid !== true} className="mt-2">
                  {isSaving ? "Saving..." : "Save Webhook URL"}
                </Button>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <h4 className="font-medium mb-2">How to get your Zapier webhook URL:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Log in to your Zapier account</li>
                    <li>Create a new Zap</li>
                    <li>Select "Webhook" as the trigger app</li>
                    <li>Choose "Catch Hook" as the trigger event</li>
                    <li>Copy the webhook URL provided by Zapier</li>
                    <li>Paste it in the field above</li>
                  </ol>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">How to Configure Your Zapier Webhooks</h3>
              
              <div className="space-y-4">
                <p>Allora AI sends webhook events to Zapier for the following events:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Campaign Launched</strong> - Fired when a new marketing campaign is launched</li>
                  <li><strong>Lead Added</strong> - Fired when a new lead is added to the system</li>
                  <li><strong>Strategy Approved</strong> - Fired when a business strategy is approved</li>
                  <li><strong>Lead Converted</strong> - Fired when a lead is converted to a customer</li>
                  <li><strong>Revenue Milestone</strong> - Fired when a revenue milestone is reached</li>
                </ul>
                
                <p className="mt-4">To set up a Zapier webhook:</p>
                
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Log in to your Zapier account and create a new Zap</li>
                  <li>Select "Webhook" as the trigger app</li>
                  <li>Choose "Catch Hook" as the trigger event</li>
                  <li>Copy the webhook URL provided by Zapier</li>
                  <li>Go to the "Configure" tab and paste the URL in the Zapier webhook field</li>
                  <li>Set up your desired action in Zapier (e.g., send an email, create a task)</li>
                  <li>Test the webhook using the tests on the "Webhook Tests" tab</li>
                </ol>
                
                <p className="mt-4">For company-specific configuration, please contact your account administrator.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>);
}
