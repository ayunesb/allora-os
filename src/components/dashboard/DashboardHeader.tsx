
import { Link } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  pendingApprovals: number;
}

export default function DashboardHeader({ pendingApprovals }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">
          Let's grow your business with AI-powered strategies
        </p>
      </div>
      
      {pendingApprovals > 0 && (
        <Button asChild variant="default">
          <Link to="/dashboard/approvals">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {pendingApprovals} Pending Approvals
          </Link>
        </Button>
      )}
    </div>
  );
}
