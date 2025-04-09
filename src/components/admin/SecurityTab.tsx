
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { useProtectedApi } from '@/hooks/useProtectedApi';
import { Loader2 } from 'lucide-react';

interface SecuritySettingsType {
  twoFactorEnabled: boolean;
  extendedSessionTimeout: boolean;
}

interface SaveSecuritySettingsParams {
  settings: SecuritySettingsType;
}

const saveSecuritySettings = async ({ settings }: SaveSecuritySettingsParams): Promise<boolean> => {
  // Get current system settings
  const { data: settingsData, error: fetchError } = await supabase
    .from('system_settings')
    .select('*')
    .eq('key', 'security_settings')
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 means no rows returned, which is fine if settings don't exist yet
    throw fetchError;
  }

  if (settingsData) {
    // Update existing settings
    const { error: updateError } = await supabase
      .from('system_settings')
      .update({ value: settings })
      .eq('key', 'security_settings');

    if (updateError) {
      throw updateError;
    }
  } else {
    // Insert new settings
    const { error: insertError } = await supabase
      .from('system_settings')
      .insert({ 
        key: 'security_settings',
        value: settings
      });

    if (insertError) {
      throw insertError;
    }
  }

  return true;
};

interface SecurityTabProps {
  initialSettings?: SecuritySettingsType;
}

const SecurityTab = ({ initialSettings }: SecurityTabProps) => {
  const [settings, setSettings] = useState<SecuritySettingsType>(
    initialSettings || {
      twoFactorEnabled: false,
      extendedSessionTimeout: false
    }
  );

  const { execute, isLoading } = useProtectedApi(
    saveSecuritySettings,
    {
      showSuccessToast: true,
      successMessage: "Security settings saved successfully",
      showErrorToast: true
    }
  );

  const handleToggle = (setting: keyof SecuritySettingsType) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    await execute({ settings });
  };

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
          <Switch 
            id="two-factor" 
            checked={settings.twoFactorEnabled}
            onCheckedChange={() => handleToggle('twoFactorEnabled')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="session-timeout">Extended Session Timeout</Label>
            <p className="text-sm text-muted-foreground">
              Increase session duration to 24 hours
            </p>
          </div>
          <Switch 
            id="session-timeout" 
            checked={settings.extendedSessionTimeout}
            onCheckedChange={() => handleToggle('extendedSessionTimeout')}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Security Settings"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
