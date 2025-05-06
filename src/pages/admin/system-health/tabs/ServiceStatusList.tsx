import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Activity, XCircle } from "lucide-react";
export default function ServiceStatusList({
  services,
  showViewAllButton = true,
  onViewAllClick,
}) {
  // Get health status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <Activity className="h-5 w-5 text-amber-500" />;
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-50 text-green-700 border-green-200";
      case "degraded":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "down":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.name} className="flex items-center justify-between">
          <div className="flex items-center">
            {getStatusIcon(service.status)}
            <span className="ml-2">{service.name}</span>
          </div>
          <span
            className={`text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`}
          >
            {service.status}
          </span>
        </div>
      ))}

      {services.length > 0 && showViewAllButton && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={onViewAllClick}
        >
          View All Services
        </Button>
      )}
    </div>
  );
}
