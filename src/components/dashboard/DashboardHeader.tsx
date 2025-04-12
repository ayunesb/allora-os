import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { HelpButton } from "@/components/help/HelpButton";

export function DashboardHeader({ pendingApprovals }: { pendingApprovals?: number }) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Get a snapshot of your business performance and AI recommendations
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Add the help button */}
        <HelpButton contextId="dashboard" variant="text" />
        
        {pendingApprovals && pendingApprovals > 0 ? (
          <Button asChild variant="outline" className="gap-2">
            <Link to="/dashboard/approvals">
              <Bell className="h-4 w-4" />
              Approvals
              <Badge variant="destructive" className="ml-1">
                {pendingApprovals}
              </Badge>
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
