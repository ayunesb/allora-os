
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LaunchButton } from "@/components/admin/launch-verification/LaunchButton";
import { EnhancedVerificationChecklist } from "@/components/admin/launch-verification/EnhancedVerificationChecklist";
import { useVerification } from "@/hooks/admin/useVerification";
import { AlertCircle, Check, CheckCircle2, AlertTriangle, Cloud, Server, Lock } from "lucide-react";
import { checkLaunchReadiness } from "@/utils/launchReadiness";
import { toast } from "sonner";

export default function LaunchCheck() {
  const [activeTab, setActiveTab] = useState("readiness");
  const { verificationState, runVerification, isVerifying } = useVerification();
  const [readinessCheckResult, setReadinessCheckResult] = useState<any>(null);
  const [isCheckingReadiness, setIsCheckingReadiness] = useState(false);

  const handleRunReadinessCheck = async () => {
    setIsCheckingReadiness(true);
    try {
      const result = await checkLaunchReadiness();
      setReadinessCheckResult(result);
      
      if (result.overallStatus === 'ready') {
        toast.success("All systems ready for launch! 🚀");
      } else if (result.overallStatus === 'warning') {
        toast.warning("Systems ready with cautions - review warnings before launch");
      } else {
        toast.error("Some critical systems are not ready for launch");
      }
    } catch (error) {
      console.error("Error running readiness check:", error);
      toast.error("Failed to complete launch readiness check");
    } finally {
      setIsCheckingReadiness(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Launch Check</h1>
          <p className="text-muted-foreground">
            Verify system readiness for production
          </p>
        </div>
        <Button 
          onClick={handleRunReadinessCheck} 
          disabled={isCheckingReadiness}
          variant="outline"
          className="gap-2"
        >
          {isCheckingReadiness ? "Checking..." : "Run Readiness Check"}
          {!isCheckingReadiness && <Server className="h-4 w-4" />}
        </Button>
      </div>

      <div className="bg-primary-foreground border border-border/80 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Launch Allora AI</h2>
        <p className="text-muted-foreground mb-6">
          Ready to go live? With one click, initiate Allora AI by creating a self-demo experience 
          with sample data to showcase the platform's capabilities.
        </p>
        
        <LaunchButton />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="readiness">Readiness Check</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="api">API & Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="readiness" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Readiness Status</CardTitle>
              <CardDescription>
                Overall readiness for production launch
              </CardDescription>
            </CardHeader>
            <CardContent>
              {readinessCheckResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatusCard 
                      title="APIs & Services" 
                      status={getApiStatusOverall(readinessCheckResult?.apis)} 
                      icon={<Cloud className="h-5 w-5" />}
                    />
                    <StatusCard 
                      title="Database" 
                      status={readinessCheckResult?.database?.status === 'ready' ? 'ready' : 'error'} 
                      icon={<Server className="h-5 w-5" />}
                    />
                    <StatusCard 
                      title="Features" 
                      status={getFeatureStatusOverall(readinessCheckResult?.features)} 
                      icon={<Check className="h-5 w-5" />}
                    />
                    <StatusCard 
                      title="Compliance" 
                      status={getComplianceStatusOverall(readinessCheckResult?.compliance)} 
                      icon={<Lock className="h-5 w-5" />}
                    />
                  </div>
                  
                  <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                    readinessCheckResult.overallStatus === 'ready' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : readinessCheckResult.overallStatus === 'warning'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {readinessCheckResult.overallStatus === 'ready' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : readinessCheckResult.overallStatus === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        {readinessCheckResult.overallStatus === 'ready' 
                          ? 'System is ready for production launch' 
                          : readinessCheckResult.overallStatus === 'warning'
                          ? 'System can launch with caution - review warnings'
                          : 'System is not ready for production launch'}
                      </p>
                      <p className="text-sm">
                        {readinessCheckResult.overallStatus === 'ready' 
                          ? 'All systems and checks have passed verification' 
                          : readinessCheckResult.overallStatus === 'warning'
                          ? 'Some non-critical items need attention'
                          : 'Critical issues need to be resolved before launch'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Run a readiness check to see detailed system status
                  </p>
                  <Button 
                    onClick={handleRunReadinessCheck} 
                    disabled={isCheckingReadiness}
                  >
                    {isCheckingReadiness ? "Checking..." : "Run Readiness Check"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <EnhancedVerificationChecklist />
        </TabsContent>
        
        <TabsContent value="verification" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Checks</CardTitle>
              <CardDescription>
                Run comprehensive verification of all system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This will check all critical systems including:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Database connections and tables</li>
                <li>External API integrations</li>
                <li>Authentication and security settings</li>
                <li>Core functionality and features</li>
              </ul>
              <Button 
                onClick={runVerification} 
                disabled={isVerifying} 
                className="mt-2"
              >
                {isVerifying ? "Running Verification..." : "Run Full Verification"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>External API Status</CardTitle>
              <CardDescription>
                Current status of all external API connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {readinessCheckResult?.apis ? (
                  Object.entries(readinessCheckResult.apis).map(([key, status]) => (
                    <div key={key} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium capitalize">{key}</p>
                        <p className="text-sm text-muted-foreground">
                          {getApiDescription(key)}
                        </p>
                      </div>
                      <StatusBadge status={status as 'connected' | 'error' | 'not_configured'} />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    Run a readiness check to see API status
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components and functions
interface StatusCardProps {
  title: string;
  status: 'ready' | 'warning' | 'error';
  icon: React.ReactNode;
}

function StatusCard({ title, status, icon }: StatusCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${
      status === 'ready' 
        ? 'bg-green-50 border-green-200' 
        : status === 'warning'
        ? 'bg-yellow-50 border-yellow-200'
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          status === 'ready' 
            ? 'bg-green-100 text-green-700' 
            : status === 'warning'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className={`text-sm ${
            status === 'ready' 
              ? 'text-green-700' 
              : status === 'warning'
              ? 'text-yellow-700'
              : 'text-red-700'
          }`}>
            {status === 'ready' 
              ? 'Ready' 
              : status === 'warning'
              ? 'Warning'
              : 'Not Ready'}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'connected' | 'error' | 'not_configured' }) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      status === 'connected' 
        ? 'bg-green-100 text-green-800' 
        : status === 'error'
        ? 'bg-red-100 text-red-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {status === 'connected' 
        ? 'Connected' 
        : status === 'error'
        ? 'Error'
        : 'Not Configured'}
    </span>
  );
}

// Helper functions
function getApiStatusOverall(apis: Record<string, string> | undefined): 'ready' | 'warning' | 'error' {
  if (!apis) return 'error';
  
  const statuses = Object.values(apis);
  const connectedCount = statuses.filter(s => s === 'connected').length;
  const totalCount = statuses.length;
  
  if (connectedCount === totalCount) return 'ready';
  if (connectedCount >= totalCount / 2) return 'warning';
  return 'error';
}

function getFeatureStatusOverall(features: Record<string, boolean> | undefined): 'ready' | 'warning' | 'error' {
  if (!features) return 'error';
  
  const enabledCount = Object.values(features).filter(Boolean).length;
  const totalCount = Object.values(features).length;
  
  if (enabledCount === totalCount) return 'ready';
  if (enabledCount >= totalCount - 2) return 'warning';
  return 'error';
}

function getComplianceStatusOverall(compliance: any): 'ready' | 'warning' | 'error' {
  if (!compliance) return 'error';
  
  const { apiSecurityLevel, ...booleanItems } = compliance;
  const enabledCount = Object.values(booleanItems).filter(Boolean).length;
  const totalCount = Object.values(booleanItems).length;
  
  if (enabledCount === totalCount && apiSecurityLevel === 'high') return 'ready';
  if (enabledCount >= totalCount - 1 && (apiSecurityLevel === 'medium' || apiSecurityLevel === 'high')) return 'warning';
  return 'error';
}

function getApiDescription(apiName: string): string {
  const descriptions: Record<string, string> = {
    stripe: 'Payment processing and subscription management',
    postmark: 'Transactional email delivery',
    twilio: 'SMS and WhatsApp messaging',
    heygen: 'AI video generation',
    openai: 'AI conversation and content generation',
    zapier: 'Workflow automation and integrations'
  };
  
  return descriptions[apiName] || 'External service integration';
}
