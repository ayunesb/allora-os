
import React from "react";
import { Helmet } from "react-helmet-async";

export default function Account() {
  return (
    <>
      <Helmet>
        <title>Account Settings - Allora AI</title>
      </Helmet>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
        
        <div className="mt-8 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-medium mb-4">Account Information</h2>
          <p>This is a placeholder for the Account page content.</p>
        </div>
      </div>
    </>
  );
}
