import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export function DashboardBreadcrumb({
  rootPath,
  rootLabel,
  rootIcon,
  currentPath,
  currentLabel,
}) {
  return (
    <div className="flex items-center text-sm mb-6 text-muted-foreground">
      <Link to="/dashboard" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>

      <ChevronRight className="h-4 w-4 mx-2" />

      <Link
        to={rootPath}
        className="flex items-center hover:text-foreground transition-colors"
      >
        {rootIcon && <span className="mr-1.5">{rootIcon}</span>}
        {rootLabel}
      </Link>

      {currentPath && currentLabel && (
        <>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={currentPath} className="text-foreground font-medium">
            {currentLabel}
          </Link>
        </>
      )}
    </div>
  );
}
