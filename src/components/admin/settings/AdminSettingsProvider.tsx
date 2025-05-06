import React, { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { Loader2 } from "lucide-react";
const AdminSettingsProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    stripe: "",
    twilio_sid: "",
    twilio_token: "",
    heygen: "",
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    extendedSessionTimeout: false,
    strictContentSecurity: false,
    enhancedApiProtection: false,
  });
  // Fetch the settings data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch the current user's company ID for API keys
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("company_id")
            .eq("id", session.user.id)
            .single();
          const currentCompanyId = profileData?.company_id;
          setCompanyId(currentCompanyId);
          // Fetch API keys if company ID is available
          if (currentCompanyId) {
            const { data: companyData } = await supabase
              .from("companies")
              .select("details")
              .eq("id", currentCompanyId)
              .single();
            if (companyData?.details) {
              const details =
                typeof companyData.details === "string"
                  ? JSON.parse(companyData.details)
                  : companyData.details;
              // Set API keys if they exist
              if (details.api_keys) {
                setApiKeys({
                  stripe: details.api_keys.stripe || "",
                  twilio_sid: details.api_keys.twilio_sid || "",
                  twilio_token: details.api_keys.twilio_token || "",
                  heygen: details.api_keys.heygen || "",
                });
              }
            }
          } else {
            // If no company is found, try to get the first one for API keys
            const { data: companies } = await supabase
              .from("companies")
              .select("id, details")
              .limit(1);
            if (companies && companies.length > 0) {
              setCompanyId(companies[0].id);
              // Load existing API keys if they exist
              if (companies[0].details) {
                const details =
                  typeof companies[0].details === "string"
                    ? JSON.parse(companies[0].details)
                    : companies[0].details;
                if (details.api_keys) {
                  setApiKeys({
                    stripe: details.api_keys.stripe || "",
                    twilio_sid: details.api_keys.twilio_sid || "",
                    twilio_token: details.api_keys.twilio_token || "",
                    heygen: details.api_keys.heygen || "",
                  });
                }
              }
            }
          }
        }
        // Fetch global security settings using Supabase RPC
        const { data: securityData, error: securityError } = await supabase.rpc(
          "get_security_settings",
        );
        if (securityError) {
          console.error("Error fetching security settings:", securityError);
        } else {
          setSecuritySettings(
            securityData || {
              twoFactorEnabled: false,
              extendedSessionTimeout: false,
              strictContentSecurity: false,
              enhancedApiProtection: false,
            },
          );
        }
      } catch (error) {
        console.error("Error fetching settings data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
        securitySettings,
      })}
    </>
  );
};
export default AdminSettingsProvider;
