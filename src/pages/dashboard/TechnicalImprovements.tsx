import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  Shield,
  Globe,
  BarChart3,
  Database,
  Activity,
  Zap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { logger } from "@/utils/loggingService";
export default function TechnicalImprovements() {
  const [activeTab, setActiveTab] = useState("performance");
  const [loadingOptimization, setLoadingOptimization] = useState(false);
  const [securityScanRunning, setSecurityScanRunning] = useState(false);
  const [apiTestRunning, setApiTestRunning] = useState(false);
  const [analyzingData, setAnalyzingData] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  // Performance metrics
  const performanceMetrics = {
    pageLoad: 1.8, // seconds
    timeToInteractive: 2.4, // seconds
    memoryUsage: 58, // MB
    apiResponseTime: 380, // ms
    renderTime: 120, // ms
  };
  // Security metrics
  const securityMetrics = {
    vulnerabilities: 2,
    securityScore: 86,
    daysToLastAudit: 31,
    totalIssues: 5,
    criticalIssues: 0,
  };
  // API metrics
  const apiMetrics = {
    endpoints: 28,
    averageResponseTime: 210, // ms
    successRate: 99.2, // percentage
    totalRequests: 12450,
    webhookIntegrations: 4,
  };
  // Sentiment analysis data
  const sentimentData = {
    positivePercentage: 72,
    negativePercentage: 18,
    neutralPercentage: 10,
    averageSentiment: 7.8,
    totalAnalyzed: 1238,
  };
  const handleOptimizeNow = () => {
    setLoadingOptimization(true);
    setCurrentProgress(0);
    // Log this action
    logger.info("Performance optimization started", {
      component: "TechnicalImprovements",
    });
    // Simulate progress with a timer
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingOptimization(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  const runSecurityScan = () => {
    setSecurityScanRunning(true);
    setCurrentProgress(0);
    logger.info("Security scan initiated", {
      component: "TechnicalImprovements",
    });
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSecurityScanRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  const testApiEndpoints = () => {
    setApiTestRunning(true);
    setCurrentProgress(0);
    logger.info("API endpoint testing started", {
      component: "TechnicalImprovements",
    });
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setApiTestRunning(false);
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };
  const analyzeSentiment = () => {
    setAnalyzingData(true);
    setCurrentProgress(0);
    logger.info("Sentiment analysis started", {
      component: "TechnicalImprovements",
    });
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzingData(false);
          return 100;
        }
        return prev + 4;
      });
    }, 250);
  };
  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">
          Performance and Technical Improvements
        </h1>
        <p className="text-muted-foreground">
          Tools and features to optimize your application performance, security,
          and integrations.
        </p>

        <Tabs
          defaultValue="performance"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Sentiment</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </TabsTrigger>
          </TabsList>

          {/* Performance Optimization Tab */}
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Gauge className="h-5 w-5 mr-2 text-blue-500" />
                    Page Load Speed
                  </CardTitle>
                  <CardDescription>Current average load time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {performanceMetrics.pageLoad}s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &lt; 1.5s
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      (1.5 / performanceMetrics.pageLoad) * 100,
                    )}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-green-500" />
                    Time to Interactive
                  </CardTitle>
                  <CardDescription>User interaction readiness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {performanceMetrics.timeToInteractive}s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &lt; 2.0s
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      (2.0 / performanceMetrics.timeToInteractive) * 100,
                    )}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    API Response Time
                  </CardTitle>
                  <CardDescription>Average server response</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">
                    {performanceMetrics.apiResponseTime}ms
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &lt; 300ms
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      (300 / performanceMetrics.apiResponseTime) * 100,
                    )}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization</CardTitle>
                <CardDescription>
                  Run automatic optimizations to improve application performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>JavaScript Bundle Size</span>
                    <span className="font-medium">1.2MB</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Image Optimization</span>
                    <span className="font-medium">42 images</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Database Query Performance</span>
                    <span className="font-medium">24 queries</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                {loadingOptimization ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Optimization in progress...</span>
                      <span className="font-medium">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={handleOptimizeNow} className="w-full">
                    Optimize Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Features Tab */}
          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-500" />
                    Security Score
                  </CardTitle>
                  <CardDescription>Overall security rating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {securityMetrics.securityScore}/100
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &gt; 90
                  </div>
                  <Progress
                    value={securityMetrics.securityScore}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-orange-500" />
                    Vulnerabilities
                  </CardTitle>
                  <CardDescription>Detected issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">
                    {securityMetrics.vulnerabilities}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: 0
                  </div>
                  <Progress
                    value={Math.max(
                      0,
                      100 - securityMetrics.vulnerabilities * 25,
                    )}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-500" />
                    Last Security Audit
                  </CardTitle>
                  <CardDescription>Days since last audit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {securityMetrics.daysToLastAudit} days
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &lt; 30 days
                  </div>
                  <Progress
                    value={Math.max(
                      0,
                      100 - securityMetrics.daysToLastAudit * 3,
                    )}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Security Features</CardTitle>
                <CardDescription>
                  Configure additional security measures for your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Two-Factor Authentication (2FA)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Enable 2FA
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Single Sign-On (SSO)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Configure SSO
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        API Key Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Manage API Keys
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Security Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Update Policy
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {securityScanRunning ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Security scan in progress...</span>
                      <span className="font-medium">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={runSecurityScan} className="w-full">
                    Run Security Scan
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Expansion Tab */}
          <TabsContent value="api" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-500" />
                    Total Endpoints
                  </CardTitle>
                  <CardDescription>Available API resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {apiMetrics.endpoints}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {apiMetrics.endpoints > 20
                      ? "Extensive API coverage"
                      : "Basic API coverage"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-indigo-500" />
                    Success Rate
                  </CardTitle>
                  <CardDescription>API call success percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">
                    {apiMetrics.successRate}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &gt; 99.5%
                  </div>
                  <Progress
                    value={apiMetrics.successRate}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-cyan-500" />
                    Webhook Integrations
                  </CardTitle>
                  <CardDescription>Connected external services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600">
                    {apiMetrics.webhookIntegrations}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {apiMetrics.webhookIntegrations > 0
                      ? "Active integrations"
                      : "No integrations"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Expansion</CardTitle>
                <CardDescription>
                  Extend your API capabilities for third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        API Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        View Docs
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">New Endpoint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Create Endpoint
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Webhooks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Manage Webhooks
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Usage Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        View Metrics
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {apiTestRunning ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>API testing in progress...</span>
                      <span className="font-medium">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={testApiEndpoints} className="w-full">
                    Test API Endpoints
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                    Positive Sentiment
                  </CardTitle>
                  <CardDescription>Customer positive feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {sentimentData.positivePercentage}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &gt; 75%
                  </div>
                  <Progress
                    value={sentimentData.positivePercentage}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-red-500" />
                    Negative Sentiment
                  </CardTitle>
                  <CardDescription>Customer negative feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {sentimentData.negativePercentage}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &lt; 15%
                  </div>
                  <Progress
                    value={100 - sentimentData.negativePercentage}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                    Average Sentiment
                  </CardTitle>
                  <CardDescription>
                    Overall satisfaction score (0-10)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {sentimentData.averageSentiment}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: &gt; 8.0
                  </div>
                  <Progress
                    value={(sentimentData.averageSentiment / 10) * 100}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>
                  Analyze customer feedback and communication sentiment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Communication Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Analyze Communications
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Feedback Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Analyze Feedback
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Sentiment Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Topic Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Detect Topics
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {analyzingData ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sentiment analysis in progress...</span>
                      <span className="font-medium">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={analyzeSentiment} className="w-full">
                    Run Sentiment Analysis
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Industry-Specific Knowledge Bases Tab */}
          <TabsContent value="knowledge" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technology</CardTitle>
                  <CardDescription>
                    Specialized knowledge for technology companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Healthcare</CardTitle>
                  <CardDescription>
                    Specialized knowledge for healthcare organizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Finance</CardTitle>
                  <CardDescription>
                    Specialized knowledge for financial services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retail</CardTitle>
                  <CardDescription>
                    Specialized knowledge for retail businesses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manufacturing</CardTitle>
                  <CardDescription>
                    Specialized knowledge for manufacturing industries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Specialized knowledge for educational institutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge Base Completion</span>
                      <span>81%</span>
                    </div>
                    <Progress value={81} className="h-2" />
                    <Button variant="outline" className="w-full mt-4">
                      Access Knowledge Base
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Development</CardTitle>
                <CardDescription>
                  Request specialized knowledge development for your industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Request Industry Knowledge Base
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
