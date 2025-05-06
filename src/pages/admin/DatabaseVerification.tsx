import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatabaseVerificationDashboard } from "@/components/admin/database-verification";
import { useDatabaseVerification } from "@/hooks/admin/useDatabaseVerification";
export default function DatabaseVerification() {
  const { verificationResult, verifyDatabaseConfiguration } =
    useDatabaseVerification();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Database Verification</CardTitle>
          <CardDescription>
            Verify and manage your database configuration for Allora AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DatabaseVerificationDashboard
            result={verificationResult}
            onVerify={verifyDatabaseConfiguration}
          />
        </CardContent>
      </Card>
    </div>
  );
}
