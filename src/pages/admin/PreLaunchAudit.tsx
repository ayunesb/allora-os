
import React, { useState } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clipboard, 
  Gauge, 
  FileText, 
  LayoutDashboard,
  Terminal,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import PreLaunchAudit from "@/components/admin/audit/PreLaunchAudit";

export default function AuditPage() {
  const [isRunningFullAudit, setIsRunningFullAudit] = useState(false);
  
  const handleFullAudit = () => {
    setIsRunningFullAudit(true);
    toast.info("Starting comprehensive audit...");
    
    // Navigate to the dedicated full audit page
    setTimeout(() => {
      window.location.href = "/admin/run-audit";
    }, 1500);
  };
  
  return (
    <div className="container py-8">
      <PageTitle 
        title="Pre-Launch Audit" 
        description="Comprehensive check of all systems before launch"
      />
      
      <div className="mb-6">
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Pre-Launch Checklist</AlertTitle>
          <AlertDescription>
            Review all systems before launching to ensure optimal performance, security, and user experience.
            Use the "Run Full Audit" button to automatically check all aspects of your application.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button 
          onClick={handleFullAudit}
          disabled={isRunningFullAudit}
          className="bg-primary"
        >
          {isRunningFullAudit ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <Terminal className="mr-2 h-4 w-4" />
              Run Full Audit
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="report">
        <TabsList className="mb-6">
          <TabsTrigger value="report">
            <Clipboard className="mr-2 h-4 w-4" />
            Audit Report
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Gauge className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="report">
          <PreLaunchAudit />
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Run a performance audit to measure page loading speeds, API response times, and client-side rendering performance.
              </p>
              <Button onClick={() => toast.info("Starting performance audit...")}>
                <Gauge className="mr-2 h-4 w-4" />
                Run Performance Audit
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Launch Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Generate comprehensive documentation for your application, including API references, user guides, and administrator manuals.
              </p>
              <Button onClick={() => toast.info("Generating documentation...")}>
                <FileText className="mr-2 h-4 w-4" />
                Generate Documentation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Audit Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View all audit reports and historical audit data in a comprehensive dashboard.
              </p>
              <Button onClick={() => toast.info("Loading audit dashboard...")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                View Audit Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
