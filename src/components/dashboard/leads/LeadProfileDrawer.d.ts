import React from "react";
import { Lead } from "@/models/lead";
interface LeadProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
  onStatusUpdate: (leadId: string, status: Lead["status"]) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  getLeadScore: (lead: Lead) => "hot" | "warm" | "cold";
  getNextBestAction: (lead: Lead) => string;
}
export declare const LeadProfileDrawer: React.FC<LeadProfileDrawerProps>;
export {};
