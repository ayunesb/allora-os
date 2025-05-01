
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PreLaunchValidator } from "@/components/admin/PreLaunchValidator";
import { Shield, Activity, Database, ServerCrash, LayoutDashboard } from "lucide-react";
import { validateRLSPolicies } from "@/utils/validators/rlsValidator";
import { validateUserAuthentication } from "@/utils/validators/authValidator";
import { validateDatabaseSecurity } from "@/utils/validators/databaseValidator";

export default function AuditDashboard() {
  const navigate = useNavigate();
  const [auditResults, setAuditResults] = useState<{
    security?: { valid: boolean; message: string; };
    auth?: { valid: boolean; message: string; };
    database?: { valid: boolean; message: string; };
  }>({});
  const [isAuditing, setIsAuditing] = useState(false);

  const runSecurityAudit = async () => {
    setIsAuditing(true);
    try {
      const rlsResult = await validateRLSPolicies();
      setAuditResults(prev => ({ ...prev, security: rlsResult }));
    } catch (error) {
      console.error("Error running security audit:", error);
      setAuditResults(prev => ({ 
        ...prev, 
        security: { 
          valid: false, 
          message: "Error running security audit: " + (error instanceof Error ? error.message : String(error)) 
        } 
      }));
    } finally {
      setIsAuditing(false);
    }
  };

  const runAuthAudit = async () => {
    setIsAuditing(true);
    try {
      const authResult = await validateUserAuthentication();
      setAuditResults(prev => ({ ...prev, auth: authResult }));
    } catch (error) {
      console.error("Error running auth audit:", error);
      setAuditResults(prev => ({ 
        ...prev, 
        auth: { 
          valid: false, 
          message: "Error running auth audit: " + (error instanceof Error ? error.message : String(error)) 
        } 
      }));
    } finally {
      setIsAuditing(false);
    }
  };

  const runDatabaseAudit = async () => {
    setIsAuditing(true);
    try {
      const dbResult = await validateDatabaseSecurity();
      setAuditResults(prev => ({ ...prev, database: dbResult }));
    } catch (error) {
      console.error("Error running database audit:", error);
      setAuditResults(prev => ({ 
        ...prev, 
        database: { 
          valid: false, 
          message: "Error running database audit: " + (error instanceof Error ? error.message : String(error)) 
        } 
      }));
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pre-Launch Audit</h1>
          <p className="text-muted-foreground mt-1">
            Verify your system's security, performance, and readiness for launch
          </p>
        </div>
        
        <Button onClick={() => navigate('/admin/run-audit')}>
          Run Full System Audit
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="checklist">Launch Checklist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Security Status
                  </CardTitle>
                  <CardDescription>
                    Authentication & authorization checks
                  </CardDescription>
                </div>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={isAuditing}
                    onClick={runSecurityAudit}
                  >
                    Run Security Audit
                  </Button>
                  {auditResults.security && (
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      auditResults.security.valid 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {auditResults.security.valid ? "Passed" : "Failed"}
                    </div>
                  )}
                </div>
                
                {auditResults.security && (
                  <div className="mt-4">
                    <Alert variant={auditResults.security.valid ? "default" : "destructive"}>
                      <AlertTitle>Security Audit Result</AlertTitle>
                      <AlertDescription>{auditResults.security.message}</AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Authentication Status
                  </CardTitle>
                  <CardDescription>
                    Authentication system health check
                  </CardDescription>
                </div>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={isAuditing}
                    onClick={runAuthAudit}
                  >
                    Run Auth Audit
                  </Button>
                  {auditResults.auth && (
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      auditResults.auth.valid 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {auditResults.auth.valid ? "Passed" : "Failed"}
                    </div>
                  )}
                </div>
                
                {auditResults.auth && (
                  <div className="mt-4">
                    <Alert variant={auditResults.auth.valid ? "default" : "destructive"}>
                      <AlertTitle>Authentication Audit Result</AlertTitle>
                      <AlertDescription>{auditResults.auth.message}</AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Database Security
                  </CardTitle>
                  <CardDescription>
                    Database configuration and policies
                  </CardDescription>
                </div>
                <Database className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={isAuditing}
                    onClick={runDatabaseAudit}
                  >
                    Run Database Audit
                  </Button>
                  {auditResults.database && (
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      auditResults.database.valid 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {auditResults.database.valid ? "Passed" : "Failed"}
                    </div>
                  )}
                </div>
                
                {auditResults.database && (
                  <div className="mt-4">
                    <Alert variant={auditResults.database.valid ? "default" : "destructive"}>
                      <AlertTitle>Database Audit Result</AlertTitle>
                      <AlertDescription>{auditResults.database.message}</AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Performance Status
                  </CardTitle>
                  <CardDescription>
                    System performance metrics
                  </CardDescription>
                </div>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => navigate('/admin/performance')}
                >
                  View Performance Metrics
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <PreLaunchValidator />
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Audit</CardTitle>
              <CardDescription>Comprehensive security verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Row-Level Security Policies</h3>
                <p className="text-muted-foreground mb-2">Verify RLS policies for all tables</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/admin/database-verification')}
                >
                  Run RLS Check
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Authentication Flows</h3>
                <p className="text-muted-foreground mb-2">Test all authentication paths</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={runAuthAudit}
                >
                  Run Auth Check
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">API Security</h3>
                <p className="text-muted-foreground mb-2">Verify API endpoints are secured</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/api-audit')}
                >
                  Run API Security Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Audit</CardTitle>
              <CardDescription>System performance metrics and analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Core Web Vitals</h3>
                <p className="text-muted-foreground">Track LCP, FID, and CLS metrics</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">API Response Times</h3>
                <p className="text-muted-foreground">Monitor endpoint performance</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Resource Usage</h3>
                <p className="text-muted-foreground">Track CPU, memory, and network usage</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Verification</CardTitle>
              <CardDescription>Database security and performance checks</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="default"
                onClick={() => navigate('/admin/database-verification')}
                className="mb-6"
              >
                Run Database Verification
              </Button>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">RLS Policies</h3>
                  <p className="text-muted-foreground">Verify Row Level Security policies</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Index Performance</h3>
                  <p className="text-muted-foreground">Check database index usage</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Backup Verification</h3>
                  <p className="text-muted-foreground">Verify backup procedures</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle>Pre-Launch Checklist</CardTitle>
              <CardDescription>Items to verify before launch</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="default"
                onClick={() => navigate('/admin/launch-prep')}
                className="mb-6"
              >
                View Launch Preparation
              </Button>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Security Checklist</h3>
                  <p className="text-muted-foreground">Essential security items</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Content Checklist</h3>
                  <p className="text-muted-foreground">Required content and copy</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Technical Checklist</h3>
                  <p className="text-muted-foreground">Backend system requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
