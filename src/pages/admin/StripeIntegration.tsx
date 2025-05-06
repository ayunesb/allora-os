import React, { useState } from 'react';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import APIKeyInput from '@/components/admin/APIKeyInput';
import { useQuery } from '@tanstack/react-query';
import { InputProps } from '@/components/ui/input'; // Corrected import for InputProps

export default function StripeIntegration() {
    const [stripeSecretKey, setStripeSecretKey] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [testQuery, setTestQuery] = useState('');
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: isKeySet, isLoading: isCheckingKey } = useQuery({
        queryKey: ['stripe-key-check'],
        queryFn: async () => {
            try {
                const { data, error } = await supabase.functions.invoke('check-secret', {
                    body: { key: 'STRIPE_SECRET_KEY' }
                });
                if (error)
                    throw error;
                return data.exists;
            }
            catch (err) {
                console.error('Error checking Stripe key:', err);
                return false;
            }
        }
    });
    const handleSaveKey = async () => {
        if (!stripeSecretKey) {
            toast.error('Please enter a Stripe secret key');
            return;
        }
        setIsSubmitting(true);
        try {
            const { data, error } = await supabase.functions.invoke('set-secret', {
                body: {
                    key: 'STRIPE_SECRET_KEY',
                    value: stripeSecretKey
                }
            });
            if (error)
                throw error;
            toast.success('Stripe secret key saved successfully');
            setStripeSecretKey('');
        }
        catch (err) {
            console.error('Error saving Stripe key:', err);
            toast.error('Failed to save Stripe secret key');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleTestQuery = async () => {
        if (!testQuery) {
            toast.error('Please enter a test query');
            return;
        }
        setIsLoading(true);
        setTestResult(null);
        try {
            const { data, error } = await supabase.functions.invoke('stripe-analytics', {
                body: { query: testQuery }
            });
            if (error)
                throw error;
            setTestResult(data.result);
        }
        catch (err) {
            console.error('Error executing Stripe test query:', err);
            toast.error('Failed to execute Stripe test query');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <TypographyH1>Stripe Integration</TypographyH1>
        <TypographyP>
          Configure Stripe integration for payment analytics and management through the AI agent.
        </TypographyP>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stripe API Configuration</CardTitle>
          <CardDescription>
            Enter your Stripe secret key to enable payment analytics through the AI agent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isKeySet ? (<Alert className="bg-green-50 border-green-200">
              <AlertTitle>Stripe integration is active</AlertTitle>
              <AlertDescription>
                Your Stripe secret key is configured. The AI agent can now access Stripe data.
              </AlertDescription>
            </Alert>) : (<Alert className="bg-yellow-50 border-yellow-200">
              <AlertTitle>Stripe integration not configured</AlertTitle>
              <AlertDescription>
                Enter your Stripe secret key below to enable the integration.
              </AlertDescription>
            </Alert>)}

          <div className="mt-4">
            <APIKeyInput
              id="stripe-secret-key"
              label="Stripe Secret Key"
              value={stripeSecretKey}
              onChange={(value: string) => setStripeSecretKey(value)} // Fixed onChange handler
              placeholder="sk_live_..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Find this in your Stripe Dashboard under API Keys. Use your secret key (not publishable key).
            </p>
          </div>

          <Button onClick={handleSaveKey} disabled={isSubmitting || !stripeSecretKey} className="mt-2">
            {isSubmitting ? 'Saving...' : 'Save API Key'}
          </Button>
        </CardContent>
      </Card>

      {isKeySet && (<Card>
          <CardHeader>
            <CardTitle>Test Stripe Analytics</CardTitle>
            <CardDescription>
              Try out some sample queries to test the Stripe analytics integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="test-query">Test Query</Label>
              <Input
                id="test-query"
                placeholder="e.g., What's our total revenue in the last 30 days?"
                value={testQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestQuery(e.target.value)} // Ensured proper state update
              />
              <p className="text-xs text-muted-foreground">
                Try queries like "total revenue", "active subscriptions", or "refunds this week"
              </p>
            </div>

            <Button onClick={handleTestQuery} disabled={isLoading || !testQuery}>
              {isLoading ? 'Running...' : 'Run Test Query'}
            </Button>

            {testResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                <h3 className="font-medium mb-2">Result:</h3>
                <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
              </div>
            )}
          </CardContent>
        </Card>)}
    </div>);
}
