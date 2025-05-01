
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { VerificationContent } from './launch-verification/VerificationContent';
import { VerificationActions } from './launch-verification/VerificationActions';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useVerification } from '@/hooks/admin/useVerification';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';

export default function LaunchVerification() {
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  const companyId = auth.user?.company_id || null;
  
  const {
    isChecking,
    results,
    isReady,
    isAddingDemo,
    isVerifyingTables,
    isCheckingIndexes,
    isVerifyingRLS,
    isVerifyingFunctions,
    runChecks,
    handleAddDemoData,
    verifyRequiredTables,
    checkDatabaseIndexes,
    verifyRLSPolicies,
    verifyDatabaseFunctions
  } = useVerification(companyId);
  
  return (
    <ErrorBoundary>
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Launch Readiness Verification
            {isReady === true && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {isReady === false && <AlertCircle className="h-5 w-5 text-red-500" />}
          </CardTitle>
          <CardDescription>
            Verify that all critical systems are working correctly before launch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationContent 
            results={results} 
            isChecking={isChecking} 
          />
        </CardContent>
        <CardFooter>
          <VerificationActions 
            isChecking={isChecking}
            isAddingDemo={isAddingDemo}
            isVerifyingTables={isVerifyingTables}
            isCheckingIndexes={isCheckingIndexes}
            isVerifyingRLS={isVerifyingRLS}
            isVerifyingFunctions={isVerifyingFunctions}
            onRunChecks={runChecks}
            onAddDemoData={handleAddDemoData}
            onVerifyTables={verifyRequiredTables}
            onCheckIndexes={checkDatabaseIndexes}
            onVerifyRLS={verifyRLSPolicies}
            onVerifyFunctions={verifyDatabaseFunctions}
            hasResults={results !== null}
          />
        </CardFooter>
      </Card>
    </ErrorBoundary>
  );
}
