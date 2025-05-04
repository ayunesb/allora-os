import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CircleDashed, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
const ReadinessChecklist = () => {
    // This data would typically come from your backend
    const phases = [
        {
            id: "phase-foundation",
            name: "Foundation",
            description: "Technical infrastructure and security enhancements",
            completedCount: 2,
            items: [
                {
                    id: "item-001",
                    title: "API Secrets Security",
                    description: "Implement secure storage and access for all API keys",
                    priority: 'critical',
                    status: 'completed',
                    area: 'infrastructure',
                    tags: ['security', 'api'],
                    completionCriteria: [
                        "All API keys stored in secure environment variables",
                        "Secret rotation mechanism implemented",
                        "Access logging for all API usage"
                    ]
                },
                {
                    id: "item-002",
                    title: "Database Configuration & RLS",
                    description: "Finalize database schema and row-level security policies",
                    priority: 'critical',
                    status: 'completed',
                    area: 'infrastructure',
                    tags: ['database', 'security'],
                    completionCriteria: [
                        "All tables properly configured with migrations",
                        "RLS policies implemented for all tables",
                        "Foreign key relationships properly established",
                        "Indices created for frequently queried columns"
                    ]
                },
                {
                    id: "item-003",
                    title: "User Authentication Flow",
                    description: "Complete user authentication with proper error handling",
                    priority: 'critical',
                    status: 'in_progress',
                    area: 'infrastructure',
                    tags: ['auth', 'security'],
                    completionCriteria: [
                        "Login functionality working with email/password",
                        "Social login options implemented",
                        "Password reset flow functional",
                        "Error states properly handled with clear messages"
                    ]
                }
            ]
        },
        {
            id: "phase-website",
            name: "Website Enhancement",
            description: "Implement trust indicators and interactive demonstrations",
            completedCount: 0,
            items: [
                {
                    id: "item-101",
                    title: "Trust Badges Implementation",
                    description: "Add GDPR, SOC 2, and security trust indicators",
                    priority: 'high',
                    status: 'pending',
                    area: 'website',
                    tags: ['trust', 'marketing'],
                    completionCriteria: [
                        "GDPR compliance badge added to footer",
                        "SOC 2 compliance indicator added",
                        "Data security commitment section created",
                        "Privacy policy links prominently displayed"
                    ]
                },
                {
                    id: "item-102",
                    title: "Interactive Demo Creation",
                    description: "Develop an interactive product demo on the homepage",
                    priority: 'high',
                    status: 'pending',
                    area: 'website',
                    tags: ['marketing', 'engagement'],
                    completionCriteria: [
                        "Interactive product demo embedded on homepage",
                        "Sample company data for demo created",
                        "Live AI strategy demonstration functional",
                        "Sample executive debate viewable without signup"
                    ]
                },
                {
                    id: "item-103",
                    title: "Outcome Showcases",
                    description: "Add concrete examples of business outcomes and KPIs",
                    priority: 'medium',
                    status: 'pending',
                    area: 'website',
                    tags: ['marketing', 'case-studies'],
                    completionCriteria: [
                        "Case study section with real metrics",
                        "Before/after KPI visualizations",
                        "Industry-specific outcome examples",
                        "Testimonial carousel from clients"
                    ]
                }
            ]
        },
        {
            id: "phase-onboarding",
            name: "Onboarding Experience",
            description: "Create a seamless, personalized onboarding journey",
            completedCount: 0,
            items: [
                {
                    id: "item-201",
                    title: "AI CEO Welcome Video",
                    description: "Implement personalized Heygen AI welcome video",
                    priority: 'high',
                    status: 'pending',
                    area: 'onboarding',
                    tags: ['personalization', 'engagement'],
                    completionCriteria: [
                        "Heygen API integration complete",
                        "Dynamic video generation with personalized greeting",
                        "Fallback mechanism for API failures",
                        "Video analytics tracking implemented"
                    ]
                },
                {
                    id: "item-202",
                    title: "Instant Strategy Generation",
                    description: "Develop automatic strategy generation upon onboarding completion",
                    priority: 'critical',
                    status: 'pending',
                    area: 'onboarding',
                    tags: ['ai', 'strategy'],
                    completionCriteria: [
                        "Initial strategy generation triggered after onboarding",
                        "Industry-specific strategy templates created",
                        "Risk profile factored into strategy recommendations",
                        "Strategy visualization in dashboard immediately available"
                    ]
                },
                {
                    id: "item-203",
                    title: "Branded Dashboard Creation",
                    description: "Implement company branding in dashboard upon onboarding",
                    priority: 'medium',
                    status: 'pending',
                    area: 'onboarding',
                    tags: ['personalization', 'ui'],
                    completionCriteria: [
                        "Company logo integration in dashboard",
                        "Color scheme customization based on industry",
                        "Personalized dashboard sections based on goals",
                        "Custom KPI visualization based on priorities"
                    ]
                }
            ]
        },
        {
            id: "phase-executive-collective",
            name: "Executive Collective",
            description: "Implement the 100 virtual executives collective",
            completedCount: 0,
            items: [
                {
                    id: "item-301",
                    title: "Executive Personas Database",
                    description: "Create comprehensive database of executive personas",
                    priority: 'high',
                    status: 'pending',
                    area: 'strategies',
                    tags: ['ai', 'executive-team'],
                    completionCriteria: [
                        "Database of 100 executive personas created",
                        "Executive specialties mapped to industries",
                        "Executive selection logic implemented",
                        "Executive debate style preferences defined"
                    ]
                },
                {
                    id: "item-302",
                    title: "Boardroom Simulation Engine",
                    description: "Implement dynamic boardroom simulation with executive debate",
                    priority: 'critical',
                    status: 'pending',
                    area: 'strategies',
                    tags: ['ai', 'debate'],
                    completionCriteria: [
                        "Real-time debate simulation working",
                        "Different viewpoints based on executive personas",
                        "Data-backed arguments in debates",
                        "Final recommendations with dissenting opinions"
                    ]
                },
                {
                    id: "item-303",
                    title: "Executive Communication Templates",
                    description: "Create WhatsApp, email, and call script templates from executives",
                    priority: 'high',
                    status: 'pending',
                    area: 'communication',
                    tags: ['scripts', 'templates'],
                    completionCriteria: [
                        "WhatsApp templates from industry experts",
                        "Cold call scripts from sales specialists",
                        "Email templates from marketing experts",
                        "Attribution to specific executives with reasoning"
                    ]
                },
                {
                    id: "item-304",
                    title: "Executive Strategy Reports",
                    description: "Generate investor-grade reports from executive collective",
                    priority: 'medium',
                    status: 'pending',
                    area: 'strategies',
                    tags: ['reporting', 'pdf'],
                    completionCriteria: [
                        "PDF report generation functionality",
                        "McKinsey-style report formatting",
                        "Financial projections included",
                        "Executive summaries and detailed strategy sections"
                    ]
                }
            ]
        },
        {
            id: "phase-advanced-features",
            name: "Advanced Features",
            description: "Implement high-value advanced features",
            completedCount: 0,
            items: [
                {
                    id: "item-401",
                    title: "AI Lead Scoring",
                    description: "Implement AI-powered lead scoring system",
                    priority: 'high',
                    status: 'pending',
                    area: 'campaigns',
                    tags: ['ai', 'leads'],
                    completionCriteria: [
                        "Lead scoring algorithm implemented",
                        "Integration with CRM systems",
                        "Automated lead qualification",
                        "Lead prioritization based on closing potential"
                    ]
                },
                {
                    id: "item-402",
                    title: "Ready-to-Launch Campaigns",
                    description: "Create platform for auto-generating ad campaigns",
                    priority: 'high',
                    status: 'pending',
                    area: 'campaigns',
                    tags: ['ads', 'marketing'],
                    completionCriteria: [
                        "Google Ads campaign generator",
                        "LinkedIn campaign generator",
                        "Facebook/Instagram campaign generator",
                        "Budget recommendations and ROI projections"
                    ]
                },
                {
                    id: "item-403",
                    title: "Zapier Automation Flows",
                    description: "Implement automated Zapier workflows",
                    priority: 'medium',
                    status: 'pending',
                    area: 'infrastructure',
                    tags: ['automation', 'integration'],
                    completionCriteria: [
                        "CRM integration workflows",
                        "Campaign launch automations",
                        "Finance alert automations",
                        "Document generation workflows"
                    ]
                },
                {
                    id: "item-404",
                    title: "Adaptive AI Learning",
                    description: "Implement self-learning AI system",
                    priority: 'medium',
                    status: 'pending',
                    area: 'infrastructure',
                    tags: ['ai', 'machine-learning'],
                    completionCriteria: [
                        "Feedback loop for AI recommendations",
                        "Performance tracking of AI suggestions",
                        "Model adaptation based on outcomes",
                        "Continuous improvement system"
                    ]
                }
            ]
        },
        {
            id: "phase-launch-readiness",
            name: "Launch Readiness",
            description: "Final validation and performance optimization",
            completedCount: 0,
            items: [
                {
                    id: "item-501",
                    title: "Performance Optimization",
                    description: "Optimize application performance and responsiveness",
                    priority: 'high',
                    status: 'pending',
                    area: 'infrastructure',
                    tags: ['performance', 'optimization'],
                    completionCriteria: [
                        "Page load times under 2 seconds",
                        "API response times optimized",
                        "Database query performance optimized",
                        "Asset loading optimized"
                    ]
                },
                {
                    id: "item-502",
                    title: "Security Audit",
                    description: "Comprehensive security audit and penetration testing",
                    priority: 'critical',
                    status: 'pending',
                    area: 'infrastructure',
                    tags: ['security', 'audit'],
                    completionCriteria: [
                        "Security vulnerabilities addressed",
                        "Authentication flows validated",
                        "Data encryption verified",
                        "API security confirmed"
                    ]
                },
                {
                    id: "item-503",
                    title: "Final Launch Validation",
                    description: "Run comprehensive launch validation checks",
                    priority: 'critical',
                    status: 'pending',
                    area: 'infrastructure',
                    tags: ['validation', 'launch'],
                    completionCriteria: [
                        "All critical features validated",
                        "End-to-end user flows tested",
                        "Error handling confirmed",
                        "Integration points verified"
                    ]
                }
            ]
        }
    ];
    // Calculate progress percentages
    const calculateProgress = (phase) => {
        if (phase.items.length === 0)
            return 0;
        return (phase.completedCount / phase.items.length) * 100;
    };
    // Status icon based on item status
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-500"/>;
            case 'in_progress':
                return <Clock className="h-5 w-5 text-amber-500 animate-pulse"/>;
            default:
                return <CircleDashed className="h-5 w-5 text-muted-foreground"/>;
        }
    };
    // Priority badge color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'high':
                return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
            case 'medium':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            default:
                return 'bg-green-100 text-green-800 hover:bg-green-200';
        }
    };
    return (<div className="space-y-8">
      {phases.map((phase) => (<Card key={phase.id} className="bg-card">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold">{phase.name}</CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">{phase.description}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  {Math.round(calculateProgress(phase))}% Complete
                </span>
                <p className="text-xs text-muted-foreground">
                  {phase.completedCount}/{phase.items.length} Tasks
                </p>
              </div>
            </div>
            <Progress value={calculateProgress(phase)} className="h-2 mt-2"/>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {phase.items.map((item) => (<div key={item.id} className="border-b border-border/40 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <Badge variant="secondary" className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag) => (<span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                            {tag}
                          </span>))}
                      </div>
                      
                      {/* Completion Criteria */}
                      <div className="mt-3">
                        <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">
                          Completion Criteria
                        </h4>
                        <ul className="text-xs space-y-1">
                          {item.completionCriteria.map((criteria, index) => (<li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{criteria}</span>
                            </li>))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>))}
    </div>);
};
export default ReadinessChecklist;
