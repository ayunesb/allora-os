import React from "react";
import { Lead } from "@/models/lead";
type LeadActionsProps = {
  leadId: string;
  onStatusUpdate: (
    leadId: string,
    status: Lead["status"],
  ) => Promise<void | boolean>;
  onDelete: (leadId: string) => Promise<void | boolean>;
};
export declare const LeadActions: React.FC<LeadActionsProps>;
export {};
