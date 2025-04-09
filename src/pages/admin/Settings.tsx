
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const [stripeKey, setStripeKey] = useState('');
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [heygenKey, setHeygenKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the current company data to get its ID
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        // First try to get the company ID from the user's profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', session.user.id)
          .single();
        
        if (profileData?.company_id) {
          setCompanyId(profileData.company_id);
          
          // Now fetch the existing API keys if they exist
          const { data: companyData } = await supabase
            .from('companies')
            .select('details')
            .eq('id', profileData.company_id)
            .single();
            
          if (companyData?.details?.api_keys) {
            const apiKeys = companyData.details.api_keys;
            setStripeKey(apiKeys.stripe || '');
            setTwilioSid(apiKeys.twilio_sid || '');
            setTwilioToken(apiKeys.twilio_token || '');
            setHeygenKey(apiKeys.heygen || '');
          }
        } else {
          // If no company is associated, get the first company (for demo purposes)
          const { data: companies } = await supabase
            .from('companies')
            .select('id, details')
            .limit(1);
            
          if (companies && companies.length > 0) {
            setCompanyId(companies[0].id);
            
            // Load existing API keys if they exist
            if (companies[0].details?.api_keys) {
              const apiKeys = companies[0].details.api_keys;
              setStripeKey(apiKeys.stripe || '');
              setTwilioSid(apiKeys.twilio_sid || '');
              setTwilioToken(apiKeys.twilio_token || '');
              setHeygenKey(apiKeys.heygen || '');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleSaveApiConfiguration = async () => {
    if (!companyId) {
      toast.error("No company found to save settings");
      return;
    }
    
    setIsSaving(true);
    try {
      // First, get the current details to preserve other data
      const { data: currentCompany } = await supabase
        .from('companies')
        .select('details')
        .eq('id', companyId)
        .single();
      
      // Prepare the updated details object, preserving existing data
      const updatedDetails = {
        ...(currentCompany?.details || {}),
        api_keys: {
          stripe: stripeKey,
          twilio_sid: twilioSid,
          twilio_token: twilioToken,
          heygen: heygenKey
        }
      };
      
      // Update the company record with the new details
      const { error } = await supabase
        .from('companies')
        .update({ 
          details: updatedDetails
        })
        .eq('id', companyId);
      
      if (error) throw error;
      
      toast.success("API configuration saved successfully");
    } catch (error) {
      console.error("Error saving API configuration:", error);
      toast.error("Failed to save API configuration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure the Allora AI platform
          </p>
        </div>
        
        <Tabs defaultValue="api-keys">
          <TabsList className="mb-6">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>
                  Manage integration keys for external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2">Loading configuration...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-key">Stripe API Key</Label>
                      <Input 
                        id="stripe-key" 
                        type="password" 
                        placeholder="sk_test_..." 
                        value={stripeKey}
                        onChange={(e) => setStripeKey(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                      <Input 
                        id="twilio-sid" 
                        placeholder="AC..." 
                        value={twilioSid}
                        onChange={(e) => setTwilioSid(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                      <Input 
                        id="twilio-token" 
                        type="password" 
                        placeholder="********" 
                        value={twilioToken}
                        onChange={(e) => setTwilioToken(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="heygen-key">Heygen API Key</Label>
                      <Input 
                        id="heygen-key" 
                        type="password" 
                        placeholder="********" 
                        value={heygenKey}
                        onChange={(e) => setHeygenKey(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSaveApiConfiguration}
                      disabled={isSaving || !companyId}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save API Configuration"
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Configure webhook endpoints for events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Stripe Webhook URL</Label>
                  <Input id="stripe-webhook" placeholder="https://your-domain.com/api/webhooks/stripe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                  <Input id="zapier-webhook" placeholder="https://hooks.zapier.com/hooks/catch/..." />
                </div>
                
                <Button>Save Webhook Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
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
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email for important system events
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send text messages for critical alerts
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
