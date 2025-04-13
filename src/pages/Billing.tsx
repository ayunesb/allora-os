
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";

export default function Billing() {
  return (
    <>
      <Helmet>
        <title>Billing & Subscription - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Billing & Subscription">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription plan and billing information</p>
          
          <div className="mt-8 p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-medium mb-4">Subscription Details</h2>
            <p>This is a placeholder for the Billing page content.</p>
          </div>
        </div>
      </PageErrorBoundary>
    </>
  );
}
