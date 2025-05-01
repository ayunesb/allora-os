
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { checkVerificationAccess } from '@/utils/admin/database-verification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AdminUpgradePrompt from '@/components/AdminUpgradePrompt';

export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState<string>('security');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [accessReason, setAccessReason] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [verificationData, setVerificationData] = useState({
    tables: [],
    policies: [],
    functions: [],
    isVerifying: false
  });

  useEffect(() => {
    const checkAccess = async () => {
      const accessCheck = await checkVerificationAccess();
      setHasAccess(accessCheck.canAccess);
      if (!accessCheck.canAccess) {
        setAccessReason(accessCheck.message || 'Access denied');
      }
    };

    checkAccess();
  }, []);

  const verifyDatabaseConfiguration = () => {
    setVerificationData(prev => ({ ...prev, isVerifying: true }));
    
    // Simulate API call to get verification data
    setTimeout(() => {
      setVerificationData({
        tables: [
          { name: 'profiles', exists: true, hasRLS: true, status: 'success', message: 'Table exists and has proper structure' },
          { name: 'companies', exists: true, hasRLS: true, status: 'success', message: 'Table exists and has proper structure' },
          { name: 'strategies', exists: true, hasRLS: true, status: 'success', message: 'Table exists and has proper structure' }
        ],
        policies: [
          { table: 'profiles', name: 'auth_policy', exists: true, isSecure: true, status: 'success', message: 'RLS policies are configured correctly' },
          { table: 'companies', name: 'auth_policy', exists: true, isSecure: true, status: 'success', message: 'RLS policies are configured correctly' },
          { table: 'strategies', name: 'auth_policy', exists: true, isSecure: true, status: 'success', message: 'RLS policies are configured correctly' }
        ],
        functions: [
          { name: 'handle_new_user', exists: true, isSecure: true, status: 'success', message: 'Function exists and is secure' },
          { name: 'get_user_role', exists: true, isSecure: true, status: 'success', message: 'Function exists and is secure' }
        ],
        isVerifying: false
      });
      toast.success("Database verification completed successfully");
    }, 1500);
  };

  const handleUpgrade = () => {
    toast("Admin access upgrade", {
      description: "Please contact your system administrator to upgrade your account.",
    });
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <PageTitle 
          title="Audit & Compliance" 
          description="Review and validate your system configuration"
        />
        <div className="mt-6">
          <AdminUpgradePrompt 
            onUpgrade={handleUpgrade} 
            onContinue={handleContinue}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <PageTitle 
        title="Audit & Compliance" 
        description="Review and validate your system configuration"
      />

      <div className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health Dashboard</CardTitle>
            <CardDescription>
              Monitor system health and verify required configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="security" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Authentication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">JWT Authentication</span>
                          <span className="text-green-600">✓ Enabled</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Session Management</span>
                          <span className="text-green-600">✓ Configured</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Password Policies</span>
                          <span className="text-amber-600">⚠ Review</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">API Protection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rate Limiting</span>
                          <span className="text-amber-600">⚠ Limited</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CORS Configuration</span>
                          <span className="text-green-600">✓ Configured</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">API Authentication</span>
                          <span className="text-green-600">✓ Enabled</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Run Security Scan</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="database">
                <DatabaseVerificationDashboard 
                  result={verificationData}
                  onVerify={verifyDatabaseConfiguration}
                />
              </TabsContent>
              
              <TabsContent value="compliance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Legal Documents</CardTitle>
                    <CardDescription>Review and update legal documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">Terms of Service</p>
                          <p className="text-sm text-muted-foreground">v1.2 • Last updated: Apr 15, 2025</p>
                        </div>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">Privacy Policy</p>
                          <p className="text-sm text-muted-foreground">v1.3 • Last updated: Apr 28, 2025</p>
                        </div>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">Cookie Policy</p>
                          <p className="text-sm text-muted-foreground">v1.0 • Last updated: Mar 10, 2025</p>
                        </div>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button variant="outline">Run Compliance Check</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Feature Configuration</CardTitle>
                    <CardDescription>Manage enabled features and settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">AI Capabilities</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Executive AI</span>
                                <span className="text-green-600">Enabled</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Strategy AI</span>
                                <span className="text-green-600">Enabled</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Content Generation</span>
                                <span className="text-amber-600">Limited</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Integrations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Zapier</span>
                                <span className="text-green-600">Connected</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Stripe</span>
                                <span className="text-green-600">Connected</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Zoom</span>
                                <span className="text-red-600">Not Connected</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Communication</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Email</span>
                                <span className="text-green-600">Configured</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>SMS</span>
                                <span className="text-red-600">Not Configured</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Push Notifications</span>
                                <span className="text-amber-600">Partial</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audit Logs</CardTitle>
              <CardDescription>Recent system activity and changes</CardDescription>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="font-medium text-sm">User Settings Updated</p>
                  <p className="text-xs text-muted-foreground">Today, 9:32 AM • Admin User</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium text-sm">Database Backup Completed</p>
                  <p className="text-xs text-muted-foreground">Today, 8:15 AM • System</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium text-sm">New API Key Created</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 4:45 PM • Admin User</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium text-sm">RLS Policy Updated</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 11:20 AM • Admin User</p>
                </div>
                <div className="pb-2">
                  <p className="font-medium text-sm">System Update Applied</p>
                  <p className="text-xs text-muted-foreground">Apr 28, 2025 • System</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Launch Readiness</CardTitle>
              <CardDescription>Overall readiness status for production</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-36 gap-3">
                <div className="text-6xl font-bold text-amber-500">85%</div>
                <p className="text-muted-foreground text-center">
                  5 items need attention before launch
                </p>
                <Button onClick={() => navigate('/admin/launch-verification')}>
                  View Launch Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
