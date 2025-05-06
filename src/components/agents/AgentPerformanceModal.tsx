"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AgentPerformanceDashboard } from "./AgentPerformanceDashboard";
export const AgentPerformanceModal = ({ open, onClose, pluginName }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <AgentPerformanceDashboard pluginFilter={pluginName} />
      </DialogContent>
    </Dialog>
  );
};
