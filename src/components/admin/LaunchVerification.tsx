
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { validateLaunchReadiness } from '@/utils/launchValidator';
import { CheckCircle2, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { addDemoDataButton } from '@/utils/demoData';
import { useAuth } from '@/context/AuthContext';

export default function LaunchVerification() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const { profile } = useAuth();
  
  const runChecks = async () => {
    setIsChecking(true);
    try {
      const validation = await validateLaunchReadiness();
      setResults(validation.results);
      setIsReady(validation.valid);
    } catch (error) {
      console.error("Error during launch verification:", error);
      setIsReady(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleAddDemoData = async () => {
    setIsAddingDemo(true);
    try {
      await addDemoDataButton(profile?.company_id);
    } finally {
      setIsAddingDemo(false);
    }
  };
  
  return (
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
        {results && (
          <div className="space-y-3">
            {Object.entries(results).map(([key, result]: [string, any]) => (
              <div key={key} className={`p-3 rounded-md ${result.valid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="flex items-start gap-2">
                  {result.valid ? 
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> : 
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  }
                  <div>
                    <p className={`font-medium ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className={`text-sm ${result.valid ? 'text-green-600' : 'text-red-600'}`}>{result.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!results && !isChecking && (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-muted-foreground mb-4 text-center">
              Run a comprehensive check to verify all systems are ready for production
            </p>
          </div>
        )}
        
        {isChecking && (
          <div className="flex flex-col items-center justify-center py-6">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Running verification checks...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={runChecks} 
          disabled={isChecking}
          className="w-full"
        >
          {isChecking ? 'Checking...' : results ? 'Run Checks Again' : 'Run Pre-Launch Checks'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleAddDemoData}
          disabled={isAddingDemo}
          className="w-full sm:w-auto"
        >
          <Database className="mr-2 h-4 w-4" />
          {isAddingDemo ? 'Adding...' : 'Add Demo Data'}
        </Button>
      </CardFooter>
    </Card>
  );
}
