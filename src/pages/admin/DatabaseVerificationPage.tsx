
import React from "react";
import { DatabaseVerificationDashboard } from "@/components/admin/database-verification";

export default function DatabaseVerificationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Database Verification</h1>
      <p className="text-muted-foreground">
        Verify database structure, tables, and functionality.
      </p>
      
      <DatabaseVerificationDashboard />
    </div>
  );
}
