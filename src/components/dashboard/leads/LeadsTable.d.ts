import React from "react";
import { Lead } from "@/models/lead";
interface LeadsTableProps {
  leads: Lead[];
  sortBy: "name" | "created_at";
  sortOrder: "asc" | "desc";
  onSort: (column: "name" | "created_at") => void;
  onViewLead: (lead: Lead) => void;
  onStatusUpdate: (leadId: string, status: Lead["status"]) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  selectedLeads: string[];
  onLeadSelect: (leadId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  getLeadScore: (lead: Lead) => "hot" | "warm" | "cold";
  getNextBestAction: (lead: Lead) => string;
}
export declare const LeadsTable: React.FC<LeadsTableProps>;
export {};
