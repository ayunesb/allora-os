import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { AlertCircle, Check, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCompanyAPI } from '@/context/CompanyAPIContext';
import { useClearbitTool } from '@/utils/langchain/hooks/useClearbitTool';
export default function ClearbitIntegration() {
    const { setApiKey, hasApiKey } = useCompanyAPI();
    const [apiKey, setApiKeyInput] = useState('');
    const [testValue, setTestValue] = useState('');
    const [testResult, setTestResult] = useState(null);
    const [testError, setTestError] = useState(null);
    const [testLoading, setTestLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('company');
    const { lookupCompany, lookupPerson, isLoading } = useClearbitTool();
    const saveApiKey = () => {
        if (!apiKey.trim()) {
            toast.error('Please enter an API key');
            return;
        }
        setApiKey('clearbit', apiKey.trim());
        toast.success('Clearbit API key saved successfully');
    };
    const runTest = async () => {
        if (!testValue.trim()) {
            toast.error(`Please enter a ${activeTab === 'company' ? 'domain' : 'email'} to test`);
            return;
        }
        setTestResult(null);
        setTestError(null);
        setTestLoading(true);
        try {
            let result;
            if (activeTab === 'company') {
                result = await lookupCompany(testValue);
            }
            else {
                result = await lookupPerson(testValue);
            }
            if (typeof result === 'string' && (result.includes('not found') || result.includes('failed'))) {
                setTestError(result);
            }
            else {
                setTestResult(result);
            }
        }
        catch (err) {
            setTestError(err instanceof Error ? err.message : 'An error occurred during the test');
        }
        finally {
            setTestLoading(false);
        }
    };
    return (<div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <TypographyH1>Clearbit Integration</TypographyH1>
        {hasApiKey('clearbit') && <div className="flex items-center text-green-600"><CheckCircle2 className="h-5 w-5 mr-2"/> Connected</div>}
      </div>
      
      <TypographyP>
        Connect Clearbit to enrich leads and companies with detailed information. 
        This integration enables AI agents to look up company and person data.
      </TypographyP>
      
      <Card>
        <CardHeader>
          <CardTitle>Clearbit API Configuration</CardTitle>
          <CardDescription>
            Enter your Clearbit API key to connect to the Clearbit Enrichment API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clearbit-key">Clearbit API Key</Label>
              <div className="flex space-x-2">
                <Input id="clearbit-key" type="password" placeholder="sk_..." value={apiKey} onChange={(e) => setApiKeyInput(e.target.value)}/>
                <Button onClick={saveApiKey}>Save</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                You can find your API key in the Clearbit dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {hasApiKey('clearbit') && (<Card>
          <CardHeader>
            <CardTitle>Test Clearbit Integration</CardTitle>
            <CardDescription>
              Test the connection by looking up a company or person.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="company" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="company">Company Lookup</TabsTrigger>
                <TabsTrigger value="person">Person Lookup</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-domain">Company Domain</Label>
                  <div className="flex space-x-2">
                    <Input id="test-domain" placeholder="example.com" value={testValue} onChange={(e) => setTestValue(e.target.value)}/>
                    <Button onClick={runTest} disabled={testLoading}>
                      {testLoading ? 'Testing...' : 'Test'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="person" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-email">Email Address</Label>
                  <div className="flex space-x-2">
                    <Input id="test-email" placeholder="person@example.com" value={testValue} onChange={(e) => setTestValue(e.target.value)}/>
                    <Button onClick={runTest} disabled={testLoading}>
                      {testLoading ? 'Testing...' : 'Test'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {testError && (<div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"/>
                <p>{testError}</p>
              </div>)}
            
            {testResult && (<div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 mr-2"/>
                  <p className="font-medium">Lookup successful!</p>
                </div>
                <div className="space-y-2 mt-2">
                  {Object.entries(testResult).map(([key, value]) => (<div key={key}>
                      <span className="font-medium">{key}: </span>
                      <span>{value ? String(value) : 'N/A'}</span>
                    </div>))}
                </div>
              </div>)}
          </CardContent>
        </Card>)}
    </div>);
}
