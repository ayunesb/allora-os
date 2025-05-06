import React from "react";
import { Lead } from "@/models/lead";
type MobileLeadCardsProps = {
  leads: Lead[];
  onStatusUpdate: (
    leadId: string,
    status: Lead["status"],
  ) => Promise<boolean | void>;
  onDelete: (leadId: string) => Promise<boolean | void>;
};
export declare const MobileLeadCards: React.FC<MobileLeadCardsProps>;
export {};
