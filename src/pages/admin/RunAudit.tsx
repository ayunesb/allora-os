
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, AlertCircle } from "lucide-react";

export default function RunAudit() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <TypographyH1>Run System Audit</TypographyH1>
      
      <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-yellow-800 dark:text-yellow-400">Important Note</p>
            <TypographyP className="text-yellow-700 dark:text-yellow-300/80">
              Running a full system audit may temporarily increase system load. It's recommended to run comprehensive audits during off-peak hours.
            </TypographyP>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Audit Configuration</CardTitle>
          <CardDescription>Select which components to include in the audit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="security" defaultChecked />
              <label
                htmlFor="security"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Security Audit
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="performance" defaultChecked />
              <label
                htmlFor="performance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Performance Audit
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="compliance" defaultChecked />
              <label
                htmlFor="compliance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compliance Audit
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="database" />
              <label
                htmlFor="database"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Database Schema Audit
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="ai" />
              <label
                htmlFor="ai"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                AI Systems Audit
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="ux" />
              <label
                htmlFor="ux"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                User Experience Audit
              </label>
            </div>
            
            <div className="pt-4">
              <Button className="w-full sm:w-auto">
                <Play className="h-4 w-4 mr-2" />
                Start Audit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Audit History</CardTitle>
          <CardDescription>Previously run audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Full System Audit</p>
                <p className="text-sm text-muted-foreground">April 12, 2025 at 14:23</p>
              </div>
              <Button variant="outline" size="sm">View Results</Button>
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Security Audit</p>
                <p className="text-sm text-muted-foreground">April 5, 2025 at 09:15</p>
              </div>
              <Button variant="outline" size="sm">View Results</Button>
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Performance Audit</p>
                <p className="text-sm text-muted-foreground">March 28, 2025 at 16:42</p>
              </div>
              <Button variant="outline" size="sm">View Results</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
