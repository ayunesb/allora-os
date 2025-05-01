
import React from 'react';
import { cn } from "@/lib/utils";
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Users, 
  Settings, 
  FileText, 
  Zap, 
  MessageSquare, 
  Calendar,
  PanelRight,
  Rocket
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: 'AI Executives', 
      path: '/dashboard/ai-executives', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Strategy', 
      path: '/dashboard/strategy', 
      icon: <Zap className="h-5 w-5" /> 
    },
    { 
      name: 'Marketing', 
      path: '/dashboard/marketing', 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      name: 'Communication', 
      path: '/dashboard/communication', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      name: 'Calendar', 
      path: '/dashboard/calendar', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: 'Documentation', 
      path: '/dashboard/docs', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Launch', 
      path: '/dashboard/launch', 
      icon: <Rocket className="h-5 w-5" /> 
    },
  ];
  
  const adminItems = [
    { 
      name: 'Admin Panel', 
      path: '/admin', 
      icon: <PanelRight className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/dashboard/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className={cn("flex flex-col h-screen bg-background", className)}>
      <div className="px-4 py-6">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Allora AI</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-6 border-t pt-4">
          <div className="px-2 mb-2 text-xs uppercase text-muted-foreground">
            Administration
          </div>
          <nav className="px-2 space-y-1">
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="px-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Account</p>
            <p className="text-xs text-muted-foreground truncate">Manage settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
