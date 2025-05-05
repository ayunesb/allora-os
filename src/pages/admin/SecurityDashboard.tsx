import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
export default function SecurityDashboard() {
    return (<>
      <Helmet>
        <title>Security Dashboard | Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage security settings
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="data">Data Protection</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2"/>
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="font-medium">Protected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    All security systems are operational
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2"/>
                    Last Audit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">April 10, 2025</p>
                  <p className="text-sm text-muted-foreground">
                    No critical issues found
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2"/>
                    Threats Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">0 active threats</p>
                  <p className="text-sm text-muted-foreground">
                    6 threats blocked this month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>
                  System-wide security status and recent events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Security dashboard content will appear here.</p>
                <Button className="mt-4">Run Security Scan</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="access">
            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>
                  Manage user permissions and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access control management will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>
                  Encryption settings and data compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Data protection settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>
                  Security events and user activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Audit logs will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>);
}
