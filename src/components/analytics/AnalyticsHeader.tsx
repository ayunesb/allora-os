
import React from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ isRefreshing, onRefresh }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <BarChart3 className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>
      <Button 
        variant="outline" 
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        {isRefreshing ? "Refreshing..." : "Refresh Data"}
      </Button>
    </div>
  );
};

export default AnalyticsHeader;
