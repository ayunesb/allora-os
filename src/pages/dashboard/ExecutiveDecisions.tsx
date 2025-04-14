
import React from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { DecisionFilters } from "@/components/executive-decisions/DecisionFilters";
import { DecisionTable } from "@/components/executive-decisions/DecisionTable";
import { PdfExport } from "@/components/executive-decisions/PdfExport";
import { useDecisions } from "@/hooks/useDecisions";
import { useDecisionFilter } from "@/hooks/useDecisionFilter";

export default function ExecutiveDecisions() {
  const { decisions, loading, error } = useDecisions();
  const {
    executiveFilter,
    setExecutiveFilter,
    priorityFilter,
    setPriorityFilter,
    riskFilter,
    setRiskFilter,
    searchQuery,
    setSearchQuery,
    filteredDecisions
  } = useDecisionFilter(decisions);

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="Executive Decision Log" 
        description="Review decisions made by your AI executive team"
      />

      <DecisionFilters
        executiveFilter={executiveFilter}
        setExecutiveFilter={setExecutiveFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <PdfExport decisions={filteredDecisions} />

      <DecisionTable 
        decisions={filteredDecisions}
        loading={loading}
        error={error}
      />
    </div>
  );
}
