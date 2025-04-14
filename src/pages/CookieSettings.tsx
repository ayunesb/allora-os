
import React, { useState, useEffect } from 'react';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck, Cookie } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageErrorBoundary } from '@/components/errorHandling/PageErrorBoundary';

interface CookieSettings {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Load current settings from localStorage
    const storedSettings = localStorage.getItem('cookie-consent');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error('Error parsing cookie settings:', error);
      }
    }
  }, []);

  const handleToggle = (setting: keyof Omit<CookieSettings, 'necessary'>) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(settings));
      toast.success('Cookie preferences saved', {
        description: 'Your cookie settings have been updated.'
      });
      
      // Reset analytics if user opted out
      if (!settings.analytics) {
        // In a real app, you would call a function to reset analytics
        // resetAnalytics();
      }
    } catch (error) {
      console.error('Error saving cookie settings:', error);
      toast.error('Failed to save settings', {
        description: 'Please try again.'
      });
    }
  };

  return (
    <PageErrorBoundary pageName="Cookie Settings">
      <div className="container max-w-4xl py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <PageTitle>Cookie Settings</PageTitle>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
              <CardTitle>Privacy Preferences</CardTitle>
            </div>
            <CardDescription>
              Manage your cookie preferences and control how we use data to enhance your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Cookie className="mr-2 h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="necessary" className="text-base font-medium">Necessary Cookies</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are essential for the website to function properly and cannot be disabled.
                  </p>
                </div>
                <Switch id="necessary" checked disabled />
              </div>

              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Cookie className="mr-2 h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="preferences" className="text-base font-medium">Preferences Cookies</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies allow us to remember choices you make and provide enhanced features.
                  </p>
                </div>
                <Switch 
                  id="preferences" 
                  checked={settings.preferences}
                  onCheckedChange={() => handleToggle('preferences')}
                />
              </div>

              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Cookie className="mr-2 h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="analytics" className="text-base font-medium">Analytics Cookies</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies collect information about how you use our website, helping us improve its functionality.
                  </p>
                </div>
                <Switch 
                  id="analytics" 
                  checked={settings.analytics}
                  onCheckedChange={() => handleToggle('analytics')}
                />
              </div>

              <div className="flex items-center justify-between pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Cookie className="mr-2 h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="marketing" className="text-base font-medium">Marketing Cookies</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to track your browsing habits to deliver advertising more relevant to you and your interests.
                  </p>
                </div>
                <Switch 
                  id="marketing" 
                  checked={settings.marketing}
                  onCheckedChange={() => handleToggle('marketing')}
                />
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" asChild>
                  <Link to="/cookie-policy">View Cookie Policy</Link>
                </Button>
                <Button onClick={handleSave}>Save Preferences</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Privacy Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>For more information on how we process your data, please refer to our:</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/legal/gdpr">GDPR Compliance</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/legal/terms-of-service">Terms of Service</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageErrorBoundary>
  );
};

export default CookieSettingsPage;
