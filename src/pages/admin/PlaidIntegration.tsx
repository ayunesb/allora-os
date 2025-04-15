
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCompanyAPI } from '@/context/CompanyAPIContext';
import { usePlaidTool } from '@/utils/langchain/hooks/usePlaidTool';
import { toast } from 'sonner';
import APIKeyInput from '@/components/admin/APIKeyInput';

export default function PlaidIntegration() {
  const { apiKeys, setApiKey, hasApiKey } = useCompanyAPI();
  const { getAccountBalances, getRecentTransactions, isLoading } = usePlaidTool();

  const [plaidClientId, setPlaidClientId] = useState(apiKeys.plaid_client_id || '');
  const [plaidSecret, setPlaidSecret] = useState(apiKeys.plaid_secret || '');
  const [plaidAccessToken, setPlaidAccessToken] = useState(apiKeys.plaid_access_token || '');
  const [plaidEnv, setPlaidEnv] = useState(apiKeys.plaid_env || 'sandbox');
  const [testResults, setTestResults] = useState<any>(null);

  const handleSaveKeys = () => {
    setApiKey('plaid_client_id', plaidClientId);
    setApiKey('plaid_secret', plaidSecret);
    setApiKey('plaid_access_token', plaidAccessToken);
    setApiKey('plaid_env', plaidEnv);
    toast.success('Plaid API keys saved successfully');
  };

  const handleTestConnection = async () => {
    try {
      const balances = await getAccountBalances();
      if (balances) {
        setTestResults({ success: true, data: balances });
        toast.success('Plaid connection successful');
      }
    } catch (err) {
      setTestResults({ success: false, error: err instanceof Error ? err.message : 'Connection failed' });
      toast.error('Plaid connection failed');
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plaid Integration</h1>
          <p className="text-muted-foreground">Connect your financial data with the AI executives</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plaid API Configuration</CardTitle>
            <CardDescription>
              Configure your Plaid API credentials to enable financial data analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <APIKeyInput
              id="plaid-client-id"
              label="Plaid Client ID"
              value={plaidClientId}
              onChange={setPlaidClientId}
              placeholder="Enter your Plaid Client ID"
            />
            
            <APIKeyInput
              id="plaid-secret"
              label="Plaid Secret"
              value={plaidSecret}
              onChange={setPlaidSecret}
              placeholder="Enter your Plaid Secret"
            />
            
            <APIKeyInput
              id="plaid-access-token"
              label="Plaid Access Token"
              value={plaidAccessToken}
              onChange={setPlaidAccessToken}
              placeholder="Enter your Plaid Access Token"
            />
            
            <div className="space-y-2">
              <Label htmlFor="plaid-env">Plaid Environment</Label>
              <select 
                id="plaid-env"
                className="w-full px-3 py-2 border rounded-md"
                value={plaidEnv}
                onChange={(e) => setPlaidEnv(e.target.value)}
              >
                <option value="sandbox">Sandbox</option>
                <option value="development">Development</option>
                <option value="production">Production</option>
              </select>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveKeys}>Save Configuration</Button>
              <Button 
                variant="outline" 
                onClick={handleTestConnection} 
                disabled={isLoading || !plaidClientId || !plaidSecret || !plaidAccessToken}
              >
                {isLoading ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plaid Integration Status</CardTitle>
            <CardDescription>
              Enable AI executives to access financial data insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${hasApiKey('plaid_client_id') && hasApiKey('plaid_secret') ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {hasApiKey('plaid_client_id') && hasApiKey('plaid_secret') ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                </div>
                <span className="font-medium">
                  {hasApiKey('plaid_client_id') && hasApiKey('plaid_secret')
                    ? 'Plaid credentials configured'
                    : 'Missing Plaid credentials'}
                </span>
              </div>
              
              {testResults && (
                <Alert variant={testResults.success ? "default" : "destructive"}>
                  <div className="flex gap-2 items-center">
                    {testResults.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {testResults.success ? 'Connection Successful' : 'Connection Failed'}
                    </AlertTitle>
                  </div>
                  <AlertDescription>
                    {testResults.success 
                      ? `Found ${testResults.data.length} accounts` 
                      : testResults.error}
                  </AlertDescription>
                </Alert>
              )}
              
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>How to get Plaid Access Tokens</AlertTitle>
                <AlertDescription>
                  1. Create a Plaid developer account<br />
                  2. Set up Plaid Link and complete the OAuth flow<br />
                  3. Store the access token securely for each user<br />
                  <a 
                    href="https://plaid.com/docs/link/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Read the Plaid Link documentation
                  </a>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
