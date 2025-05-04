"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AgentPerformanceDashboard } from "./AgentPerformanceDashboard";

interface AgentPerformanceModalProps {
  open: boolean;
  onClose: () => void;
  pluginName?: string;
}

export const AgentPerformanceModal = ({
  open,
  onClose,
  pluginName,
}: AgentPerformanceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <AgentPerformanceDashboard pluginFilter={pluginName} />
      </DialogContent>
    </Dialog>
  );
};
