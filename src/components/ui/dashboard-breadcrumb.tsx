
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Home,
  Building2,
  Users,
  Megaphone,
  FileText,
  Phone,
  Bot,
  Settings,
  UserCircle,
  BarChartHorizontal,
  Lightbulb,
  Sparkles,
  Trophy,
  File
} from 'lucide-react';

export function DashboardBreadcrumb() {
  const location = useLocation();
  const path = location.pathname;
  
  // Extract the breadcrumb segments from the path
  const segments = path.split('/').filter(Boolean);

  // Mapping of routes to their display names and icons
  const routeMap: Record<string, { path: string; label: string; icon?: React.ReactNode }> = {
    // Dashboard routes
    'dashboard': { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-3.5 w-3.5" /> },
    'leads': { path: '/dashboard/leads', label: 'Leads', icon: <Users className="h-3.5 w-3.5" /> },
    'campaigns': { path: '/dashboard/campaigns', label: 'Campaigns', icon: <Megaphone className="h-3.5 w-3.5" /> },
    'strategies': { path: '/dashboard/strategies', label: 'Strategies', icon: <FileText className="h-3.5 w-3.5" /> },
    'calls': { path: '/dashboard/calls', label: 'Calls', icon: <Phone className="h-3.5 w-3.5" /> },
    'ai-bots': { path: '/dashboard/ai-bots', label: 'AI Bots', icon: <Bot className="h-3.5 w-3.5" /> },
    'insights': { path: '/dashboard/insights', label: 'Insights', icon: <Lightbulb className="h-3.5 w-3.5" /> },
    'analytics': { path: '/dashboard/analytics', label: 'Analytics', icon: <BarChartHorizontal className="h-3.5 w-3.5" /> },
    'settings': { path: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-3.5 w-3.5" /> },
    'profile': { path: '/dashboard/profile', label: 'Profile', icon: <UserCircle className="h-3.5 w-3.5" /> },
    
    // Admin routes
    'admin': { path: '/admin', label: 'Admin', icon: <Building2 className="h-3.5 w-3.5" /> },
    
    // Galaxy routes
    'galaxy': { path: '/galaxy', label: 'Galaxy', icon: <Sparkles className="h-3.5 w-3.5" /> },
    'plugins': { path: '/galaxy/plugins', label: 'Plugins' },
    'plugin-leaderboard': { path: '/galaxy/plugins/leaderboard', label: 'Leaderboard' },
    
    // Academy routes
    'academy': { path: '/academy', label: 'Academy', icon: <Trophy className="h-3.5 w-3.5" /> },
    
    // Vault routes
    'vault': { path: '/vault', label: 'Vault', icon: <File className="h-3.5 w-3.5" /> },
    'templates': { path: '/vault/templates', label: 'Templates' },
  };

  // Build the breadcrumb items from the segments
  let currentPath = '';
  const breadcrumbItems = segments.map((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Handle special cases for nested routes
    let itemKey = segment;
    if (segment === 'leaderboard' && segments[index-1] === 'plugins') {
      itemKey = 'plugin-leaderboard';
    }

    const route = routeMap[itemKey] || { path: currentPath, label: segment.charAt(0).toUpperCase() + segment.slice(1) };
    
    if (isLast) {
      return (
        <BreadcrumbItem key={itemKey}>
          <BreadcrumbPage className="flex items-center gap-1">
            {route.icon}
            {route.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return (
      <BreadcrumbItem key={itemKey}>
        <BreadcrumbLink href={route.path} className="flex items-center gap-1">
          {route.icon}
          {route.label}
        </BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
