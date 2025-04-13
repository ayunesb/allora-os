
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";

export default function Notifications() {
  return (
    <>
      <Helmet>
        <title>Notifications - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Notifications">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Notifications</h1>
          <p className="text-muted-foreground">Manage your notification preferences and view recent alerts</p>
          
          <div className="mt-8 p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-medium mb-4">Notification Settings</h2>
            <p>This is a placeholder for the Notifications page content.</p>
          </div>
        </div>
      </PageErrorBoundary>
    </>
  );
}
