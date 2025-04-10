
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, RefreshCw, ExternalLink, ShieldCheck } from 'lucide-react';
import { checkLaunchReadiness, LaunchReadinessStatus, ApiStatus } from '@/utils/launchReadiness';
import { toast } from 'sonner';

export default function LaunchReadinessCheck() {
  const [readinessStatus, setReadinessStatus] = useState<LaunchReadinessStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  useEffect(() => {
    performReadinessCheck();
  }, []);
  
  async function performReadinessCheck() {
    setIsChecking(true);
    try {
      const status = await checkLaunchReadiness();
      setReadinessStatus(status);
      
      // Show toast with overall status
      if (status.overallStatus === 'ready') {
        toast.success('All systems ready for launch!');
      } else if (status.overallStatus === 'warning') {
        toast.warning('System can be launched with some warnings');
      } else {
        toast.error('System is not ready for launch');
      }
    } catch (error) {
      console.error('Error performing readiness check:', error);
      toast.error('Failed to complete readiness check');
    } finally {
      setIsChecking(false);
    }
  }
  
  function getApiStatusBadge(status: ApiStatus) {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'not_configured':
        return <Badge variant="outline" className="text-muted-foreground">Not Configured</Badge>;
      default:
        return null;
    }
  }
  
  function getStatusIcon(status: boolean | string) {
    if (status === true || status === 'ready' || status === 'connected' || status === 'high') {
      return <Check className="h-4 w-4 text-green-500" />;
    } else if (status === 'warning' || status === 'medium') {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <X className="h-4 w-4 text-red-500" />;
    }
  }
  
  if (!readinessStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Launch Readiness Check</CardTitle>
          <CardDescription>Checking system readiness...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <RefreshCw className="h-8 w-8 animate-spin text-primary/70" />
        </CardContent>
      </Card>
    );
  }
  
  const overallStatusClasses = 
    readinessStatus.overallStatus === 'ready' 
      ? 'bg-green-500/10 text-green-500 border-green-200' 
      : readinessStatus.overallStatus === 'warning' 
        ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
        : 'bg-red-500/10 text-red-600 border-red-200';
  
  return (
    <Card className="relative overflow-hidden border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Launch Readiness Check</CardTitle>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={performReadinessCheck} 
            disabled={isChecking}
            className="h-8 gap-1"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>
          System readiness check for production launch
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Alert variant="outline" className={`${overallStatusClasses} border`}>
          <div className="flex items-center gap-2">
            {readinessStatus.overallStatus === 'ready' ? (
              <ShieldCheck className="h-5 w-5" />
            ) : readinessStatus.overallStatus === 'warning' ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
            
            <AlertTitle className="font-medium">
              {readinessStatus.overallStatus === 'ready' 
                ? 'Ready for Launch' 
                : readinessStatus.overallStatus === 'warning'
                  ? 'Launch with Caution'
                  : 'Not Ready for Launch'
              }
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2 text-sm">
            {readinessStatus.overallStatus === 'ready'
              ? 'All systems have been checked and are ready for production deployment.'
              : readinessStatus.overallStatus === 'warning'
                ? 'System can be launched but some non-critical items need attention.'
                : 'The system is not ready for launch. Please address the issues highlighted below.'
            }
          </AlertDescription>
        </Alert>
        
        <div>
          <h3 className="text-lg font-medium mb-3">API Connections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Stripe</div>
                  <div className="text-xs text-muted-foreground">Payments & Billing</div>
                </div>
              </div>
              {getApiStatusBadge(readinessStatus.apis.stripe)}
            </div>
            
            <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Postmark</div>
                  <div className="text-xs text-muted-foreground">Email Delivery</div>
                </div>
              </div>
              {getApiStatusBadge(readinessStatus.apis.postmark)}
            </div>
            
            <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Twilio</div>
                  <div className="text-xs text-muted-foreground">WhatsApp & SMS</div>
                </div>
              </div>
              {getApiStatusBadge(readinessStatus.apis.twilio)}
            </div>
            
            <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Heygen</div>
                  <div className="text-xs text-muted-foreground">Video Generation</div>
                </div>
              </div>
              {getApiStatusBadge(readinessStatus.apis.heygen)}
            </div>
            
            <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">OpenAI</div>
                  <div className="text-xs text-muted-foreground">AI & Content</div>
                </div>
              </div>
              {getApiStatusBadge(readinessStatus.apis.openai)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Database & Data</h3>
            <div className="space-y-2 bg-secondary/20 p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Database Status</div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(readinessStatus.database.status)}
                  <span className="text-sm">{readinessStatus.database.status === 'ready' ? 'Ready' : 'Error'}</span>
                </div>
              </div>
              
              {readinessStatus.database.message && (
                <div className="text-xs text-muted-foreground">{readinessStatus.database.message}</div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Compliance</h3>
            <div className="space-y-2 bg-secondary/20 p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">WhatsApp Opt-In/Out</div>
                <div>{getStatusIcon(readinessStatus.compliance.whatsappOptIn)}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Email Unsubscribe</div>
                <div>{getStatusIcon(readinessStatus.compliance.emailUnsubscribe)}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Billing Compliance</div>
                <div>{getStatusIcon(readinessStatus.compliance.billingCompliance)}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">API Security Level</div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(readinessStatus.compliance.apiSecurityLevel)}
                  <span className="text-sm capitalize">{readinessStatus.compliance.apiSecurityLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Features Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Authentication</div>
                <div>{getStatusIcon(readinessStatus.features.authentication)}</div>
              </div>
              <div className="text-xs text-muted-foreground">User login & registration</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Onboarding</div>
                <div>{getStatusIcon(readinessStatus.features.onboarding)}</div>
              </div>
              <div className="text-xs text-muted-foreground">User setup process</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Strategies</div>
                <div>{getStatusIcon(readinessStatus.features.strategies)}</div>
              </div>
              <div className="text-xs text-muted-foreground">Business strategies</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Campaigns</div>
                <div>{getStatusIcon(readinessStatus.features.campaigns)}</div>
              </div>
              <div className="text-xs text-muted-foreground">Marketing campaigns</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">AI Debate</div>
                <div>{getStatusIcon(readinessStatus.features.aiDebate)}</div>
              </div>
              <div className="text-xs text-muted-foreground">Executive debate feature</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Welcome Video</div>
                <div>{getStatusIcon(readinessStatus.features.welcomeVideo)}</div>
              </div>
              <div className="text-xs text-muted-foreground">Personalized video</div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Billing</div>
                <div>{getStatusIcon(readinessStatus.features.billing)}</div>
              </div>
              <div className="text-xs text-muted-foreground">Subscription management</div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
        <div className="text-sm text-muted-foreground">
          Last checked: {new Date().toLocaleString()}
        </div>
        
        {readinessStatus.overallStatus === 'ready' && (
          <Button className="w-full sm:w-auto gap-2">
            <ExternalLink className="h-4 w-4" />
            Launch to Production
          </Button>
        )}
        
        {readinessStatus.overallStatus === 'warning' && (
          <Button variant="secondary" className="w-full sm:w-auto gap-2">
            <AlertTriangle className="h-4 w-4" />
            Launch with Warnings
          </Button>
        )}
        
        {readinessStatus.overallStatus === 'not_ready' && (
          <Button variant="secondary" className="w-full sm:w-auto gap-2" disabled>
            <X className="h-4 w-4" />
            Fix Issues to Launch
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
