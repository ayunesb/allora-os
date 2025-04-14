
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function CookieSettings() {
  const navigate = useNavigate();
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [performanceCookies, setPerformanceCookies] = useState(true);
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [targetingCookies, setTargetingCookies] = useState(false);
  
  const handleSave = () => {
    // In a real implementation, this would save to localStorage or a cookie
    localStorage.setItem('cookie-preferences', JSON.stringify({
      essential: essentialCookies,
      performance: performanceCookies,
      functional: functionalCookies,
      targeting: targetingCookies,
      lastUpdated: new Date().toISOString()
    }));
    
    // Dispatch an event that the app can listen for
    window.dispatchEvent(new CustomEvent('cookie-preferences-updated', {
      detail: {
        essential: essentialCookies,
        performance: performanceCookies,
        functional: functionalCookies,
        targeting: targetingCookies
      }
    }));
    
    toast.success('Cookie preferences saved', {
      description: 'Your cookie preferences have been updated successfully.'
    });
  };
  
  const handleAcceptAll = () => {
    setEssentialCookies(true);
    setPerformanceCookies(true);
    setFunctionalCookies(true);
    setTargetingCookies(true);
    
    // Save immediately
    localStorage.setItem('cookie-preferences', JSON.stringify({
      essential: true,
      performance: true,
      functional: true,
      targeting: true,
      lastUpdated: new Date().toISOString()
    }));
    
    // Dispatch an event
    window.dispatchEvent(new CustomEvent('cookie-preferences-updated', {
      detail: {
        essential: true,
        performance: true,
        functional: true,
        targeting: true
      }
    }));
    
    toast.success('Accepted all cookies', {
      description: 'All cookie categories have been enabled.'
    });
  };
  
  const handleRejectNonEssential = () => {
    setEssentialCookies(true);
    setPerformanceCookies(false);
    setFunctionalCookies(false);
    setTargetingCookies(false);
    
    // Save immediately
    localStorage.setItem('cookie-preferences', JSON.stringify({
      essential: true,
      performance: false,
      functional: false,
      targeting: false,
      lastUpdated: new Date().toISOString()
    }));
    
    // Dispatch an event
    window.dispatchEvent(new CustomEvent('cookie-preferences-updated', {
      detail: {
        essential: true,
        performance: false,
        functional: false,
        targeting: false
      }
    }));
    
    toast.success('Rejected non-essential cookies', {
      description: 'Only essential cookies have been enabled.'
    });
  };
  
  return (
    <div className="container py-10 max-w-3xl mx-auto px-4 sm:px-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/cookie-policy')} 
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cookie Policy
      </Button>
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-2xl">Cookie Settings</CardTitle>
          <CardDescription>
            Manage how we use cookies on this website
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. You can also choose specific types of cookies below.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="essential-cookies" className="text-base font-medium">Essential Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
              </div>
              <Switch
                id="essential-cookies"
                checked={essentialCookies}
                disabled={true} // Essential cookies cannot be disabled
                aria-readonly="true"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="performance-cookies" className="text-base font-medium">Performance Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                </p>
              </div>
              <Switch
                id="performance-cookies"
                checked={performanceCookies}
                onCheckedChange={setPerformanceCookies}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="functional-cookies" className="text-base font-medium">Functional Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies enable the website to provide enhanced functionality and personalization.
                </p>
              </div>
              <Switch
                id="functional-cookies"
                checked={functionalCookies}
                onCheckedChange={setFunctionalCookies}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="targeting-cookies" className="text-base font-medium">Targeting Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies may be set through our site by our advertising partners to build a profile of your interests.
                </p>
              </div>
              <Switch
                id="targeting-cookies"
                checked={targetingCookies}
                onCheckedChange={setTargetingCookies}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between bg-muted/30 border-t">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={handleRejectNonEssential}
              className="w-full sm:w-auto"
            >
              Reject Non-Essential
            </Button>
            <Button 
              variant="outline" 
              onClick={handleAcceptAll}
              className="w-full sm:w-auto"
            >
              Accept All
            </Button>
          </div>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-primary"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
