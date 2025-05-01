
import React from 'react';
import { useZapier } from '@/hooks/useZapier';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ZapierReadinessTestProps {
  webhookUrl: string;
  isValid: boolean;
}

const ZapierReadinessTest: React.FC<ZapierReadinessTestProps> = ({ 
  webhookUrl,
  isValid
}) => {
  const { testWebhook, isLoading } = useZapier();
  const [testPassed, setTestPassed] = React.useState<boolean | null>(null);

  const runTest = async () => {
    if (!webhookUrl) {
      toast.error('Please enter a webhook URL first.');
      return;
    }

    if (!isValid) {
      toast.error('The webhook URL is invalid. Please enter a valid URL.');
      return;
    }

    try {
      const result = await testWebhook(webhookUrl);
      setTestPassed(result.success);
      
      if (result.success) {
        toast.success('Webhook test successful! Your webhook URL is properly configured.');
      } else {
        toast.error(`Webhook test failed: ${result.message}`);
      }
    } catch (error) {
      setTestPassed(false);
      toast.error(`Test error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="p-4 border rounded-md border-border/30 bg-muted/10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium">Zapier Connection Test</h4>
          <p className="text-xs text-muted-foreground">
            Test your webhook connection with a simple ping.
          </p>
        </div>
        
        <div className="flex items-center">
          {testPassed !== null && (
            <span className="mr-3">
              {testPassed ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
            </span>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={runTest}
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </div>
      
      {testPassed === true && (
        <p className="mt-2 text-xs text-green-600">
          Connection successful! Your webhook is properly configured.
        </p>
      )}
      
      {testPassed === false && (
        <p className="mt-2 text-xs text-red-600">
          Connection failed. Please check your webhook URL and settings.
        </p>
      )}
    </div>
  );
};

export default ZapierReadinessTest;
