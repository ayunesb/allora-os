
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { useProtectedApi } from '@/hooks/useProtectedApi';
import { Loader2, Shield, Lock, Key } from 'lucide-react';
import { logSystemChange } from '@/utils/auditLogger';
import { useAuth } from '@/context/AuthContext';

interface SecuritySettingsType {
  twoFactorEnabled: boolean;
  extendedSessionTimeout: boolean;
  strictContentSecurity: boolean;
  enhancedApiProtection: boolean;
}

interface SaveSecuritySettingsParams {
  settings: SecuritySettingsType;
}

const saveSecuritySettings = async ({ settings }: SaveSecuritySettingsParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('update_security_settings', {
      p_settings: settings
    });
    
    if (error) throw error;
    
    return data;
  } catch (error: any) {
    console.error("Error saving security settings:", error.message);
    throw new Error(error.message || "Failed to save security settings");
  }
};

interface SecurityTabProps {
  initialSettings?: SecuritySettingsType;
}

const SecurityTab = ({ initialSettings }: SecurityTabProps) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SecuritySettingsType>(
    initialSettings || {
      twoFactorEnabled: false,
      extendedSessionTimeout: false,
      strictContentSecurity: false,
      enhancedApiProtection: false
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
    try {
      await execute({ settings });
      
      // Log the security change
      if (user) {
        await logSystemChange(
          user.id, 
          'security_settings', 
          'Security settings updated',
          { settings }
        );
      }
    } catch (error) {
      console.error("Failed to save security settings:", error);
    }
  };

  // Fetch settings if not provided
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      if (!initialSettings) {
        try {
          const { data, error } = await supabase.rpc('get_security_settings');
          
          if (error) throw error;
          
          setSettings(data || {
            twoFactorEnabled: false,
            extendedSessionTimeout: false,
            strictContentSecurity: false,
            enhancedApiProtection: false
          });
        } catch (error: any) {
          console.error("Error fetching security settings:", error.message);
          toast.error("Failed to load security settings");
        }
      }
    };
    
    fetchSecuritySettings();
  }, [initialSettings]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Security Settings</CardTitle>
        </div>
        <CardDescription>
          Configure security preferences for your organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex items-center">
            <Lock className="h-4 w-4 mr-2 text-primary" />
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin users
              </p>
            </div>
          </div>
          <Switch 
            id="two-factor" 
            checked={settings.twoFactorEnabled}
            onCheckedChange={() => handleToggle('twoFactorEnabled')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex items-center">
            <Key className="h-4 w-4 mr-2 text-primary" />
            <div>
              <Label htmlFor="session-timeout">Extended Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Increase session duration to 24 hours
              </p>
            </div>
          </div>
          <Switch 
            id="session-timeout" 
            checked={settings.extendedSessionTimeout}
            onCheckedChange={() => handleToggle('extendedSessionTimeout')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            <div>
              <Label htmlFor="content-security">Strict Content Security</Label>
              <p className="text-sm text-muted-foreground">
                Enable strict Content Security Policy
              </p>
            </div>
          </div>
          <Switch 
            id="content-security" 
            checked={settings.strictContentSecurity}
            onCheckedChange={() => handleToggle('strictContentSecurity')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex items-center">
            <Key className="h-4 w-4 mr-2 text-primary" />
            <div>
              <Label htmlFor="api-protection">Enhanced API Protection</Label>
              <p className="text-sm text-muted-foreground">
                Enable rate limiting and additional API security measures
              </p>
            </div>
          </div>
          <Switch 
            id="api-protection" 
            checked={settings.enhancedApiProtection}
            onCheckedChange={() => handleToggle('enhancedApiProtection')}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full"
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
