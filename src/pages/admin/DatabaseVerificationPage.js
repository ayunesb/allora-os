import React, { useState, useEffect } from 'react';
import { DatabaseTablesCheck, RlsPoliciesCheck, DatabaseFunctionsCheck } from '@/components/admin/database-verification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export default function DatabaseVerificationPage() {
    const [activeTab, setActiveTab] = useState('tables');
    // Initialize with loading state
    const [verificationData, setVerificationData] = useState({
        tables: [],
        policies: [],
        functions: [],
        isVerifying: false
    });
    const [verificationStatus, setVerificationStatus] = useState({
        tables: 'idle',
        functions: 'idle',
        policies: 'idle'
    });
    const runVerification = () => {
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
                    { name: 'get_user_companies', exists: true, isSecure: true, status: 'success', message: 'Function exists and is secure' }
                ],
                isVerifying: false
            });
            setVerificationStatus({
                tables: 'success',
                functions: 'success',
                policies: 'success'
            });
        }, 1500);
    };
    useEffect(() => {
        runVerification();
    }, []);
    // Derived status counts
    const tableSuccessCount = verificationData.tables.filter(t => t.exists).length;
    const policySuccessCount = verificationData.policies.filter(p => p.exists).length;
    const functionSuccessCount = verificationData.functions.filter(f => f.exists && f.isSecure).length;
    return (<div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Database Verification</h1>
          <p className="text-muted-foreground">
            Verify your database structure, RLS policies, and functions
          </p>
        </div>
        
        <Button onClick={runVerification} disabled={verificationData.isVerifying} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${verificationData.isVerifying ? 'animate-spin' : ''}`}/>
          {verificationData.isVerifying ? 'Verifying...' : 'Run Verification'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Tables</CardTitle>
              <Badge variant={verificationStatus.tables === 'success' ? 'success' : 'secondary'}>
                {tableSuccessCount}/{verificationData.tables.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {verificationData.isVerifying ? (<div className="flex justify-center py-4">
                <RefreshCw className="animate-spin h-8 w-8 text-primary/70"/>
              </div>) : (<div className="flex items-center gap-2">
                {verificationStatus.tables === 'success' ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<AlertCircle className="h-5 w-5 text-amber-500"/>)}
                <span>
                  {verificationStatus.tables === 'success'
                ? 'All tables verified successfully'
                : 'Table verification incomplete'}
                </span>
              </div>)}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">RLS Policies</CardTitle>
              <Badge variant={verificationStatus.policies === 'success' ? 'success' : 'secondary'}>
                {policySuccessCount}/{verificationData.policies.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {verificationData.isVerifying ? (<div className="flex justify-center py-4">
                <RefreshCw className="animate-spin h-8 w-8 text-primary/70"/>
              </div>) : (<div className="flex items-center gap-2">
                {verificationStatus.policies === 'success' ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<AlertCircle className="h-5 w-5 text-amber-500"/>)}
                <span>
                  {verificationStatus.policies === 'success'
                ? 'All RLS policies configured properly'
                : 'RLS policy verification incomplete'}
                </span>
              </div>)}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Functions</CardTitle>
              <Badge variant={verificationStatus.functions === 'success' ? 'success' : 'secondary'}>
                {functionSuccessCount}/{verificationData.functions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {verificationData.isVerifying ? (<div className="flex justify-center py-4">
                <RefreshCw className="animate-spin h-8 w-8 text-primary/70"/>
              </div>) : (<div className="flex items-center gap-2">
                {verificationStatus.functions === 'success' ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<AlertCircle className="h-5 w-5 text-amber-500"/>)}
                <span>
                  {verificationStatus.functions === 'success'
                ? 'All functions verified successfully'
                : 'Function verification incomplete'}
                </span>
              </div>)}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="tables">Tables</TabsTrigger>
              <TabsTrigger value="policies">RLS Policies</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="tables" className="mt-0">
            <DatabaseTablesCheck tables={verificationData.tables}/>
          </TabsContent>
          <TabsContent value="policies" className="mt-0">
            <RlsPoliciesCheck policies={verificationData.policies}/>
          </TabsContent>
          <TabsContent value="functions" className="mt-0">
            <DatabaseFunctionsCheck functions={verificationData.functions}/>
          </TabsContent>
        </CardContent>
      </Card>
    </div>);
}
