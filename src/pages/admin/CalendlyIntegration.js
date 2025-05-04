import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
const APIKeyInput = ({ value, onChange, placeholder, error }) => {
    return (<div className="space-y-1">
      <Input type="password" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || "Enter API key"}/>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>);
};
const CalendlyIntegration = () => {
    const { toast } = useToast();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [apiKeyError, setApiKeyError] = useState('');
    const [apiKeyValue, setApiKeyValue] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            apiKey: ''
        }
    });
    const onSubmit = async (data) => {
        setIsConnecting(true);
        setApiKeyError('');
        try {
            // This would normally call an API to validate and save the key
            if (!data.apiKey.startsWith('cal_')) {
                setApiKeyError('Invalid Calendly API key format. Should start with "cal_"');
                throw new Error('Invalid API key format');
            }
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Set connected status
            setIsConnected(true);
            toast({
                title: "Connected to Calendly",
                description: "Your Calendly account has been successfully connected.",
            });
        }
        catch (error) {
            console.error('Error connecting to Calendly:', error);
            toast({
                title: "Connection Failed",
                description: error.message || "Failed to connect to Calendly",
                variant: "destructive",
            });
        }
        finally {
            setIsConnecting(false);
        }
    };
    const handleDisconnect = () => {
        setIsConnected(false);
        toast({
            title: "Disconnected",
            description: "Your Calendly account has been disconnected.",
        });
    };
    const handleApiKeyChange = (value) => {
        setApiKeyValue(value);
        const field = register('apiKey');
        field.onChange({ target: { name: field.name, value } });
    };
    return (<div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Calendly Integration</h1>
      
      <p className="text-muted-foreground mb-6">
        Connect Allora AI to your Calendly account to automatically schedule meetings and manage your calendar.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Connect to Calendly</CardTitle>
          <CardDescription>
            Enter your Calendly API key to enable scheduling features in Allora AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Calendly API Key
                </label>
                <APIKeyInput value={apiKeyValue} onChange={handleApiKeyChange} placeholder="cal_..." error={apiKeyError || errors.apiKey?.message}/>
                <p className="text-xs text-muted-foreground">
                  You can find your API key in your{' '}
                  <a href="https://calendly.com/integrations/api_webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Calendly account settings
                  </a>
                </p>
              </div>
              
              <Button type="submit" disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect to Calendly'}
              </Button>
            </form>) : (<div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-800 rounded-md">
                <p className="font-medium">Connected to Calendly</p>
                <p className="text-sm mt-1">
                  Your Calendly account is now connected to Allora AI. You can now use Calendly features within the application.
                </p>
              </div>
              
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect from Calendly
              </Button>
            </div>)}
        </CardContent>
      </Card>
    </div>);
};
export default CalendlyIntegration;
