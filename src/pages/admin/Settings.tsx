
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { supabase } from '@/backend/supabase';
import APIKeysTab from '@/components/admin/APIKeysTab';
import WebhooksTab from '@/components/admin/WebhooksTab';
import SecurityTab from '@/components/admin/SecurityTab';
import NotificationsTab from '@/components/admin/NotificationsTab';

export default function AdminSettings() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    stripe: '',
    twilio_sid: '',
    twilio_token: '',
    heygen: ''
  });

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
          
          if (companyData?.details) {
            // Handle the case where details might be a string or an object
            const details = typeof companyData.details === 'string' 
              ? JSON.parse(companyData.details) 
              : companyData.details;
              
            if (details.api_keys) {
              setApiKeys({
                stripe: details.api_keys.stripe || '',
                twilio_sid: details.api_keys.twilio_sid || '',
                twilio_token: details.api_keys.twilio_token || '',
                heygen: details.api_keys.heygen || ''
              });
            }
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
            if (companies[0].details) {
              // Handle the case where details might be a string or an object
              const details = typeof companies[0].details === 'string' 
                ? JSON.parse(companies[0].details) 
                : companies[0].details;
                
              if (details.api_keys) {
                setApiKeys({
                  stripe: details.api_keys.stripe || '',
                  twilio_sid: details.api_keys.twilio_sid || '',
                  twilio_token: details.api_keys.twilio_token || '',
                  heygen: details.api_keys.heygen || ''
                });
              }
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
            <APIKeysTab 
              companyId={companyId} 
              initialApiKeys={apiKeys}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="webhooks">
            <WebhooksTab />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
