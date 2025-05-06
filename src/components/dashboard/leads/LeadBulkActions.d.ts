import React from "react";
import { Lead } from "@/models/lead";
type LeadBulkActionsProps = {
  selectedCount: number;
  onStatusUpdate: (status: Lead["status"]) => Promise<boolean | void>;
};
export declare const LeadBulkActions: React.FC<LeadBulkActionsProps>;
export {};
