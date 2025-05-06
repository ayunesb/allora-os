import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertItem } from "./AlertItem";
export const AlertList = ({ alerts, onAcknowledge }) => {
  if (alerts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No alerts to display</div>
    );
  }
  return (
    <ScrollArea className="h-[250px]">
      <div className="space-y-3 p-6">
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onAcknowledge={onAcknowledge}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
