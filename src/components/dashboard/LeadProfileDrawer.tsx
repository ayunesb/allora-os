import React from "react";
import { Modal } from "@/components/ui/Modal"; // Ensure Modal component exists
import type { Lead } from "@/types/Leads";

interface LeadProfileDrawerProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (newStatus: string) => void;
}

export const LeadProfileDrawer: React.FC<LeadProfileDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="drawer">
      <header>
        <h2>{lead.name}</h2>
        <button onClick={onClose}>Close</button>
      </header>
      <section>
        <p>Email: {lead.email}</p>
        <p>Status: {lead.status}</p>
        {onStatusChange && (
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
          </select>
        )}
      </section>
    </aside>
  );
};