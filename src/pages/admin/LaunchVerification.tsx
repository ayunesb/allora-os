
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedVerificationChecklist } from "@/components/admin/launch-verification/EnhancedVerificationChecklist";

export default function LaunchVerification() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Launch Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify all system components before launching
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <EnhancedVerificationChecklist />
      </div>
    </div>
  );
}
