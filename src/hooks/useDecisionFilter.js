import { useState, useMemo } from "react";
export function useDecisionFilter(decisions) {
    const [executiveFilter, setExecutiveFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [riskFilter, setRiskFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredDecisions = useMemo(() => {
        return decisions.filter((decision) => {
            var _a, _b;
            const matchesExecutive = executiveFilter
                ? decision.executiveName
                    .toLowerCase()
                    .includes(executiveFilter.toLowerCase())
                : true;
            const matchesPriority = priorityFilter
                ? ((_a = decision.priority) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === priorityFilter.toLowerCase()
                : true;
            const matchesRisk = riskFilter
                ? (_b = decision.riskAssessment) === null || _b === void 0 ? void 0 : _b.includes(riskFilter)
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
            return (matchesExecutive && matchesPriority && matchesRisk && matchesSearch);
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
