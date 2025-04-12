
import React from "react";
import { BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ isRefreshing, onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fadeIn">
      <div className="flex items-center">
        <BarChart3 className="h-8 w-8 text-primary mr-3" />
        <div>
          <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Get detailed insights into your business performance
          </p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onRefresh}
        disabled={isRefreshing}
        className="hover-glow"
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? "Refreshing..." : "Refresh Data"}
      </Button>
    </div>
  );
};

export default AnalyticsHeader;
