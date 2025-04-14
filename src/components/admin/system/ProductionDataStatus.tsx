
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Loader2, ShieldAlert, Trash2 } from 'lucide-react';
import { ValidationResults } from '@/utils/productionDataValidator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductionDataStatusProps {
  validationResults: ValidationResults | null;
  isValidating: boolean;
  onValidate: () => Promise<void>;
}

export function ProductionDataStatus({ validationResults, isValidating, onValidate }: ProductionDataStatusProps) {
  if (isValidating) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Running Production Data Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Scanning database for test data and potential production issues...
          </p>
          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
            <div className="h-full bg-primary animate-pulse rounded-full" style={{ width: '60%' }}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!validationResults) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Production Data Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Validate your production data to ensure no test or demo data is present in your database.
          </p>
          <Button onClick={onValidate} disabled={isValidating}>
            Run Validation
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Production data has been validated
  return (
    <Card className={validationResults.success ? 
      "border-green-200 bg-green-50/50 dark:bg-green-900/10" : 
      "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10"
    }>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            {validationResults.success ? (
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
            )}
            Production Data Status
          </div>
          <Badge variant={validationResults.success ? "outline" : "outline"} 
                 className={validationResults.success ? 
                   "bg-green-100 text-green-700 border-green-200" : 
                   "bg-amber-100 text-amber-700 border-amber-200"}>
            {validationResults.success ? "Ready for Production" : "Issues Found"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-background rounded-md p-2 border">
              <div className="text-xs text-muted-foreground">Valid Records</div>
              <div className="text-lg font-semibold">{validationResults.validRecords}</div>
            </div>
            <div className="bg-background rounded-md p-2 border">
              <div className="text-xs text-muted-foreground">Errors</div>
              <div className="text-lg font-semibold">{validationResults.errors.length}</div>
            </div>
            <div className="bg-background rounded-md p-2 border">
              <div className="text-xs text-muted-foreground">Warnings</div>
              <div className="text-lg font-semibold">{validationResults.warnings.length}</div>
            </div>
            <div className="bg-background rounded-md p-2 border">
              <div className="text-xs text-muted-foreground">Cleaned Items</div>
              <div className="text-lg font-semibold flex items-center">
                {validationResults.cleanupPerformed ? (
                  <>
                    <Trash2 className="h-3 w-3 mr-1 text-amber-500" />
                    {validationResults.validationDetails.companies.cleaned + 
                     validationResults.validationDetails.leads.cleaned + 
                     validationResults.validationDetails.strategies.cleaned +
                     validationResults.validationDetails.campaigns.cleaned}
                  </>
                ) : "0"}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <Table className="bg-background border rounded-md text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Table</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Valid</TableHead>
                <TableHead className="text-right">Cleaned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Companies</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.companies.total}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.companies.valid}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.companies.cleaned}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Leads</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.leads.total}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.leads.valid}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.leads.cleaned}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Strategies</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.strategies.total}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.strategies.valid}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.strategies.cleaned}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Campaigns</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.campaigns.total}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.campaigns.valid}</TableCell>
                <TableCell className="text-right">{validationResults.validationDetails.campaigns.cleaned}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Issues and Warnings */}
          {(validationResults.errors.length > 0 || validationResults.warnings.length >
           0) && (
            <Accordion type="single" collapsible className="w-full">
              {validationResults.errors.length > 0 && (
                <AccordionItem value="errors">
                  <AccordionTrigger className="text-sm text-red-600">
                    {validationResults.errors.length} Errors
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-xs space-y-1 mt-2 max-h-40 overflow-y-auto">
                      {validationResults.errors.map((error, index) => (
                        <li key={index} className="text-red-600 bg-red-50 p-1 rounded flex items-start">
                          <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold">{error.table}:</span> {error.message}
                            {error.recordId && <div className="text-xs text-red-500">ID: {error.recordId}</div>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              {validationResults.warnings.length > 0 && (
                <AccordionItem value="warnings">
                  <AccordionTrigger className="text-sm text-amber-600">
                    {validationResults.warnings.length} Warnings
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-xs space-y-1 mt-2 max-h-40 overflow-y-auto">
                      {validationResults.warnings.map((warning, index) => (
                        <li key={index} className="text-amber-600 bg-amber-50 p-1 rounded flex items-start">
                          <Trash2 className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold">{warning.table}:</span> {warning.message}
                            {warning.recordId && <div className="text-xs text-amber-500">ID: {warning.recordId}</div>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}
          
          {/* Timestamp and Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Last validated: {new Date(validationResults.timestamp).toLocaleString()}
            </div>
            <Button onClick={onValidate} disabled={isValidating} variant="outline" size="sm">
              Run Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
