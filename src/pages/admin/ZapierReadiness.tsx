
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";

export default function ZapierReadiness() {
  const { profile } = useAuth();
  
  return (
    <>
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
        
        <Tabs defaultValue="test" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test">Webhook Tests</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          <TabsContent value="test" className="space-y-4 mt-6">
            <ZapierReadinessTest />
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
                  <li>Go to your Allora AI admin settings and paste the URL in the Zapier webhook field</li>
                  <li>Set up your desired action in Zapier (e.g., send an email, create a task)</li>
                  <li>Test the webhook using the tests on this page</li>
                </ol>
                
                <p className="mt-4">For company-specific configuration, please contact your account administrator.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
