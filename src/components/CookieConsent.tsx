import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Info, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
const CookieConsent = () => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false
    });
    const [hasConsented, setHasConsented] = useState(false);
    const [isEU, setIsEU] = useState(false);
    useEffect(() => {
        // Check for existing consent
        const consent = localStorage.getItem('cookie-consent');
        if (consent) {
            setHasConsented(true);
            setSettings(JSON.parse(consent));
            return;
        }
        // Detect if user is in EU (simplified version - would use IP geolocation in production)
        const detectEU = async () => {
            try {
                // For demo purposes, randomly determine if the user is in the EU
                // In a real app, you would use a geolocation service based on IP
                const euUser = Math.random() > 0.5; // Simulate 50% chance of EU user
                setIsEU(euUser);
                // Show the banner for all users until they make a choice, for compliance reasons
                setTimeout(() => setOpen(true), 1000);
            }
            catch (error) {
                console.error('Error detecting location:', error);
                // If we can't detect, assume EU to be safe
                setIsEU(true);
                setTimeout(() => setOpen(true), 1000);
            }
        };
        detectEU();
    }, []);
    const handleAcceptAll = () => {
        const allSettings = {
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true
        };
        localStorage.setItem('cookie-consent', JSON.stringify(allSettings));
        setSettings(allSettings);
        setHasConsented(true);
        setOpen(false);
        toast.success('All cookies accepted', {
            description: 'Your preferences have been saved.'
        });
    };
    const handleAcceptNecessary = () => {
        const necessaryOnly = {
            necessary: true,
            preferences: false,
            analytics: false,
            marketing: false
        };
        localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
        setSettings(necessaryOnly);
        setHasConsented(true);
        setOpen(false);
        toast.success('Necessary cookies accepted', {
            description: 'Only necessary cookies will be used.'
        });
    };
    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(settings));
        setHasConsented(true);
        setOpen(false);
        toast.success('Cookie preferences saved', {
            description: 'Your custom preferences have been saved.'
        });
    };
    const toggleSetting = (setting) => {
        if (setting === 'necessary')
            return; // Can't toggle necessary cookies
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };
    if (!open)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg mx-auto border-primary/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary"/>
              <CardTitle>Cookie Settings</CardTitle>
            </div>
          </div>
          <CardDescription>
            This website uses cookies to enhance your browsing experience, analyze site usage, and assist in our marketing efforts.
            See our <Link to="/cookie-policy" className="underline">Cookie Policy</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link> for details.
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple" className="py-4 px-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Info className="h-5 w-5 text-blue-500 mt-0.5"/>
                <div>
                  <h4 className="text-sm font-medium">We Value Your Privacy</h4>
                  <p className="text-sm text-muted-foreground">
                    We use necessary cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Shield className="h-5 w-5 text-green-500 mt-0.5"/>
                <div>
                  <h4 className="text-sm font-medium">Your Choices Matter</h4>
                  <p className="text-sm text-muted-foreground">
                    You can choose to accept or decline cookies. Necessary cookies are always enabled as they are essential for the website to function properly.
                  </p>
                </div>
              </div>
              
              {isEU && (<div className="flex items-start gap-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5"/>
                  <div>
                    <h4 className="text-sm font-medium">GDPR Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      We detect that you may be browsing from the European Union, where GDPR regulations apply. Please make a cookie selection to continue.
                    </p>
                  </div>
                </div>)}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="py-4 px-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="necessary" className="text-base">Necessary Cookies</Label>
                  <p className="text-xs text-muted-foreground">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <Switch id="necessary" checked disabled/>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="preferences" className="text-base">Preference Cookies</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow the website to remember choices you have made.
                  </p>
                </div>
                <Switch id="preferences" checked={settings.preferences} onCheckedChange={() => toggleSetting('preferences')}/>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics" className="text-base">Analytics Cookies</Label>
                  <p className="text-xs text-muted-foreground">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <Switch id="analytics" checked={settings.analytics} onCheckedChange={() => toggleSetting('analytics')}/>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing" className="text-base">Marketing Cookies</Label>
                  <p className="text-xs text-muted-foreground">
                    Used to track visitors across websites for advertising purposes.
                  </p>
                </div>
                <Switch id="marketing" checked={settings.marketing} onCheckedChange={() => toggleSetting('marketing')}/>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex-col sm:flex-row gap-2 bg-muted/20 p-4">
          <Button variant="outline" onClick={handleAcceptNecessary} className="w-full sm:w-auto">
            Necessary Only
          </Button>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="default" onClick={handleAcceptAll} className="flex-1">
              Accept All
            </Button>
            
            <Button variant="secondary" onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>);
};
export default CookieConsent;
