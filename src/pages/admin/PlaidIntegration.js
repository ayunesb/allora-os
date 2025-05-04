import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
const PlaidIntegration = () => {
    const { toast } = useToast();
    const { profile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    // Initialize personal API keys with plaid fields
    const [personalApiKeys, setPersonalApiKeys] = useState({
        stripe: '',
        twilio: '',
        zoom: '',
        openai: '',
        plaid_client_id: '',
        plaid_secret: '',
        plaid_access_token: '',
        plaid_env: 'sandbox' // Default value
    });
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            plaid_client_id: personalApiKeys.plaid_client_id || '',
            plaid_secret: personalApiKeys.plaid_secret || '',
            plaid_access_token: personalApiKeys.plaid_access_token || '',
            plaid_env: personalApiKeys.plaid_env || 'sandbox'
        }
    });
    // Load API keys from profile
    useEffect(() => {
        if (profile?.personal_api_keys) {
            // Convert from possible JSON string
            const keys = typeof profile.personal_api_keys === 'string'
                ? JSON.parse(profile.personal_api_keys)
                : profile.personal_api_keys;
            setPersonalApiKeys(prev => ({
                ...prev,
                ...keys
            }));
            // Reset form with loaded values
            reset({
                plaid_client_id: keys.plaid_client_id || '',
                plaid_secret: keys.plaid_secret || '',
                plaid_access_token: keys.plaid_access_token || '',
                plaid_env: keys.plaid_env || 'sandbox'
            });
        }
    }, [profile, reset]);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Implementation would go here in a real app
            console.log('Saving Plaid integration settings:', data);
            toast({
                title: 'Settings saved',
                description: 'Your Plaid integration settings have been updated successfully.',
            });
        }
        catch (error) {
            console.error('Error saving Plaid settings:', error);
            toast({
                title: 'Error',
                description: 'Failed to save Plaid integration settings.',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Plaid Integration</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Connect to Plaid</CardTitle>
          <CardDescription>
            Use Plaid to connect to bank accounts and financial data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="plaid_client_id" className="text-sm font-medium">
                Plaid Client ID
              </label>
              <Input id="plaid_client_id" type="text" placeholder="Enter your Plaid Client ID" {...register('plaid_client_id')}/>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="plaid_secret" className="text-sm font-medium">
                Plaid Secret
              </label>
              <Input id="plaid_secret" type="password" placeholder="Enter your Plaid Secret" {...register('plaid_secret')}/>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="plaid_access_token" className="text-sm font-medium">
                Plaid Access Token
              </label>
              <Input id="plaid_access_token" type="password" placeholder="Enter your Plaid Access Token" {...register('plaid_access_token')}/>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="plaid_env" className="text-sm font-medium">
                Plaid Environment
              </label>
              <select id="plaid_env" className="w-full p-2 border rounded-md" {...register('plaid_env')}>
                <option value="sandbox">Sandbox</option>
                <option value="development">Development</option>
                <option value="production">Production</option>
              </select>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Plaid Settings'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);
};
export default PlaidIntegration;
