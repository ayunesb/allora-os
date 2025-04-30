
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { LayoutDashboard, HelpCircle } from 'lucide-react';
import { HelpButton } from '@/components/ui/help-button';

interface BreadcrumbRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
  helpId?: string;
}

interface DashboardBreadcrumbProps {
  rootPath?: string;
  rootLabel?: string;
  rootIcon?: React.ReactNode;
  omitRoot?: boolean;
  showHelp?: boolean;
}

export function DashboardBreadcrumb({
  rootPath = '/dashboard',
  rootLabel = 'Dashboard',
  rootIcon = <LayoutDashboard className="h-3.5 w-3.5" />,
  omitRoot = false,
  showHelp = true
}: DashboardBreadcrumbProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Skip the first part (e.g., "dashboard") and use the rest as paths
  const basePath = pathnames[0];
  const paths = pathnames.slice(1);
  
  const routes: Record<string, BreadcrumbRoute> = {
    // Dashboard routes
    'dashboard': { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-3.5 w-3.5" />, helpId: 'dashboard.overview' },
    'leads': { path: '/dashboard/leads', label: 'Leads', helpId: 'admin.leads' },
    'campaigns': { path: '/dashboard/campaigns', label: 'Campaigns', helpId: 'admin.campaigns' },
    'strategies': { path: '/dashboard/strategies', label: 'Strategies', helpId: 'strategy.board' },
    'calls': { path: '/dashboard/calls', label: 'Calls', helpId: 'admin.calls' },
    'ai-bots': { path: '/dashboard/ai-bots', label: 'AI Bots' },
    'debate': { path: '/dashboard/debate', label: 'Debate', helpId: 'ai.debate' },
    'profile': { path: '/dashboard/profile', label: 'Profile' },
    'settings': { path: '/dashboard/settings', label: 'Settings' },
    'executive-agents': { path: '/dashboard/executive-agents', label: 'Executive Agents' },
    'decisions': { path: '/dashboard/decisions', label: 'Decisions' },
    'risk-heatmap': { path: '/dashboard/risk-heatmap', label: 'Risk Heatmap' },
    'leaderboard': { path: '/dashboard/leaderboard', label: 'Leaderboard' },
    'forecast': { path: '/dashboard/forecast', label: 'Forecast' },
    'digital-twin': { path: '/dashboard/digital-twin', label: 'Digital Twin' },
    'insights': { path: '/dashboard/insights', label: 'Insights', helpId: 'dashboard.insights' },
    
    // Admin routes (reused in AdminBreadcrumb but good to have here for consistency)
    'admin': { path: '/admin', label: 'Admin', icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
    'entities': { path: '/admin/entities', label: 'Entities' },
    'webhooks': { path: '/admin/webhooks', label: 'Webhooks', helpId: 'admin.webhooks' },
    'system-health': { path: '/admin/system-health', label: 'System Health' },
    'launch-prep': { path: '/admin/launch-prep', label: 'Launch Prep' },
    'analytics': { path: '/admin/analytics', label: 'Analytics' },
    'audit': { path: '/admin/audit', label: 'Audit' },
    'run-audit': { path: '/admin/run-audit', label: 'Run Audit' },
    
    // Onboarding
    'onboarding': { path: '/onboarding', label: 'Onboarding' },
    
    // Compliance
    'compliance': { path: '/compliance', label: 'Compliance' },
  };
  
  if (pathnames.length === 0) {
    return null;
  }
  
  // For items not in the routes map, create a default
  const getDefaultRoute = (path: string): BreadcrumbRoute => {
    return {
      path: `/${pathnames.slice(0, pathnames.indexOf(path) + 1).join('/')}`,
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    };
  };
  
  // Get appropriate root path and label based on section
  const getRoot = () => {
    if (basePath === 'admin') {
      return { path: '/admin', label: 'Admin', icon: <LayoutDashboard className="h-3.5 w-3.5" /> };
    }
    if (basePath === 'onboarding') {
      return { path: '/onboarding', label: 'Onboarding', icon: <LayoutDashboard className="h-3.5 w-3.5" /> };
    }
    if (basePath === 'compliance') {
      return { path: '/compliance', label: 'Compliance', icon: <LayoutDashboard className="h-3.5 w-3.5" /> };
    }
    return { path: rootPath, label: rootLabel, icon: rootIcon };
  };
  
  const root = getRoot();
  
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {!omitRoot && (
          <BreadcrumbItem>
            <BreadcrumbLink href={root.path} className="flex items-center gap-1">
              {root.icon}
              <span>{root.label}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const route = routes[path] || getDefaultRoute(path);
          const showHelpButton = showHelp && isLast && route.helpId;
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <div className="flex items-center gap-2">
                    <BreadcrumbPage className="flex items-center gap-1">
                      {route.icon}
                      <span>{route.label}</span>
                    </BreadcrumbPage>
                    {showHelpButton && route.helpId && (
                      <HelpButton
                        helpContent={{
                          id: route.helpId,
                          title: route.label,
                          description: `Help for ${route.label}`
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                      </HelpButton>
                    )}
                  </div>
                ) : (
                  <BreadcrumbLink href={route.path} className="flex items-center gap-1">
                    {route.icon}
                    <span>{route.label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
