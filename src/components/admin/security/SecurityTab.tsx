
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useProtectedApi } from '@/hooks/useProtectedApi';
import { logSystemChange } from '@/utils/auditLogger';
import { useAuth } from '@/context/AuthContext';
import { SecuritySettingsType } from './types';
import { fetchSecuritySettings, saveSecuritySettings } from './securityService';
import SecurityToggleItem from './SecurityToggleItem';

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
    const loadSettings = async () => {
      if (!initialSettings) {
        try {
          const data = await fetchSecuritySettings();
          setSettings(data);
        } catch (error) {
          toast.error("Failed to load security settings");
        }
      }
    };
    
    loadSettings();
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
        <SecurityToggleItem
          id="two-factor"
          title="Two-Factor Authentication"
          description="Require 2FA for all admin users"
          icon={Lock}
          checked={settings.twoFactorEnabled}
          onCheckedChange={() => handleToggle('twoFactorEnabled')}
        />
        
        <SecurityToggleItem
          id="session-timeout"
          title="Extended Session Timeout"
          description="Increase session duration to 24 hours"
          icon={Key}
          checked={settings.extendedSessionTimeout}
          onCheckedChange={() => handleToggle('extendedSessionTimeout')}
        />
        
        <SecurityToggleItem
          id="content-security"
          title="Strict Content Security"
          description="Enable strict Content Security Policy"
          icon={Shield}
          checked={settings.strictContentSecurity}
          onCheckedChange={() => handleToggle('strictContentSecurity')}
        />
        
        <SecurityToggleItem
          id="api-protection"
          title="Enhanced API Protection"
          description="Enable rate limiting and additional API security measures"
          icon={Key}
          checked={settings.enhancedApiProtection}
          onCheckedChange={() => handleToggle('enhancedApiProtection')}
        />
        
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
