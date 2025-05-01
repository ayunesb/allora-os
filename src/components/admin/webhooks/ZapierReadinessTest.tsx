
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { useZapier } from '@/hooks/useZapier';
import { CheckCircle, AlertCircle, Timer } from 'lucide-react';

interface ZapierReadinessTestProps {
  webhookUrl: string;
  isValid: boolean;
}

const ZapierReadinessTest: React.FC<ZapierReadinessTestProps> = ({ webhookUrl, isValid }) => {
  const { isLoading, triggerBusinessEvent } = useZapier();
  const [testResults, setTestResults] = useState<Record<string, boolean | null>>({
    campaignCreated: null,
    strategyApproved: null,
    leadConverted: null,
    testEvent: null
  });
  
  const runTest = async (eventType: string, displayName: string) => {
    if (!webhookUrl || !isValid) {
      toast.error("Please add a valid webhook URL in the Configure tab first");
      return;
    }
    
    try {
      // Reset the specific test result
      setTestResults(prev => ({
        ...prev,
        [eventType]: null
      }));
      
      const payload = {
        id: `test-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        source: 'zapier-readiness-test'
      };
      
      const result = await triggerBusinessEvent(
        webhookUrl, 
        'test_event' as any, // We're sending a test event with specific context
        {
          ...payload,
          event_type: eventType,
          test_name: displayName
        }
      );
      
      if (result.success) {
        toast.success(`${displayName} test sent successfully`);
        setTestResults(prev => ({
          ...prev,
          [eventType]: true
        }));
      } else {
        toast.error(`${displayName} test failed: ${result.message}`);
        setTestResults(prev => ({
          ...prev,
          [eventType]: false
        }));
      }
    } catch (error) {
      console.error(`Error running ${displayName} test:`, error);
      toast.error(`Failed to run ${displayName} test`);
      setTestResults(prev => ({
        ...prev,
        [eventType]: false
      }));
    }
  };
  
  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <Timer className="h-5 w-5 text-muted-foreground" />;
    return status ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  const tests = [
    { id: 'campaignCreated', name: 'Campaign Created' },
    { id: 'strategyApproved', name: 'Strategy Approved' },
    { id: 'leadConverted', name: 'Lead Converted' },
    { id: 'testEvent', name: 'Test Event' }
  ];
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Test Your Zapier Webhook</h3>
      
      <div className="space-y-4">
        {!webhookUrl && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-4">
            <p className="text-amber-800">
              No webhook URL configured. Please add your Zapier webhook URL in the Configure tab before running tests.
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map((test) => (
              <div key={test.id} className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {getStatusIcon(testResults[test.id])}
                  <span>{test.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => runTest(test.id, test.name)}
                  disabled={isLoading || !webhookUrl || !isValid}
                >
                  Test
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                tests.forEach(test => runTest(test.id, test.name));
              }}
              disabled={isLoading || !webhookUrl || !isValid}
            >
              {isLoading ? 'Testing...' : 'Run All Tests'}
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <h4 className="font-medium text-sm mb-2">How to verify the tests:</h4>
          <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
            <li>Run the test(s) you want to check</li>
            <li>Go to your Zapier account</li>
            <li>Check the Zap history to see if the events were received</li>
            <li>Ensure your Zap can properly parse the payload</li>
          </ol>
        </div>
      </div>
    </Card>
  );
};

export default ZapierReadinessTest;
