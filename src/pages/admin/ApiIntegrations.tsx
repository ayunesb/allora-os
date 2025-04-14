
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  LucideShoppingBag,
  Mail,
  MessageSquare,
  VideoIcon,
  Bot
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { verifyApiSecrets } from "@/utils/cleanupForProduction";
import ZapierReadinessTest from "@/components/admin/webhooks/ZapierReadinessTest";

type ApiStatus = 'connected' | 'disconnected' | 'configuring' | 'error';

interface ApiIntegration {
  name: string;
  status: ApiStatus;
  icon: React.ReactNode;
  description: string;
  documentationUrl?: string;
  setupUrl?: string;
  integrationDate?: string;
  requiredForLaunch: boolean;
}

export default function ApiIntegrations() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([
    {
      name: 'Stripe',
      status: 'configuring',
      icon: <LucideShoppingBag className="h-5 w-5" />,
      description: 'Payment processing, subscription management, and billing.',
      documentationUrl: 'https://stripe.com/docs',
      setupUrl: 'https://dashboard.stripe.com/apikeys',
      requiredForLaunch: true
    },
    {
      name: 'Postmark',
      status: 'configuring',
      icon: <Mail className="h-5 w-5" />,
      description: 'Transactional email delivery for authentication and notifications.',
      documentationUrl: 'https://postmarkapp.com/developer',
      setupUrl: 'https://account.postmarkapp.com/servers',
      requiredForLaunch: true
    },
    {
      name: 'Twilio',
      status: 'configuring',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'SMS and WhatsApp communication for customer engagement.',
      documentationUrl: 'https://www.twilio.com/docs',
      setupUrl: 'https://www.twilio.com/console',
      requiredForLaunch: true
    },
    {
      name: 'Heygen',
      status: 'configuring',
      icon: <VideoIcon className="h-5 w-5" />,
      description: 'AI-powered video generation for personalized content.',
      documentationUrl: 'https://heygen.com/developers',
      setupUrl: 'https://app.heygen.com/settings/api',
      requiredForLaunch: false
    },
    {
      name: 'OpenAI',
      status: 'configuring',
      icon: <Bot className="h-5 w-5" />,
      description: 'AI capabilities for executive debates and strategy generation.',
      documentationUrl: 'https://platform.openai.com/docs',
      setupUrl: 'https://platform.openai.com/api-keys',
      requiredForLaunch: true
    },
    {
      name: 'Zapier',
      status: 'configuring',
      icon: <ExternalLink className="h-5 w-5" />,
      description: 'Automation workflows connecting Allora AI with 5000+ apps.',
      documentationUrl: 'https://zapier.com/apps/webhook/integrations',
      setupUrl: 'https://zapier.com/app/dashboard',
      requiredForLaunch: false
    },
  ]);

  useEffect(() => {
    // Check API connection status when the component mounts
    checkApiConnections();
  }, []);

  const checkApiConnections = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyApiSecrets();
      console.log("API verification result:", result);
      
      if (result.success) {
        // Update all connections to connected
        setIntegrations(prev => prev.map(integration => ({
          ...integration,
          status: 'connected',
          integrationDate: new Date().toISOString()
        })));
        toast.success("All API connections verified successfully");
      } else if (result.missingSecrets && result.missingSecrets.length > 0) {
        // Update specific integration statuses based on missing secrets
        setIntegrations(prev => prev.map(integration => {
          let status: ApiStatus = 'connected';
          
          if (
            (integration.name === 'Stripe' && result.missingSecrets?.includes('STRIPE_SECRET_KEY')) ||
            (integration.name === 'Postmark' && result.missingSecrets?.includes('POSTMARK_API_KEY')) ||
            (integration.name === 'Twilio' && (
              result.missingSecrets?.includes('TWILIO_ACCOUNT_SID') || 
              result.missingSecrets?.includes('TWILIO_AUTH_TOKEN')
            )) ||
            (integration.name === 'Heygen' && result.missingSecrets?.includes('HEYGEN_API_KEY')) ||
            (integration.name === 'OpenAI' && result.missingSecrets?.includes('OPENAI_API_KEY'))
          ) {
            status = 'disconnected';
          }
          
          return {
            ...integration,
            status,
            integrationDate: status === 'connected' ? new Date().toISOString() : undefined
          };
        }));
        
        toast.warning("Some API connections need configuration");
      } else {
        // Something went wrong with the verification
        toast.error("Failed to verify API connections");
      }
    } catch (error) {
      console.error("Error verifying API connections:", error);
      toast.error("Error verifying API connections");
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusBadge = (status: ApiStatus) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Disconnected</Badge>;
      case 'configuring':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Needs Setup</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: ApiStatus) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'configuring':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getConnectionSuccess = () => {
    const requiredIntegrations = integrations.filter(i => i.requiredForLaunch);
    const connectedRequired = requiredIntegrations.filter(i => i.status === 'connected').length;
    const totalRequired = requiredIntegrations.length;
    
    return {
      requiredSuccess: connectedRequired === totalRequired,
      totalSuccess: integrations.every(i => i.status === 'connected'),
      requiredCount: connectedRequired,
      totalRequiredCount: totalRequired,
      totalCount: integrations.filter(i => i.status === 'connected').length,
      grandTotal: integrations.length
    };
  };

  const connectionStatus = getConnectionSuccess();

  return (
    <>
      <Helmet>
        <title>API Integrations | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">API Integrations</h1>
          <p className="text-muted-foreground">
            Manage connections to third-party services that power Allora AI
          </p>
        </div>

        {connectionStatus.requiredSuccess ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">All required API integrations connected!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your platform is ready for launch with all necessary API integrations configured.
              {!connectionStatus.totalSuccess && " Some optional integrations may still need setup."}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Critical API integrations missing</AlertTitle>
            <AlertDescription>
              {connectionStatus.requiredCount}/{connectionStatus.totalRequiredCount} required integrations connected. 
              Please set up the remaining API connections before launching.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {connectionStatus.totalCount}/{connectionStatus.grandTotal} total integrations connected
          </div>
          <Button 
            onClick={checkApiConnections}
            disabled={isVerifying}
            size="sm"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Connections'
            )}
          </Button>
        </div>

        <Tabs defaultValue="connections" className="w-full">
          <TabsList>
            <TabsTrigger value="connections">API Connections</TabsTrigger>
            <TabsTrigger value="zapier">Zapier Integration</TabsTrigger>
            <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.name} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {integration.icon}
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        {integration.requiredForLaunch && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </div>
                      {getStatusIcon(integration.status)}
                    </div>
                    <CardDescription>
                      {integration.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        {getStatusBadge(integration.status)}
                      </div>
                      {integration.integrationDate && (
                        <div className="text-xs text-muted-foreground">
                          Connected: {new Date(integration.integrationDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    {integration.documentationUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(integration.documentationUrl, '_blank')}
                      >
                        Docs
                      </Button>
                    )}
                    {integration.setupUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(integration.setupUrl, '_blank')}
                      >
                        Setup
                      </Button>
                    )}
                    <Button 
                      variant={integration.status === 'connected' ? 'secondary' : 'default'} 
                      size="sm"
                      className="ml-auto"
                      onClick={() => {
                        if (integration.name === 'Stripe') {
                          window.location.href = '/admin/api-keys';
                        } else if (integration.name === 'Zapier') {
                          window.location.href = '/admin/webhooks';
                        } else {
                          window.location.href = '/admin/api-keys';
                        }
                      }}
                    >
                      Configure
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="zapier" className="space-y-4 mt-4">
            <ZapierReadinessTest />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced API Settings</CardTitle>
                <CardDescription>
                  Configure advanced settings for API integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Advanced settings</AlertTitle>
                    <AlertDescription>
                      These settings are intended for advanced users and developers. Incorrect configuration may affect the functionality of your Allora AI platform.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20">
                    <p className="text-center text-muted-foreground">
                      Advanced API settings will be added in a future update
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
