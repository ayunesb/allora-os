// Import the existing code and add proper props for ZapierReadinessTest
import React from "react";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";
export default function ApiIntegrations() {
    // Example webhook URL and validation state
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/123456/abcdef/";
    const isValid = true;
    return (<div>
      <h1>API Integrations</h1>
      <div className="mt-6">
        <h2>Zapier Integration</h2>
        <div className="mt-4">
          <ZapierReadinessTest webhookUrl={webhookUrl} isValid={isValid}/>
        </div>
      </div>
    </div>);
}
