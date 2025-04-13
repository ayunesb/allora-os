
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";

export default function Security() {
  return (
    <>
      <Helmet>
        <title>Security Settings - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Security Settings">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Security Settings</h1>
          <p className="text-muted-foreground">Manage your security settings and authentication preferences</p>
          
          <div className="mt-8 p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-medium mb-4">Security Options</h2>
            <p>This is a placeholder for the Security page content.</p>
          </div>
        </div>
      </PageErrorBoundary>
    </>
  );
}
