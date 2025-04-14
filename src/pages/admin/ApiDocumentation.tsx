
import React from "react";
import { ApiDocumentationPage } from "@/components/help/ApiDocumentation";
import { PageTitle } from "@/components/ui/page-title";

export default function ApiDocumentationPageContainer() {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="API Documentation" 
        description="Reference documentation for integrating with the Allora AI platform API" 
      />
      
      <ApiDocumentationPage />
    </div>
  );
}
