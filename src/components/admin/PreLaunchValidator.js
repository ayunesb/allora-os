import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { validateProductionReadiness } from '@/utils/launchValidator';
import { toast } from 'sonner';
export default function PreLaunchValidator() {
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const runValidation = async () => {
        setIsValidating(true);
        try {
            const result = await validateProductionReadiness();
            setValidationResult(result);
            if (result.ready) {
                toast.success("All production readiness checks passed! 🚀");
            }
            else {
                toast.error(`${result.issues.length} issues found that need to be fixed before going live`);
            }
        }
        catch (error) {
            console.error("Validation error:", error);
            toast.error("Failed to complete readiness validation");
        }
        finally {
            setIsValidating(false);
        }
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Production Readiness Validator</CardTitle>
        <CardDescription>
          Verify that your application is ready for production
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {validationResult ? (<div className="space-y-4">
            <div className={`p-4 rounded-lg border ${validationResult.ready
                ? 'bg-green-50 border-green-200'
                : 'bg-amber-50 border-amber-200'}`}>
              {validationResult.ready ? (<div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                  <div>
                    <h3 className="font-medium text-green-800">Ready for Production!</h3>
                    <p className="text-sm text-green-700">
                      All validation checks have passed. Your application is ready to go live.
                    </p>
                  </div>
                </div>) : (<div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5"/>
                  <div>
                    <h3 className="font-medium text-amber-800">Not Ready for Production</h3>
                    <p className="text-sm text-amber-700">
                      {validationResult.issues.length} issue(s) need to be resolved before going live.
                    </p>
                  </div>
                </div>)}
            </div>
            
            {validationResult.issues.length > 0 && (<div className="space-y-2">
                <h3 className="font-medium">Issues to Resolve:</h3>
                {validationResult.issues.map((issue, index) => (<Alert key={index} variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                    <XCircle className="h-4 w-4 text-red-500"/>
                    <AlertTitle>Issue #{index + 1}</AlertTitle>
                    <AlertDescription>{issue.message}</AlertDescription>
                  </Alert>))}
              </div>)}
            
            {validationResult.passedChecks.length > 0 && (<div className="space-y-2">
                <h3 className="font-medium">Passed Checks:</h3>
                {validationResult.passedChecks.map((check, index) => (<Alert key={index} variant="default" className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500"/>
                    <AlertDescription>{check.message}</AlertDescription>
                  </Alert>))}
              </div>)}
          </div>) : (<div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Run a production readiness check to verify that your application is ready for launch.
              This will validate authentication, database, security settings, and API connections.
            </p>
          </div>)}
      </CardContent>
      
      <CardFooter>
        <Button onClick={runValidation} disabled={isValidating} className="w-full">
          {isValidating ? (<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Running Validation...
            </>) : ('Validate Production Readiness')}
        </Button>
      </CardFooter>
    </Card>);
}
