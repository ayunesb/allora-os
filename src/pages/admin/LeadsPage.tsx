
import React from "react";
import { LeadsHeader, LeadsTable } from "@/components/admin/leads";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <LeadsHeader />
      <LeadsTable />
    </div>
  );
}
