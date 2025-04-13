
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
import { BellRing, Globe, Mail, MessageSquare, Phone } from "lucide-react";
import MarketingPlatformIntegrations from "@/components/integrations/MarketingPlatformIntegrations";
import { LinkedInIntegration } from "@/components/linkedin/LinkedInIntegration";

export default function Settings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleNotificationToggle = (type: string, value: boolean) => {
    toast.success(`${type} notifications ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your preferences and system settings</p>

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
                <h3 className="text-lg font-medium mb-2">API Testing</h3>
                <p className="text-muted-foreground">
                  API testing tools will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
