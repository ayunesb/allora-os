import React, { useState, useEffect } from "react";
import APIKeysTab from "@/components/admin/APIKeysTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
export default function ApiKeysPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [companyId, setCompanyId] = useState(null);
    const [apiKeys, setApiKeys] = useState({
        stripe: "",
        twilio_sid: "",
        twilio_token: "",
        heygen: ""
    });
    // Simulate loading API keys
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setCompanyId("company-123");
                setApiKeys({
                    stripe: "sk_test_sample_key",
                    twilio_sid: "AC0123456789",
                    twilio_token: "auth_token_sample",
                    heygen: "heygen_sample_key"
                });
            }
            catch (error) {
                console.error("Error fetching API keys:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (<div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Configuration</h1>
        <p className="text-muted-foreground">
          Manage API keys and external service configurations.
        </p>
      </div>
      
      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="space-y-4">
          <APIKeysTab companyId={companyId} initialApiKeys={apiKeys} isLoading={isLoading}/>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>API Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for API access
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
