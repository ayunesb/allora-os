import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Settings } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';
import { useNavigate } from 'react-router-dom';
import { verifyApiSecrets } from '@/utils/cleanupForProduction';
import { verifyZapierWebhooks } from '@/utils/webhookTester';
import ZapierTriggerButton from '@/components/integrations/ZapierTriggerButton';

export function AuditIntegrations({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [manualComplete, setManualComplete] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'int-1',
      title: 'Stripe Billing',
      description: 'Create customer, handle payment, check webhook callbacks',
      status: 'pending',
      required: true
    },
    {
      id: 'int-2',
      title: 'Twilio WhatsApp',
      description: 'Send/Receive WhatsApp messages post onboarding',
      status: 'pending',
      required: true
    },
    {
      id: 'int-3',
      title: 'Postmark Emails',
      description: 'Trigger Welcome Emails and Campaign Emails',
      status: 'pending',
      required: true
    },
    {
      id: 'int-4',
      title: 'Heygen AI Videos',
      description: 'Generate intro video scripts based on company profile',
      status: 'pending',
      required: false
    },
    {
      id: 'int-5',
      title: 'OpenAI API',
      description: 'Test AI responses for executive debates',
      status: 'pending',
      required: true
    },
    {
      id: 'int-6',
      title: 'Zapier Flows',
      description: 'Test each webhook automatically without user clicks',
      status: 'pending',
      required: false
    }
  ]);

  useEffect(() => {
    if (status === 'pending') {
      checkApiConnections(false);
    }
  }, []);

  const checkApiConnections = async (showToasts = true) => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    try {
      setItems(prev => prev.map(item => ({ ...item, status: 'in-progress' })));
      
      const apiResult = await verifyApiSecrets();
      
      if (apiResult.success) {
        setItems(prev => prev.map(item => {
          if (item.id === 'int-6') return item;
          return { ...item, status: 'passed' };
        }));
        
        if (showToasts) {
          toast.success('All API connections verified successfully');
        }
      } else if (apiResult.missingSecrets) {
        setItems(prev => prev.map(item => {
          if (item.id === 'int-1' && apiResult.missingSecrets?.includes('STRIPE_SECRET_KEY')) {
            return { ...item, status: 'failed' };
          } else if (item.id === 'int-2' && (
            apiResult.missingSecrets?.includes('TWILIO_ACCOUNT_SID') || 
            apiResult.missingSecrets?.includes('TWILIO_AUTH_TOKEN')
          )) {
            return { ...item, status: 'failed' };
          } else if (item.id === 'int-3' && apiResult.missingSecrets?.includes('POSTMARK_API_KEY')) {
            return { ...item, status: 'failed' };
          } else if (item.id === 'int-4' && apiResult.missingSecrets?.includes('HEYGEN_API_KEY')) {
            return { ...item, status: 'failed' };
          } else if (item.id === 'int-5' && apiResult.missingSecrets?.includes('OPENAI_API_KEY')) {
            return { ...item, status: 'failed' };
          } else if (item.id === 'int-6') {
            return item;
          } else {
            return { ...item, status: 'passed' };
          }
        }));
        
        if (showToasts) {
          toast.warning('Some API connections are missing');
        }
      }
      
      const zapierItem = items.find(item => item.id === 'int-6');
      if (zapierItem) {
        setItems(prev => prev.map(item => 
          item.id === 'int-6' ? { ...item, status: 'in-progress' } : item
        ));
        
        const zapierResults = await verifyZapierWebhooks();
        const zapierPassed = Object.values(zapierResults).some(result => result);
        
        setItems(prev => prev.map(item => 
          item.id === 'int-6' ? { ...item, status: zapierPassed ? 'passed' : 'failed' } : item
        ));
      }
      
      const requiredItems = items.filter(item => item.required);
      const allRequiredPassed = requiredItems.every(item => {
        const currentItem = items.find(i => i.id === item.id);
        return currentItem?.status === 'passed';
      });
      
      onStatusChange(allRequiredPassed ? 'passed' : 'failed');
      
      if (showToasts) {
        if (allRequiredPassed) {
          toast.success('API Integrations audit passed!');
        } else {
          toast.error('API Integrations audit failed. Please configure missing APIs.');
        }
      }
    } catch (error) {
      console.error('Error checking API connections:', error);
      if (showToasts) {
        toast.error('Failed to verify API connections');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleManualOverride = () => {
    if (manualComplete) {
      onStatusChange('passed');
      toast.success('API Integrations marked as complete!');
    } else {
      onStatusChange('pending');
    }
  };

  const testZapierWebhook = async () => {
    const webhookUrl = localStorage.getItem('zapier_webhook_url');
    
    if (!webhookUrl) {
      toast.error('No Zapier webhook URL configured');
      return;
    }
    
    setItems(prev => prev.map(item => 
      item.id === 'int-6' ? { ...item, status: 'in-progress' } : item
    ));
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          event_type: 'audit_test',
          timestamp: new Date().toISOString(),
          source: 'allora_audit',
          data: {
            message: 'This is a test from Allora AI Audit',
            test_id: Math.random().toString(36).substring(2, 15)
          }
        })
      });
      
      toast.success('Zapier test webhook triggered');
      setItems(prev => prev.map(item => 
        item.id === 'int-6' ? { ...item, status: 'passed' } : item
      ));
    } catch (error) {
      console.error('Error testing Zapier webhook:', error);
      toast.error('Failed to trigger Zapier webhook');
      setItems(prev => prev.map(item => 
        item.id === 'int-6' ? { ...item, status: 'failed' } : item
      ));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary/80" />
            <CardTitle>Critical API Integrations Testing</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => navigate('/admin/api-integrations')}
              variant="outline"
              size="sm"
              className="mr-2"
            >
              API Dashboard
            </Button>
            <Button 
              onClick={() => checkApiConnections(true)}
              disabled={isRunning}
              size="sm"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                'Run Tests'
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-start space-x-2"
            >
              <div className="mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.title}</span>
                  {!item.required && (
                    <span className="text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded">Optional</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
                
                {item.id === 'int-6' && (
                  <div className="mt-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={testZapierWebhook}
                    >
                      Test Webhook
                    </Button>
                    <ZapierTriggerButton 
                      webhookType="newLead"
                      payload={{
                        test_type: "integration_audit",
                        timestamp: new Date().toISOString()
                      }}
                      label="Test Component"
                      size="sm"
                      variant="outline"
                      className="ml-2 h-7 text-xs"
                    />
                  </div>
                )}
              </div>
              <div className="ml-auto flex items-center">
                <Checkbox 
                  id={item.id}
                  checked={item.status === 'passed'}
                  disabled={isRunning}
                  onCheckedChange={(checked) => {
                    setItems(prev => prev.map(i => 
                      i.id === item.id ? { ...i, status: checked ? 'passed' : 'failed' } : i
                    ));
                    
                    const allRequired = items
                      .filter(i => i.required)
                      .every(i => i.id === item.id ? checked : i.status === 'passed');
                      
                    onStatusChange(allRequired ? 'passed' : 'failed');
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="manual-override"
                checked={manualComplete}
                onCheckedChange={(checked) => {
                  setManualComplete(!!checked);
                  if (checked) {
                    handleManualOverride();
                  } else {
                    const allRequiredPassed = items
                      .filter(item => item.required)
                      .every(item => item.status === 'passed');
                    
                    onStatusChange(allRequiredPassed ? 'passed' : 'failed');
                  }
                }}
              />
              <label
                htmlFor="manual-override"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I've manually verified all API integrations are working correctly
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
