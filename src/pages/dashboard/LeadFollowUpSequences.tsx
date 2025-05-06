import React from "react";
import { FollowUpSequences } from "@/components/leads/FollowUpSequences";
export default function LeadFollowUpSequences() {
  return (
    <div className="animate-fadeIn space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Follow-Up Sequences</h1>
      <p className="text-muted-foreground">
        Create and manage automated follow-up sequences for your leads.
      </p>

      <FollowUpSequences />
    </div>
  );
}
