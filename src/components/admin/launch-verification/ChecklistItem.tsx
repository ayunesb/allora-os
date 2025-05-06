import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Clock, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function ChecklistItem({ item }) {
  // Determine status icon and color
  const renderStatusIcon = () => {
    switch (item.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "pending":
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  const getStatusText = () => {
    switch (item.status) {
      case "completed":
        return "Completed";
      case "warning":
        return "Warning";
      case "error":
        return "Error";
      case "in-progress":
        return "In Progress";
      case "pending":
      default:
        return "Pending";
    }
  };
  return (
    <div className="p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {renderStatusIcon()}

        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.name}</span>
            {item.isRequired && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                Required
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}

          {item.statusMessage && (
            <p
              className={`text-sm mt-1 ${
                item.status === "warning"
                  ? "text-yellow-600"
                  : item.status === "error"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {item.statusMessage}
            </p>
          )}
        </div>
      </div>

      {item.details && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-1.5 rounded-full hover:bg-secondary"
                aria-label="View details"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{item.details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
