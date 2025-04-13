
import React, { useState, useEffect } from "react";
import APIKeysTab from "@/components/admin/APIKeysTab";
import { Helmet } from "react-helmet-async";

export default function ApiKeyManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState({
    stripe: "",
    twilio_sid: "",
    twilio_token: "",
    heygen: ""
  });
  
  // Simulate loading API keys
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompanyId("company-123");
        setApiKeys({
          stripe: "sk_test_sample_key",
          twilio_sid: "AC0123456789",
          twilio_token: "auth_token_sample",
          heygen: "heygen_sample_key"
        });
      } catch (error) {
        console.error("Error fetching API keys:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>API Key Management | Allora AI</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">API Key Management</h1>
          <p className="text-muted-foreground mb-4">
            Configure API keys for integration with external services.
          </p>
        </div>
        
        <APIKeysTab 
          companyId={companyId} 
          initialApiKeys={apiKeys} 
          isLoading={isLoading} 
        />
      </div>
    </>
  );
}
