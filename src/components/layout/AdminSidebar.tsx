
import React from 'react';
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronDown, 
  AlertCircle, 
  Layers, 
  ShieldCheck,
  Database,
  Rocket
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function AdminSidebar() {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    users: false,
    settings: false,
    audit: true
  });
  
  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };
  
  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Admin Portal</h2>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          
          <Collapsible
            open={openSections.users}
            onOpenChange={() => toggleSection('users')}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.users && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 pt-1">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>All Users</span>
              </NavLink>
              <NavLink
                to="/admin/roles"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>Roles & Permissions</span>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible
            open={openSections.audit}
            onOpenChange={() => toggleSection('audit')}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4" />
                <span>Audit & Compliance</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.audit && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 pt-1">
              <NavLink
                to="/admin/audit"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>Audit Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin/launch-prep"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <Rocket className="h-4 w-4" />
                <span>Launch Plan</span>
              </NavLink>
              <NavLink
                to="/admin/launch-verification"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <AlertCircle className="h-4 w-4" />
                <span>Launch Verification</span>
              </NavLink>
              <NavLink
                to="/admin/database-verification"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <Database className="h-4 w-4" />
                <span>Database Security</span>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible
            open={openSections.settings}
            onOpenChange={() => toggleSection('settings')}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.settings && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 pt-1">
              <NavLink
                to="/admin/settings/general"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>General</span>
              </NavLink>
              <NavLink
                to="/admin/settings/api"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>API Configuration</span>
              </NavLink>
              <NavLink
                to="/admin/settings/integrations"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-all",
                    isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50"
                  )
                }
              >
                <span>Integrations</span>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>
    </div>
  );
}
