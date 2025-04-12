
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Info, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { HelpButton } from "@/components/help/HelpButton";

export function DashboardHeader({ pendingApprovals }: { pendingApprovals?: number }) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center py-6">
      <div className="animate-fadeIn flex items-center">
        <Home className="h-8 w-8 text-primary mr-3 hidden md:block" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Get a snapshot of your business performance and AI recommendations
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 animate-slideIn" style={{animationDelay: '0.2s'}}>
        <HelpButton contextId="dashboard" variant="text" />
        
        {pendingApprovals && pendingApprovals > 0 ? (
          <Button asChild variant="outline" className="gap-2 hover-glow">
            <Link to="/dashboard/approvals">
              <Bell className="h-4 w-4 text-primary" />
              Approvals
              <Badge variant="destructive" className="ml-1 animate-pulse-slow">
                {pendingApprovals}
              </Badge>
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
