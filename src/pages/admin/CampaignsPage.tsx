
import React from "react";
import { CampaignHeader, CampaignTable } from "@/components/admin/campaigns";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <CampaignHeader />
      <CampaignTable />
    </div>
  );
}
