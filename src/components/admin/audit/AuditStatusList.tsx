import React from "react";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react";
export function AuditStatusList({ items }) {
  const getStatusIcon = (status, size = "sm") => {
    const className = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    switch (status) {
      case "passed":
        return <CheckCircle2 className={`${className} text-green-500`} />;
      case "failed":
        return <XCircle className={`${className} text-red-500`} />;
      case "in-progress":
        return (
          <RefreshCw className={`${className} animate-spin text-blue-500`} />
        );
      default:
        return <AlertCircle className={`${className} text-muted-foreground`} />;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2 mb-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-3 border rounded-md"
        >
          <div className="flex items-center gap-2">
            {getStatusIcon(item.status)}
            <span className="font-medium">{item.label}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {item.status === "passed"
              ? item.passedMessage
              : item.status === "failed"
                ? item.failedMessage
                : item.status === "in-progress"
                  ? "Checking..."
                  : item.pendingMessage}
          </div>
        </div>
      ))}
    </div>
  );
}
