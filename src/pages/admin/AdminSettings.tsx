import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
export default function AdminSettings() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <TypographyH1>Admin Settings</TypographyH1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="Allora AI" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Support Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="support@example.com"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <Switch id="maintenance-mode" />
              </div>

              <Button className="mt-2">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enforce-2fa">Enforce 2FA for Admins</Label>
                <Switch id="enforce-2fa" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="activity-logging">
                  Advanced Activity Logging
                </Label>
                <Switch id="activity-logging" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ip-restriction">IP Restriction</Label>
                <Switch id="ip-restriction" />
              </div>

              <Button className="mt-2">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-rate-limit">
                  API Rate Limit (requests/min)
                </Label>
                <Input id="api-rate-limit" type="number" defaultValue="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <Switch id="debug-mode" />
              </div>

              <Button className="mt-2">Save Advanced Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
