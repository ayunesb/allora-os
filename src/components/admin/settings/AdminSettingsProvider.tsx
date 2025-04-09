
import React, { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/backend/supabase';
import { Loader2 } from 'lucide-react';

interface ApiKeys {
  stripe: string;
  twilio_sid: string;
  twilio_token: string;
  heygen: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  extendedSessionTimeout: boolean;
}

interface AdminSettingsContextProps {
  companyId: string | null;
  isLoading: boolean;
  apiKeys: ApiKeys;
  securitySettings: SecuritySettings;
}

interface AdminSettingsProviderProps {
  children: (context: AdminSettingsContextProps) => ReactNode;
}

const AdminSettingsProvider: React.FC<AdminSettingsProviderProps> = ({ children }) => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    stripe: '',
    twilio_sid: '',
    twilio_token: '',
    heygen: ''
  });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    extendedSessionTimeout: false
  });

  // Fetch the current company data to get its ID and settings
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
        
        let currentCompanyId = profileData?.company_id;
        
        if (currentCompanyId) {
          setCompanyId(currentCompanyId);
          
          // Now fetch the existing settings if they exist
          const { data: companyData } = await supabase
            .from('companies')
            .select('details')
            .eq('id', currentCompanyId)
            .single();
          
          if (companyData?.details) {
            // Handle the case where details might be a string or an object
            const details = typeof companyData.details === 'string' 
              ? JSON.parse(companyData.details) 
              : companyData.details;
              
            // Set API keys if they exist
            if (details.api_keys) {
              setApiKeys({
                stripe: details.api_keys.stripe || '',
                twilio_sid: details.api_keys.twilio_sid || '',
                twilio_token: details.api_keys.twilio_token || '',
                heygen: details.api_keys.heygen || ''
              });
            }
            
            // Set security settings if they exist
            if (details.security_settings) {
              setSecuritySettings({
                twoFactorEnabled: details.security_settings.twoFactorEnabled || false,
                extendedSessionTimeout: details.security_settings.extendedSessionTimeout || false
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
            currentCompanyId = companies[0].id;
            setCompanyId(currentCompanyId);
            
            // Load existing settings if they exist
            if (companies[0].details) {
              // Handle the case where details might be a string or an object
              const details = typeof companies[0].details === 'string' 
                ? JSON.parse(companies[0].details) 
                : companies[0].details;
              
              // Set API keys if they exist  
              if (details.api_keys) {
                setApiKeys({
                  stripe: details.api_keys.stripe || '',
                  twilio_sid: details.api_keys.twilio_sid || '',
                  twilio_token: details.api_keys.twilio_token || '',
                  heygen: details.api_keys.heygen || ''
                });
              }
              
              // Set security settings if they exist
              if (details.security_settings) {
                setSecuritySettings({
                  twoFactorEnabled: details.security_settings.twoFactorEnabled || false,
                  extendedSessionTimeout: details.security_settings.extendedSessionTimeout || false
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {children({
        companyId,
        isLoading,
        apiKeys,
        securitySettings
      })}
    </>
  );
};

export default AdminSettingsProvider;
