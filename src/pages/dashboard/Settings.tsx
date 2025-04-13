
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { runTestCompanySetup } from "@/utils/company/test";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { BellRing, Globe, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import MarketingPlatformIntegrations from "@/components/integrations/MarketingPlatformIntegrations";
import { LinkedInIntegration } from "@/components/linkedin/LinkedInIntegration";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState<string>("");
  const [apiMethod, setApiMethod] = useState<string>("GET");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [apiHeaders, setApiHeaders] = useState<string>("{\n  \"Content-Type\": \"application/json\"\n}");
  const [apiBody, setApiBody] = useState<string>("{}");
  const { preferences, isLoading: prefsLoading, updatePreference } = useUserPreferences();

  const handleSetupTestCompany = async () => {
    if (!user?.email) {
      toast.error("User email not available");
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await runTestCompanySetup(user.email);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error in test company setup:", error);
      toast.error("Failed to set up test company");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiTest = async () => {
    if (!apiEndpoint) {
      toast.error("API endpoint is required");
      return;
    }

    setIsTestingApi(true);
    setApiResponse("");
    
    try {
      // Prepare headers
      let headers = {};
      try {
        headers = JSON.parse(apiHeaders);
      } catch (e) {
        toast.error("Invalid JSON format in headers");
        return;
      }
      
      // Prepare body for POST, PUT, PATCH
      let bodyData = undefined;
      if (["POST", "PUT", "PATCH"].includes(apiMethod)) {
        try {
          bodyData = JSON.parse(apiBody);
        } catch (e) {
          toast.error("Invalid JSON format in request body");
          return;
        }
      }
      
      // Make the request
      const response = await fetch(apiEndpoint, {
        method: apiMethod,
        headers,
        body: bodyData ? JSON.stringify(bodyData) : undefined,
      });
      
      // Get response as text first
      const responseText = await response.text();
      
      // Try to parse as JSON for pretty display
      try {
        const responseJson = JSON.parse(responseText);
        setApiResponse(JSON.stringify(responseJson, null, 2));
      } catch (e) {
        // If not valid JSON, show as text
        setApiResponse(responseText);
      }
      
      toast.success(`API request completed with status: ${response.status}`);
    } catch (error: any) {
      console.error("API test error:", error);
      setApiResponse(`Error: ${error.message}`);
      toast.error(`API request failed: ${error.message}`);
    } finally {
      setIsTestingApi(false);
    }
  };

  const handleNotificationToggle = (type: string, value: boolean) => {
    toast.success(`${type} notifications ${value ? 'enabled' : 'disabled'}`);
  };

  const handleDatabaseTest = async () => {
    setIsLoading(true);
    try {
      const result = await checkSupabaseConnection();
      
      if (result.connected) {
        toast.success(result.message || "Database connection successful");
      } else {
        toast.error(result.message || "Database connection failed");
      }
      
      console.log("Database connection test result:", result);
    } catch (error: any) {
      console.error("Database test error:", error);
      toast.error(`Database test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2 py-1 rounded-md flex items-center text-xs font-medium">
          <ShieldAlert className="h-3.5 w-3.5 mr-1" />
          Admin Only
        </div>
      </div>
      <p className="text-muted-foreground mb-8">Manage system preferences and settings</p>

      <Tabs defaultValue="account">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled />
                  <p className="text-xs text-muted-foreground">Your account email cannot be changed</p>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                  </div>
                </div>
                <Switch 
                  onCheckedChange={(checked) => handleNotificationToggle('Email', checked)}
                  defaultChecked
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BellRing className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                  </div>
                </div>
                <Switch 
                  onCheckedChange={(checked) => handleNotificationToggle('Push', checked)}
                  defaultChecked
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive important alerts via text message</p>
                  </div>
                </div>
                <Switch 
                  onCheckedChange={(checked) => handleNotificationToggle('SMS', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Team Mentions</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
                  </div>
                </div>
                <Switch 
                  onCheckedChange={(checked) => handleNotificationToggle('Team Mentions', checked)} 
                  defaultChecked
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                  </div>
                </div>
                <Switch 
                  onCheckedChange={(checked) => handleNotificationToggle('Marketing', checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="grid gap-8">
            <MarketingPlatformIntegrations />
            
            <LinkedInIntegration />
          </div>
        </TabsContent>
        
        <TabsContent value="development">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Tools</CardTitle>
                <CardDescription>Tools for testing and debugging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Test Data</h3>
                  <p className="text-muted-foreground mb-4">
                    Set up test company data for the current user.
                  </p>
                  <Button 
                    onClick={handleSetupTestCompany} 
                    disabled={isLoading}
                  >
                    {isLoading ? "Setting up..." : "Set Up Test Company"}
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Database Connection Test</h3>
                  <p className="text-muted-foreground mb-4">
                    Verify your connection to the database.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleDatabaseTest} 
                    disabled={isLoading}
                  >
                    {isLoading ? "Testing..." : "Test Database Connection"}
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">API Testing</h3>
                  <p className="text-muted-foreground mb-4">
                    Test API endpoints and view responses.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input 
                        id="api-endpoint" 
                        placeholder="https://api.example.com/data" 
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="api-method">Method</Label>
                      <Select value={apiMethod} onValueChange={setApiMethod}>
                        <SelectTrigger id="api-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="api-headers">Headers (JSON)</Label>
                      <Textarea 
                        id="api-headers" 
                        placeholder='{"Content-Type": "application/json"}'
                        value={apiHeaders}
                        onChange={(e) => setApiHeaders(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    {["POST", "PUT", "PATCH"].includes(apiMethod) && (
                      <div className="grid gap-2">
                        <Label htmlFor="api-body">Request Body (JSON)</Label>
                        <Textarea 
                          id="api-body" 
                          placeholder='{"key": "value"}'
                          value={apiBody}
                          onChange={(e) => setApiBody(e.target.value)}
                          rows={5}
                        />
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleApiTest} 
                      disabled={isTestingApi || !apiEndpoint}
                    >
                      {isTestingApi ? "Testing..." : "Test API"}
                    </Button>
                    
                    {apiResponse && (
                      <div className="mt-4">
                        <Label htmlFor="api-response">Response</Label>
                        <div className="mt-2 p-4 bg-secondary/20 rounded-md overflow-auto max-h-80">
                          <pre id="api-response" className="text-sm whitespace-pre-wrap">
                            {apiResponse}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
