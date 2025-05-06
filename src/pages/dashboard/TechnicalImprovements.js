"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TechnicalImprovements;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var progress_1 = require("@/components/ui/progress");
var loggingService_1 = require("@/utils/loggingService");
function TechnicalImprovements() {
  var _a = (0, react_1.useState)("performance"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)(false),
    loadingOptimization = _b[0],
    setLoadingOptimization = _b[1];
  var _c = (0, react_1.useState)(false),
    securityScanRunning = _c[0],
    setSecurityScanRunning = _c[1];
  var _d = (0, react_1.useState)(false),
    apiTestRunning = _d[0],
    setApiTestRunning = _d[1];
  var _e = (0, react_1.useState)(false),
    analyzingData = _e[0],
    setAnalyzingData = _e[1];
  var _f = (0, react_1.useState)(0),
    currentProgress = _f[0],
    setCurrentProgress = _f[1];
  // Performance metrics
  var performanceMetrics = {
    pageLoad: 1.8, // seconds
    timeToInteractive: 2.4, // seconds
    memoryUsage: 58, // MB
    apiResponseTime: 380, // ms
    renderTime: 120, // ms
  };
  // Security metrics
  var securityMetrics = {
    vulnerabilities: 2,
    securityScore: 86,
    daysToLastAudit: 31,
    totalIssues: 5,
    criticalIssues: 0,
  };
  // API metrics
  var apiMetrics = {
    endpoints: 28,
    averageResponseTime: 210, // ms
    successRate: 99.2, // percentage
    totalRequests: 12450,
    webhookIntegrations: 4,
  };
  // Sentiment analysis data
  var sentimentData = {
    positivePercentage: 72,
    negativePercentage: 18,
    neutralPercentage: 10,
    averageSentiment: 7.8,
    totalAnalyzed: 1238,
  };
  var handleOptimizeNow = function () {
    setLoadingOptimization(true);
    setCurrentProgress(0);
    // Log this action
    loggingService_1.logger.info("Performance optimization started", {
      component: "TechnicalImprovements",
    });
    // Simulate progress with a timer
    var interval = setInterval(function () {
      setCurrentProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingOptimization(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  var runSecurityScan = function () {
    setSecurityScanRunning(true);
    setCurrentProgress(0);
    loggingService_1.logger.info("Security scan initiated", {
      component: "TechnicalImprovements",
    });
    var interval = setInterval(function () {
      setCurrentProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(interval);
          setSecurityScanRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  var testApiEndpoints = function () {
    setApiTestRunning(true);
    setCurrentProgress(0);
    loggingService_1.logger.info("API endpoint testing started", {
      component: "TechnicalImprovements",
    });
    var interval = setInterval(function () {
      setCurrentProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(interval);
          setApiTestRunning(false);
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };
  var analyzeSentiment = function () {
    setAnalyzingData(true);
    setCurrentProgress(0);
    loggingService_1.logger.info("Sentiment analysis started", {
      component: "TechnicalImprovements",
    });
    var interval = setInterval(function () {
      setCurrentProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzingData(false);
          return 100;
        }
        return prev + 4;
      });
    }, 250);
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto p-4 pt-20",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col space-y-4",
      children: [
        (0, jsx_runtime_1.jsx)("h1", {
          className: "text-3xl font-bold",
          children: "Performance and Technical Improvements",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children:
            "Tools and features to optimize your application performance, security, and integrations.",
        }),
        (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "performance",
          value: activeTab,
          onValueChange: setActiveTab,
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "grid grid-cols-5 w-full",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "performance",
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "hidden sm:inline",
                      children: "Performance",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "security",
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "hidden sm:inline",
                      children: "Security",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "api",
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "hidden sm:inline",
                      children: "API",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "sentiment",
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "hidden sm:inline",
                      children: "Sentiment",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "knowledge",
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "hidden sm:inline",
                      children: "Knowledge",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "performance",
              className: "space-y-4 mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Gauge, {
                                  className: "h-5 w-5 mr-2 text-blue-500",
                                }),
                                "Page Load Speed",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Current average load time",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-blue-600",
                              children: [performanceMetrics.pageLoad, "s"],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: < 1.5s",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: Math.min(
                                100,
                                (1.5 / performanceMetrics.pageLoad) * 100,
                              ),
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Activity,
                                  { className: "h-5 w-5 mr-2 text-green-500" },
                                ),
                                "Time to Interactive",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "User interaction readiness",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-green-600",
                              children: [
                                performanceMetrics.timeToInteractive,
                                "s",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: < 2.0s",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: Math.min(
                                100,
                                (2.0 / performanceMetrics.timeToInteractive) *
                                  100,
                              ),
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                                  className: "h-5 w-5 mr-2 text-amber-500",
                                }),
                                "API Response Time",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Average server response",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-amber-600",
                              children: [
                                performanceMetrics.apiResponseTime,
                                "ms",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: < 300ms",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: Math.min(
                                100,
                                (300 / performanceMetrics.apiResponseTime) *
                                  100,
                              ),
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Performance Optimization",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Run automatic optimizations to improve application performance",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "JavaScript Bundle Size",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "font-medium",
                                  children: "1.2MB",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: 65,
                              className: "h-2",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Image Optimization",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "font-medium",
                                  children: "42 images",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: 78,
                              className: "h-2",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Database Query Performance",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "font-medium",
                                  children: "24 queries",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: 92,
                              className: "h-2",
                            }),
                          ],
                        }),
                        loadingOptimization
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Optimization in progress...",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "font-medium",
                                      children: [currentProgress, "%"],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                  value: currentProgress,
                                  className: "h-2",
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: handleOptimizeNow,
                              className: "w-full",
                              children: "Optimize Now",
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "security",
              className: "space-y-4 mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                                  className: "h-5 w-5 mr-2 text-red-500",
                                }),
                                "Security Score",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Overall security rating",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-red-600",
                              children: [securityMetrics.securityScore, "/100"],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: > 90",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: securityMetrics.securityScore,
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                                  className: "h-5 w-5 mr-2 text-orange-500",
                                }),
                                "Vulnerabilities",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Detected issues",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-3xl font-bold text-orange-600",
                              children: securityMetrics.vulnerabilities,
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: 0",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: Math.max(
                                0,
                                100 - securityMetrics.vulnerabilities * 25,
                              ),
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                                  className: "h-5 w-5 mr-2 text-blue-500",
                                }),
                                "Last Security Audit",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Days since last audit",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-blue-600",
                              children: [
                                securityMetrics.daysToLastAudit,
                                " days",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: < 30 days",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: Math.max(
                                0,
                                100 - securityMetrics.daysToLastAudit * 3,
                              ),
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Enhanced Security Features",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Configure additional security measures for your application",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children:
                                        "Two-Factor Authentication (2FA)",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Enable 2FA",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Single Sign-On (SSO)",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Configure SSO",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "API Key Security",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Manage API Keys",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Security Policy",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Update Policy",
                                    },
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        securityScanRunning
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Security scan in progress...",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "font-medium",
                                      children: [currentProgress, "%"],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                  value: currentProgress,
                                  className: "h-2",
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: runSecurityScan,
                              className: "w-full",
                              children: "Run Security Scan",
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "api",
              className: "space-y-4 mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                                  className: "h-5 w-5 mr-2 text-purple-500",
                                }),
                                "Total Endpoints",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Available API resources",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-3xl font-bold text-purple-600",
                              children: apiMetrics.endpoints,
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children:
                                apiMetrics.endpoints > 20
                                  ? "Extensive API coverage"
                                  : "Basic API coverage",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                                  className: "h-5 w-5 mr-2 text-indigo-500",
                                }),
                                "Success Rate",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "API call success percentage",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-indigo-600",
                              children: [apiMetrics.successRate, "%"],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: > 99.5%",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: apiMetrics.successRate,
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                                  className: "h-5 w-5 mr-2 text-cyan-500",
                                }),
                                "Webhook Integrations",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Connected external services",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-3xl font-bold text-cyan-600",
                              children: apiMetrics.webhookIntegrations,
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children:
                                apiMetrics.webhookIntegrations > 0
                                  ? "Active integrations"
                                  : "No integrations",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "API Expansion",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Extend your API capabilities for third-party integrations",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "API Documentation",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "View Docs",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "New Endpoint",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Create Endpoint",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Webhooks",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Manage Webhooks",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Usage Metrics",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "View Metrics",
                                    },
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        apiTestRunning
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "API testing in progress...",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "font-medium",
                                      children: [currentProgress, "%"],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                  value: currentProgress,
                                  className: "h-2",
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: testApiEndpoints,
                              className: "w-full",
                              children: "Test API Endpoints",
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "sentiment",
              className: "space-y-4 mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.BarChart3,
                                  { className: "h-5 w-5 mr-2 text-green-500" },
                                ),
                                "Positive Sentiment",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Customer positive feedback",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-green-600",
                              children: [sentimentData.positivePercentage, "%"],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: > 75%",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: sentimentData.positivePercentage,
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.BarChart3,
                                  { className: "h-5 w-5 mr-2 text-red-500" },
                                ),
                                "Negative Sentiment",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Customer negative feedback",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-3xl font-bold text-red-600",
                              children: [sentimentData.negativePercentage, "%"],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: < 15%",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value: 100 - sentimentData.negativePercentage,
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          className: "pb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "text-lg flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.BarChart3,
                                  { className: "h-5 w-5 mr-2 text-blue-500" },
                                ),
                                "Average Sentiment",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Overall satisfaction score (0-10)",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-3xl font-bold text-blue-600",
                              children: sentimentData.averageSentiment,
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: "Target: > 8.0",
                            }),
                            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                              value:
                                (sentimentData.averageSentiment / 10) * 100,
                              className: "h-2 mt-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Sentiment Analysis",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Analyze customer feedback and communication sentiment",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Communication Analysis",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Analyze Communications",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Feedback Analysis",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Analyze Feedback",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Sentiment Reports",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "View Reports",
                                    },
                                  ),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.Card, {
                              children: [
                                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                  className: "pb-2",
                                  children: (0, jsx_runtime_1.jsx)(
                                    card_1.CardTitle,
                                    {
                                      className: "text-sm",
                                      children: "Topic Detection",
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: "w-full",
                                      children: "Detect Topics",
                                    },
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        analyzingData
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children:
                                        "Sentiment analysis in progress...",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "font-medium",
                                      children: [currentProgress, "%"],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                  value: currentProgress,
                                  className: "h-2",
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: analyzeSentiment,
                              className: "w-full",
                              children: "Run Sentiment Analysis",
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "knowledge",
              className: "space-y-4 mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Technology",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for technology companies",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "87%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 87,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Healthcare",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for healthcare organizations",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "92%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 92,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Finance",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for financial services",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "94%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 94,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Retail",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for retail businesses",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "82%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 82,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Manufacturing",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for manufacturing industries",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "78%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 78,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Education",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Specialized knowledge for educational institutions",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Knowledge Base Completion",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "81%",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: 81,
                                className: "h-2",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                className: "w-full mt-4",
                                children: "Access Knowledge Base",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Knowledge Base Development",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Request specialized knowledge development for your industry",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                        className: "w-full",
                        children: "Request Industry Knowledge Base",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
