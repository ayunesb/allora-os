import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Check, 
  ExternalLink, 
  FileText, 
  Link2,
  MoreHorizontal, 
  Plug, 
  RefreshCw,
  Shield, 
  Wrench
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentGenerator } from "@/components/integrations/DocumentGenerator";

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("crm");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveWebhook = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Webhook URL saved successfully");
      setIsLoading(false);
    }, 1000);
  };

  const handleConnect = (platform: string) => {
    toast.success(`Initiating connection to ${platform}...`);
    // In a real implementation, this would redirect to the platform's OAuth flow
  };

  const handleZapierTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast.error("Please enter your Zapier webhook URL");
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          event_type: "integration_test",
        }),
      });

      toast.success("Request sent to Zapier. Check your Zap's history to confirm it was triggered.");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast.error("Failed to trigger the Zapier webhook. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect Allora AI with your favorite platforms and services
          </p>
        </div>
        <Button variant="outline" className="gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh Connections
        </Button>
      </div>

      <Tabs defaultValue="crm" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="crm">CRM Systems</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Platforms</TabsTrigger>
          <TabsTrigger value="documents">Document Generation</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & APIs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Salesforce", status: "connected", icon: <Shield className="h-8 w-8 text-blue-600" /> },
              { name: "HubSpot", status: "not-connected", icon: <Shield className="h-8 w-8 text-orange-500" /> },
              { name: "Zoho CRM", status: "not-connected", icon: <Shield className="h-8 w-8 text-green-500" /> },
              { name: "Pipedrive", status: "not-connected", icon: <Shield className="h-8 w-8 text-green-600" /> },
              { name: "Microsoft Dynamics", status: "not-connected", icon: <Shield className="h-8 w-8 text-blue-500" /> }
            ].map((crm) => (
              <Card key={crm.name} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Connection Details</DropdownMenuItem>
                      <DropdownMenuItem>Sync Data</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {crm.icon}
                    <div>
                      <CardTitle className="text-base">{crm.name}</CardTitle>
                      <CardDescription>
                        {crm.status === 'connected' ? 'Connected & Syncing' : 'Not Connected'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2">
                    {crm.status === 'connected' ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="mr-1 h-3 w-3" /> Connected
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">Last synced: 27 minutes ago</p>
                        <div className="flex mt-4 space-x-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <RefreshCw className="mr-1 h-3 w-3" /> Sync Now
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">Settings</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => handleConnect(crm.name)} className="w-full mt-2">
                        <Plug className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>CRM Integration Benefits</CardTitle>
              <CardDescription>
                Connecting your CRM system enables these powerful features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 md:grid-cols-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Automatic lead import and synchronization</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>AI-enhanced lead scoring based on CRM data</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Campaign performance tracking in CRM</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Smarter insights using historical CRM data</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Google Ads", status: "connected", icon: <Shield className="h-8 w-8 text-blue-600" /> },
              { name: "Meta Ads", status: "not-connected", icon: <Shield className="h-8 w-8 text-blue-500" /> },
              { name: "LinkedIn Ads", status: "not-connected", icon: <Shield className="h-8 w-8 text-blue-700" /> },
              { name: "TikTok Ads", status: "not-connected", icon: <Shield className="h-8 w-8 text-black" /> },
              { name: "Mailchimp", status: "connected", icon: <Shield className="h-8 w-8 text-yellow-500" /> }
            ].map((platform) => (
              <Card key={platform.name} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Connection Details</DropdownMenuItem>
                      <DropdownMenuItem>Sync Data</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {platform.icon}
                    <div>
                      <CardTitle className="text-base">{platform.name}</CardTitle>
                      <CardDescription>
                        {platform.status === 'connected' ? 'Connected & Active' : 'Not Connected'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2">
                    {platform.status === 'connected' ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="mr-1 h-3 w-3" /> Connected
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">Last synced: 2 hours ago</p>
                        <div className="flex mt-4 space-x-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <RefreshCw className="mr-1 h-3 w-3" /> Sync Now
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">Settings</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => handleConnect(platform.name)} className="w-full mt-2">
                        <Plug className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Platform Benefits</CardTitle>
              <CardDescription>
                Connect your marketing platforms to enhance your campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 md:grid-cols-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>AI-optimized ad copy and creative suggestions</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Unified campaign performance analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Cross-platform audience optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Campaign budget recommendations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <DocumentGenerator />
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="mr-2 h-5 w-5" />
                  Zapier Integration
                </CardTitle>
                <CardDescription>
                  Connect Allora AI to 3,000+ apps with Zapier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleZapierTrigger} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Create a "Webhook" trigger in Zapier and paste the URL here
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={isLoading || !webhookUrl}>
                      {isLoading ? "Sending..." : "Test Webhook"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleSaveWebhook} disabled={isLoading}>
                      Save
                    </Button>
                  </div>
                </form>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Popular Zapier use cases:</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Send new Allora AI strategies to Slack
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Create tasks in Asana from AI recommendations
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Add new leads to your email marketing platform
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link2 className="mr-2 h-5 w-5" />
                  API Access
                </CardTitle>
                <CardDescription>
                  Access Allora AI via our RESTful API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      type="password"
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none" variant="secondary">
                      Show
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this API key to authenticate requests to the Allora AI API
                  </p>
                </div>
                
                <div className="pt-2 space-y-2">
                  <h4 className="text-sm font-medium">API Documentation</h4>
                  <Button variant="outline" className="w-full text-sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View API Documentation
                  </Button>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Available API Endpoints:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• /api/strategies - Get AI business strategies</li>
                    <li>• /api/leads - Manage your leads</li>
                    <li>• /api/analytics - Access business analytics</li>
                    <li>• /api/recommendations - Get AI recommendations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
