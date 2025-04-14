
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, AlertTriangle, Clock, PlayCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AuditPage() {
  const navigate = useNavigate();
  const [lastAuditDate, setLastAuditDate] = useState<string>("April 12, 2025 at 14:23");
  const [auditStats, setAuditStats] = useState({
    passed: 24,
    warnings: 8,
    failed: 3,
    duration: "2:18"
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Load last audit results from localStorage
  useEffect(() => {
    const lastAudit = localStorage.getItem('lastAuditResults');
    if (lastAudit) {
      try {
        const auditData = JSON.parse(lastAudit);
        
        // Update the last audit date
        if (auditData.timestamp) {
          const date = new Date(auditData.timestamp);
          setLastAuditDate(date.toLocaleDateString('en-US', {
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));
        }
        
        // Update audit stats if results are available
        if (auditData.results) {
          const results = auditData.results;
          setAuditStats({
            passed: results.passedChecks?.length || 0,
            warnings: results.issues?.filter(i => i.severity === 'warning').length || 0,
            failed: results.issues?.filter(i => i.severity === 'critical').length || 0,
            duration: "2:18" // This would be dynamic in a real implementation
          });
        }
      } catch (error) {
        console.error('Error parsing last audit data:', error);
      }
    }
  }, []);
  
  const handleRunNewAudit = () => {
    setIsLoading(true);
    toast.info("Starting new system audit...");
    navigate("/admin/run-audit");
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>System Audit</TypographyH1>
        <Button 
          className="w-full sm:w-auto"
          onClick={handleRunNewAudit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Run New Audit
            </>
          )}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Audit Overview</CardTitle>
          <CardDescription>Last audit run: {lastAuditDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-muted/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Passed</p>
                  <p className="text-2xl font-bold">{auditStats.passed}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Warnings</p>
                  <p className="text-2xl font-bold">{auditStats.warnings}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Failed</p>
                  <p className="text-2xl font-bold">{auditStats.failed}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-2xl font-bold">{auditStats.duration}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Authentication Security</p>
                    <p className="text-sm text-muted-foreground">Authentication mechanisms are properly secured</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Database Query Performance</p>
                    <p className="text-sm text-muted-foreground">Some queries exceed recommended execution time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">GDPR Compliance</p>
                    <p className="text-sm text-muted-foreground">Some user data handling doesn't meet GDPR requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">API Rate Limiting</p>
                    <p className="text-sm text-muted-foreground">API rate limiting is properly implemented</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Authentication Security</p>
                    <p className="text-sm text-muted-foreground">Authentication mechanisms are properly secured</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">XSS Protection</p>
                    <p className="text-sm text-muted-foreground">Cross-site scripting protections are in place</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Database Query Performance</p>
                    <p className="text-sm text-muted-foreground">Some queries exceed recommended execution time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Frontend Performance</p>
                    <p className="text-sm text-muted-foreground">Frontend performance metrics are within acceptable ranges</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">GDPR Compliance</p>
                    <p className="text-sm text-muted-foreground">Some user data handling doesn't meet GDPR requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Data Encryption</p>
                    <p className="text-sm text-muted-foreground">Data encryption standards are properly implemented</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
