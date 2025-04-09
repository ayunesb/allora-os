
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Configure security preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Require 2FA for all admin users
            </p>
          </div>
          <Switch id="two-factor" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="session-timeout">Extended Session Timeout</Label>
            <p className="text-sm text-muted-foreground">
              Increase session duration to 24 hours
            </p>
          </div>
          <Switch id="session-timeout" />
        </div>
        
        <Button>Save Security Settings</Button>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
