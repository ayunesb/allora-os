import { useState, useMemo } from "react";
import { ExecutiveDecision } from "@/types/agents";

export function useDecisionFilter(decisions: ExecutiveDecision[]) {
  const [executiveFilter, setExecutiveFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [riskFilter, setRiskFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDecisions = useMemo(() => {
    return decisions.filter((decision) => {
      const matchesExecutive = executiveFilter
        ? decision.executiveName
            .toLowerCase()
            .includes(executiveFilter.toLowerCase())
        : true;

      const matchesPriority = priorityFilter
        ? decision.priority?.toLowerCase() === priorityFilter.toLowerCase()
        : true;

      const matchesRisk = riskFilter
        ? decision.riskAssessment?.includes(riskFilter)
        : true;

      const matchesSearch = searchQuery
        ? decision.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
          decision.selectedOption
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (decision.reasoning &&
            decision.reasoning
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
        : true;

      return (
        matchesExecutive && matchesPriority && matchesRisk && matchesSearch
      );
    });
  }, [decisions, executiveFilter, priorityFilter, riskFilter, searchQuery]);

  return {
    executiveFilter,
    setExecutiveFilter,
    priorityFilter,
    setPriorityFilter,
    riskFilter,
    setRiskFilter,
    searchQuery,
    setSearchQuery,
    filteredDecisions,
  };
}
