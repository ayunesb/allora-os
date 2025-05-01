
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, X, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuditItem {
  name: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  description: string;
  recommendation?: string;
}

interface AuditCategory {
  name: string;
  items: AuditItem[];
}

export function AuditSummary() {
  const auditData: AuditCategory[] = [
    {
      name: "Core Features",
      items: [
        {
          name: "Dashboard",
          status: "PASS",
          description: "Dashboard page loads and displays correctly"
        },
        {
          name: "Onboarding",
          status: "PASS",
          description: "Onboarding flow works correctly"
        },
        {
          name: "Strategy Board",
          status: "WARN",
          description: "Strategy board loads but has performance issues with large datasets",
          recommendation: "Implement virtualized lists for large strategy collections"
        },
        {
          name: "AI Agents",
          status: "WARN",
          description: "AI agent components have type inconsistencies",
          recommendation: "Update component props to use UnifiedBot type consistently"
        }
      ]
    },
    {
      name: "Responsiveness",
      items: [
        {
          name: "Mobile Layout",
          status: "WARN",
          description: "Some components overflow on small screens",
          recommendation: "Add responsive classes to container elements"
        },
        {
          name: "Tablet Layout",
          status: "PASS",
          description: "UI works correctly on tablet devices"
        },
        {
          name: "Grid System",
          status: "WARN",
          description: "Inconsistent grid layouts across sections",
          recommendation: "Standardize on consistent grid patterns using Tailwind's grid classes"
        }
      ]
    },
    {
      name: "Design Consistency",
      items: [
        {
          name: "Component Usage",
          status: "WARN",
          description: "Some components use custom styles instead of ShadCN patterns",
          recommendation: "Refactor custom styled components to use ShadCN UI primitives"
        },
        {
          name: "Spacing",
          status: "PASS",
          description: "Spacing is consistent across most components"
        }
      ]
    },
    {
      name: "Context Safety",
      items: [
        {
          name: "User Context",
          status: "FAIL",
          description: "User context not consistently guarded for null values",
          recommendation: "Add null checks to all user context references"
        },
        {
          name: "Auth Provider",
          status: "PASS",
          description: "Auth provider is properly configured at the root"
        },
        {
          name: "Role Checking",
          status: "WARN",
          description: "Inconsistent role checking patterns",
          recommendation: "Use createAuthCompatibilityLayer consistently across components"
        }
      ]
    },
    {
      name: "Component UX",
      items: [
        {
          name: "Loading States",
          status: "WARN",
          description: "Some components missing loading states",
          recommendation: "Add Skeleton components to all async data fetching components"
        },
        {
          name: "Error Handling",
          status: "WARN",
          description: "Error messages inconsistently displayed",
          recommendation: "Implement unified error alert system"
        },
        {
          name: "Accessibility",
          status: "PASS",
          description: "Components include necessary ARIA attributes"
        }
      ]
    },
    {
      name: "Security",
      items: [
        {
          name: "Route Protection",
          status: "PASS", 
          description: "Routes properly protected with role-based checks"
        },
        {
          name: "API Calls",
          status: "WARN",
          description: "Some Supabase calls missing error handling",
          recommendation: "Wrap all Supabase calls in try/catch blocks"
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return <Check className="h-4 w-4 text-green-500" />;
      case "WARN":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "FAIL":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PASS":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "WARN":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "FAIL":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  // Calculate overall statistics
  const stats = auditData.reduce((acc, category) => {
    category.items.forEach(item => {
      acc[item.status] = (acc[item.status] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const totalItems = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const passPercentage = Math.round((stats.PASS || 0) / totalItems * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Production Readiness Audit</span>
          <Badge className={`text-sm ${passPercentage >= 80 ? 'bg-green-500/10 text-green-500' : passPercentage >= 60 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
            {passPercentage}% Ready
          </Badge>
        </CardTitle>
        <CardDescription>
          Assessment of application readiness for production deployment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              {stats.PASS || 0} Passed
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              {stats.WARN || 0} Warnings
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
              {stats.FAIL || 0} Failures
            </Badge>
          </div>
        </div>
        
        <div className="space-y-6">
          {auditData.map((category, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-lg font-medium">{category.name}</h3>
              <div className="rounded-md border bg-card">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className={`flex justify-between p-3 ${
                      itemIdx !== category.items.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.recommendation && (
                        <p className="text-xs text-primary">
                          Recommendation: {item.recommendation}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className={getStatusClass(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Export Report</Button>
        <Button>Run New Audit</Button>
      </CardFooter>
    </Card>
  );
}

export default AuditSummary;
