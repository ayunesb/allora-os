
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="text-xl font-bold">Allora AI</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
