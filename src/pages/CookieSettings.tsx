import React, { useState, useEffect } from 'react';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cookie, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
export default function CookieSettings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        necessary: true,
        analytics: false,
        preferences: false,
        marketing: false
    });
    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem('cookie-consent');
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                setSettings({
                    necessary: true, // Always true
                    analytics: parsedSettings.analytics || false,
                    preferences: parsedSettings.preferences || false,
                    marketing: parsedSettings.marketing || false
                });
            }
        }
        catch (error) {
            console.error('Error loading cookie settings:', error);
        }
    }, []);
    const handleToggle = (category) => {
        if (category === 'necessary')
            return; // Can't toggle necessary cookies
        setSettings(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };
    const handleSave = () => {
        try {
            localStorage.setItem('cookie-consent', JSON.stringify(settings));
            toast.success('Cookie preferences saved');
        }
        catch (error) {
            console.error('Error saving cookie settings:', error);
            toast.error('Failed to save cookie preferences');
        }
    };
    const handleAcceptAll = () => {
        const allEnabled = {
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true
        };
        setSettings(allEnabled);
        localStorage.setItem('cookie-consent', JSON.stringify(allEnabled));
        toast.success('All cookies accepted');
    };
    return (<div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2"/>
          Back
        </Button>
        <PageTitle title="Cookie Settings">Cookie Settings</PageTitle>
      </div>

      <Card className="mb-8">
        <CardHeader className="border-b border-border">
          <div className="flex items-center mb-2">
            <Cookie className="mr-2 h-5 w-5 text-primary"/>
            <CardTitle>Cookie Settings</CardTitle>
          </div>
          <CardDescription>
            Manage how we use cookies and similar technologies on our website
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="necessary" className="font-medium">Necessary Cookies</Label>
                  <p className="text-sm text-muted-foreground">Essential for the website to function properly. Cannot be disabled.</p>
                </div>
                <Switch id="necessary" checked={true} disabled/>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website.</p>
                </div>
                <Switch id="analytics" checked={settings.analytics} onCheckedChange={() => handleToggle('analytics')}/>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="preferences" className="font-medium">Preference Cookies</Label>
                  <p className="text-sm text-muted-foreground">Allow the website to remember your preferences and settings.</p>
                </div>
                <Switch id="preferences" checked={settings.preferences} onCheckedChange={() => handleToggle('preferences')}/>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
                  <p className="text-sm text-muted-foreground">Used to track visitors across websites for displaying relevant advertisements.</p>
                </div>
                <Switch id="marketing" checked={settings.marketing} onCheckedChange={() => handleToggle('marketing')}/>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary"/>
            <CardTitle>Privacy Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">For more information about how we use cookies and your personal data, please check our:</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" asChild>
              <Link to="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/gdpr-compliance">GDPR Compliance</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleAcceptAll}>
          Accept All
        </Button>
        <Button onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>);
}
