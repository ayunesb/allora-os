import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BellRing, Mail, Phone, MessageSquare, Globe } from "lucide-react";
export default function NotificationsTab() {
    const handleNotificationToggle = (type, value) => {
        toast.success(`${type} notifications ${value ? 'enabled' : 'disabled'}`);
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Mail className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
            </div>
          </div>
          <Switch onCheckedChange={(checked) => handleNotificationToggle('Email', checked)} defaultChecked/>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <BellRing className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
            </div>
          </div>
          <Switch onCheckedChange={(checked) => handleNotificationToggle('Push', checked)} defaultChecked/>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Phone className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive important alerts via text message</p>
            </div>
          </div>
          <Switch onCheckedChange={(checked) => handleNotificationToggle('SMS', checked)}/>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <MessageSquare className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="font-medium">Team Mentions</p>
              <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
            </div>
          </div>
          <Switch onCheckedChange={(checked) => handleNotificationToggle('Team Mentions', checked)} defaultChecked/>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Globe className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="font-medium">Marketing Updates</p>
              <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
            </div>
          </div>
          <Switch onCheckedChange={(checked) => handleNotificationToggle('Marketing', checked)}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Notification Preferences</Button>
      </CardFooter>
    </Card>);
}
