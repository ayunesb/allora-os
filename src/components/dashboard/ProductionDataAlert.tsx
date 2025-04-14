
import React from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ValidationResults } from '@/utils/productionDataValidator';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductionDataAlertProps {
  isValidating: boolean;
  validationResults: ValidationResults | null;
  onRevalidate: () => void;
  isVisible: boolean;
}

export function ProductionDataAlert({ 
  isValidating, 
  validationResults, 
  onRevalidate,
  isVisible
}: ProductionDataAlertProps) {
  if (!isVisible) return null;
  
  // Show loading state while validating
  if (isValidating) {
    return (
      <Alert className="mb-6">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <AlertTitle>Validating Production Data</AlertTitle>
        <AlertDescription>
          Checking all records to ensure production readiness...
        </AlertDescription>
      </Alert>
    );
  }
  
  // If no validation has been run yet
  if (!validationResults) {
    return null;
  }
  
  // Show success state if validation passed
  if (validationResults.success) {
    return (
      <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Production Ready</AlertTitle>
        <AlertDescription>
          All data validation checks passed successfully.
          {validationResults.warnings.length > 0 && (
            <div className="mt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="warnings">
                  <AccordionTrigger className="text-sm">
                    {validationResults.warnings.length} Warnings Found
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-xs space-y-1 mt-2 max-h-40 overflow-y-auto">
                      {validationResults.warnings.map((warning, index) => (
                        <li key={index} className="text-amber-600">
                          {warning.message}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          <div className="mt-2">
            <Button size="sm" variant="outline" onClick={onRevalidate}>
              Run Validation Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Show error state if validation failed
  return (
    <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-950">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle>Production Validation Failed</AlertTitle>
      <AlertDescription>
        Critical errors found that need to be addressed:
        <ul className="text-xs space-y-1 mt-2 max-h-40 overflow-y-auto">
          {validationResults.errors.map((error, index) => (
            <li key={index} className="text-red-600">
              {error.message}
            </li>
          ))}
        </ul>
        {validationResults.warnings.length > 0 && (
          <Accordion type="single" collapsible className="w-full mt-2">
            <AccordionItem value="warnings">
              <AccordionTrigger className="text-sm">
                {validationResults.warnings.length} Warnings Found
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-xs space-y-1 mt-2 max-h-40 overflow-y-auto">
                  {validationResults.warnings.map((warning, index) => (
                    <li key={index} className="text-amber-600">
                      {warning.message}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className="mt-2">
          <Button size="sm" variant="outline" onClick={onRevalidate} className="mr-2">
            Run Validation Again
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
