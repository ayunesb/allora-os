
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  pendingApprovals?: number;
}

export function DashboardHeader({ pendingApprovals = 0 }: DashboardHeaderProps) {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="text-xl font-bold">Allora AI</Link>
          </div>
          {pendingApprovals > 0 && (
            <div className="flex items-center">
              <Link to="/dashboard/approvals" className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {pendingApprovals} pending approval{pendingApprovals > 1 ? 's' : ''}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
