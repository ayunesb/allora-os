import { useState, useMemo } from 'react';
export function useDecisionFilter(decisions) {
    const [executiveFilter, setExecutiveFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [riskFilter, setRiskFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredDecisions = useMemo(() => {
        return decisions.filter((decision) => {
            const matchesExecutive = executiveFilter
                ? decision.executiveName.toLowerCase().includes(executiveFilter.toLowerCase())
                : true;
            const matchesPriority = priorityFilter
                ? decision.priority?.toLowerCase() === priorityFilter.toLowerCase()
                : true;
            const matchesRisk = riskFilter
                ? decision.riskAssessment?.includes(riskFilter)
                : true;
            const matchesSearch = searchQuery
                ? (decision.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    decision.selectedOption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (decision.reasoning && decision.reasoning.toLowerCase().includes(searchQuery.toLowerCase())))
                : true;
            return matchesExecutive && matchesPriority && matchesRisk && matchesSearch;
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
        filteredDecisions
    };
}
