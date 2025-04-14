
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Shield, Database, Info } from 'lucide-react';
import { toast } from "sonner";
import { useProductionData } from '@/hooks/useProductionData';
import { ProductionDataStatus } from '@/components/admin/system/ProductionDataStatus';
import { ValidationResults } from '@/utils/productionDataValidator';
import { validateAndCleanProductionData } from '@/utils/productionDataValidator';

export default function ProductionDataPage() {
  const [isManualValidating, setIsManualValidating] = useState(false);
  const [manualResults, setManualResults] = useState<ValidationResults | null>(null);
  const { isValidating, validationResults, validateProductionData } = useProductionData();

  const runManualValidation = useCallback(async () => {
    setIsManualValidating(true);
    try {
      const results = await validateAndCleanProductionData();
      setManualResults(results);
      
      if (results.success) {
        if (results.cleanupPerformed) {
          toast.success('Production data cleaned successfully', {
            description: `Removed ${results.warnings.length} test/demo items`
          });
        } else {
          toast.success('Production data validated successfully', {
            description: 'No issues found'
          });
        }
      } else {
        toast.error('Production data validation failed', {
          description: `Found ${results.errors.length} critical issues`
        });
      }
    } catch (error: any) {
      console.error('Error during manual validation:', error);
      toast.error('Validation process error', {
        description: error.message
      });
    } finally {
      setIsManualValidating(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Production Data</h2>
          <p className="text-muted-foreground">
            Verify and clean your database before going to production
          </p>
        </div>
        <ShieldCheck className="h-8 w-8 text-primary" />
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 gap-6">
        <ProductionDataStatus 
          validationResults={manualResults || validationResults} 
          isValidating={isManualValidating || isValidating}
          onValidate={runManualValidation}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Production Readiness Guide
            </CardTitle>
            <CardDescription>
              Ensure your application is ready for production use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Clean Production Data</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ensure all test, demo, and sample data is removed from the system before launching into production.
                      The data validator above will scan and clean your database of test entries.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Data Security</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verify that all security measures are in place, including proper authentication, 
                      authorization checks, and data access controls. Row-level security policies in the database
                      ensure users can only access their own data.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Why This Matters</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Professional Launch — Investors, clients, and users will trust the system when it's personalized.<br />
                      Security — Real users must not see data belonging to other users or fake placeholders.<br />
                      Scalability — Makes it easier to plug real workflows like Zapier, Twilio, Shopify because they expect live business context.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
