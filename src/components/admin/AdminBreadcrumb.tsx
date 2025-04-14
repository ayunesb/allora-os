
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
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings, 
  Activity, 
  Rocket, 
  ClipboardCheck, 
  Play 
} from 'lucide-react';

interface BreadcrumbRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

export function AdminBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Skip the "admin" part as it's always the first part
  const paths = pathnames.slice(1);
  
  const routes: Record<string, BreadcrumbRoute> = {
    '': { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
    'dashboard': { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
    'entities': { path: '/admin/entities', label: 'Entities', icon: <Users className="h-3.5 w-3.5" /> },
    'users': { path: '/admin/users', label: 'Users', icon: <Users className="h-3.5 w-3.5" /> },
    'companies': { path: '/admin/companies', label: 'Companies', icon: <Building2 className="h-3.5 w-3.5" /> },
    'audit': { path: '/admin/audit', label: 'Audit', icon: <ClipboardCheck className="h-3.5 w-3.5" /> },
    'run-audit': { path: '/admin/run-audit', label: 'Run Audit', icon: <Play className="h-3.5 w-3.5" /> },
    'settings': { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-3.5 w-3.5" /> },
    'system-health': { path: '/admin/system-health', label: 'System Health', icon: <Activity className="h-3.5 w-3.5" /> },
    'launch-prep': { path: '/admin/launch-prep', label: 'Launch Prep', icon: <Rocket className="h-3.5 w-3.5" /> },
  };
  
  // If we're at the admin root, don't show breadcrumbs
  if (paths.length === 0) {
    return null;
  }
  
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin" className="flex items-center gap-1">
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Admin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const route = routes[path] || { path: `/admin/${path}`, label: path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ') };
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {route.icon}
                    <span>{route.label}</span>
                  </BreadcrumbPage>
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
