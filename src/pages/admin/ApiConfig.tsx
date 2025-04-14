
import React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Key, 
  ShieldAlert, 
  Link as LinkIcon, 
  AlertCircle, 
  CheckCircle2
} from "lucide-react";
import APIKeysTab from "@/components/admin/APIKeysTab";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ApiConfig() {
  const navigate = useNavigate();
  const [activeApiKeys, setActiveApiKeys] = React.useState({
    stripe: true,
    openai: true,
    twilio: false,
    postmark: true,
    heygen: false
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [webhookDebugEnabled, setWebhookDebugEnabled] = React.useState(false);
  const [apiLogging, setApiLogging] = React.useState(true);
  const [companyId, setCompanyId] = React.useState<string | null>("company-123");

  const [apiKeys, setApiKeys] = React.useState({
    stripe: "sk_test_•••••••••••••••••••••••••",
    twilio_sid: "AC•••••••••••••••••••••••••",
    twilio_token: "••••••••••••••••••••••••••••••",
    heygen: "••••••••••••••••••••••••••••••",
    openai: "sk-•••••••••••••••••••••••••••••"
  });

  const toggleApiKey = (key: string) => {
    setActiveApiKeys(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} API ${!activeApiKeys[key as keyof typeof activeApiKeys] ? 'enabled' : 'disabled'}`);
  };

  const testApiConnection = () => {
    setIsLoading(true);
    // Simulate API test
    setTimeout(() => {
      setIsLoading(false);
      toast.success("API connections tested successfully");
    }, 2000);
  };

  const handleConfigureWebhook = (webhookType: string) => {
    navigate('/admin/webhooks', { state: { activeTab: 'config', selectedWebhook: webhookType } });
  };

  return (
    <>
      <Helmet>
        <title>API Configuration | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">API Configuration</h1>
          <p className="text-muted-foreground mb-4">
            Manage API keys and external service connections.
          </p>
        </div>
        
        <Tabs defaultValue="api-keys" className="space-y-4">
          <TabsList>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys" className="space-y-4">
            <APIKeysTab 
              companyId={companyId} 
              initialApiKeys={apiKeys} 
              isLoading={isLoading} 
            />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Active Integrations</CardTitle>
                <CardDescription>
                  Enable or disable API integrations as needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(activeApiKeys).map(([key, isActive]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {isActive ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-500">Inactive</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/api-integrations?service=${key}`)}
                        >
                          Configure
                        </Button>
                        <Switch 
                          checked={isActive}
                          onCheckedChange={() => toggleApiKey(key)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  <CardTitle>API Security Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure security settings for API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Rate Limiting</h3>
                      <p className="text-sm text-muted-foreground">Limit the number of API requests per minute</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">IP Whitelisting</h3>
                      <p className="text-sm text-muted-foreground">Restrict API access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Key Rotation</h3>
                      <p className="text-sm text-muted-foreground">Automatically rotate API keys every 90 days</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enhanced Logging</h3>
                      <p className="text-sm text-muted-foreground">Enable detailed logging for API requests</p>
                    </div>
                    <Switch 
                      checked={apiLogging}
                      onCheckedChange={setApiLogging}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-blue-500" />
                  <CardTitle>Webhook Configuration</CardTitle>
                </div>
                <CardDescription>
                  Manage incoming and outgoing webhooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Testing Mode Active</AlertTitle>
                    <AlertDescription>
                      Webhook testing mode is currently active. Events will be logged but not fully processed.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Webhook Debugging</h3>
                        <p className="text-sm text-muted-foreground">Enable detailed logging for webhook events</p>
                      </div>
                      <Switch 
                        checked={webhookDebugEnabled}
                        onCheckedChange={setWebhookDebugEnabled}
                      />
                    </div>
                    
                    {webhookDebugEnabled && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Debug Webhook Response</h4>
                        <Textarea 
                          placeholder="Webhook responses will appear here" 
                          className="font-mono text-xs h-32"
                          readOnly
                          value={`{
  "event": "webhook.test",
  "status": "success",
  "timestamp": "2025-04-14T10:23:45Z",
  "data": {
    "company": "Acme Corp",
    "action": "user.created"
  }
}`}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2 mt-4">
                      <h3 className="font-medium">Webhook Endpoints</h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Stripe Webhooks</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConfigureWebhook('stripe')}
                          >
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Zapier Integration</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConfigureWebhook('zapier')}
                          >
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span>GitHub Webhooks</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConfigureWebhook('github')}
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-500" />
                  <CardTitle>Advanced API Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure advanced options for API services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-medium mb-2">API Timeout Settings</h3>
                      <div className="flex space-x-2">
                        <Toggle variant="outline" aria-label="5 seconds" size="sm">5s</Toggle>
                        <Toggle variant="outline" aria-label="10 seconds" size="sm" pressed>10s</Toggle>
                        <Toggle variant="outline" aria-label="30 seconds" size="sm">30s</Toggle>
                        <Toggle variant="outline" aria-label="60 seconds" size="sm">60s</Toggle>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">API Response Format</h3>
                      <div className="flex space-x-2">
                        <Toggle variant="outline" aria-label="JSON" size="sm" pressed>JSON</Toggle>
                        <Toggle variant="outline" aria-label="XML" size="sm">XML</Toggle>
                        <Toggle variant="outline" aria-label="YAML" size="sm">YAML</Toggle>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Error Notification</h3>
                        <p className="text-sm text-muted-foreground">Receive email alerts for API errors</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sandbox Mode</h3>
                        <p className="text-sm text-muted-foreground">Use test environments for all API calls</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={testApiConnection} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <AlertCircle className="mr-2 h-4 w-4 animate-pulse" />
                          Testing Connections...
                        </>
                      ) : (
                        <>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          Test All API Connections
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
