import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useStrategies } from "@/hooks/useStrategies";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search, RefreshCw, ArrowDownWideNarrow, } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import StrategyGrid from "./StrategyGrid";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
export default function StrategyBoard() {
    const navigate = useNavigate();
    const { strategies, isLoading, error, refetch } = useStrategies();
    const [searchQuery, setSearchQuery] = useState("");
    const [riskFilter, setRiskFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");
    const [showStrategyDialog, setShowStrategyDialog] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState(null);
    // Filter and sort strategies
    const filteredAndSortedStrategies = React.useMemo(() => {
        let filtered = strategies;
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((strategy) => strategy.title.toLowerCase().includes(query) ||
                (strategy.description &&
                    strategy.description.toLowerCase().includes(query)));
        }
        // Apply risk filter
        if (riskFilter !== "all") {
            filtered = filtered.filter((strategy) => {
                // Get risk level from any of the available properties
                const riskValue = strategy.risk || strategy.risk_level || "Medium";
                return riskValue.toLowerCase() === riskFilter.toLowerCase();
            });
        }
        // Apply sorting
        return [...filtered].sort((a, b) => {
            if (sortOrder === "newest") {
                return (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            }
            else if (sortOrder === "oldest") {
                return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            }
            else if (sortOrder === "riskHigh") {
                const riskA = a.risk || a.risk_level || "Medium";
                const riskB = b.risk || b.risk_level || "Medium";
                const riskOrder = { High: 3, Medium: 2, Low: 1 };
                return riskOrder[riskB] - riskOrder[riskA];
            }
            else if (sortOrder === "riskLow") {
                const riskA = a.risk || a.risk_level || "Medium";
                const riskB = b.risk || b.risk_level || "Medium";
                const riskOrder = { High: 3, Medium: 2, Low: 1 };
                return riskOrder[riskA] - riskOrder[riskB];
            }
            return 0;
        });
    }, [strategies, searchQuery, riskFilter, sortOrder]);
    const handleNewStrategy = () => {
        navigate("/dashboard/strategies/new");
    };
    const handleViewStrategy = (strategy) => {
        setSelectedStrategy(strategy);
        setShowStrategyDialog(true);
    };
    const handleDebate = (strategy) => {
        navigate(`/dashboard/debate?strategyId=${strategy.id}&title=${encodeURIComponent(strategy.title)}`);
    };
    const handleExport = (strategy) => {
        toast.success("Strategy exported to PDF", {
            description: `"${strategy.title}" has been exported.`,
        });
    };
    if (error) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center p-8 text-center", children: [_jsx("div", { className: "text-destructive mb-4", children: _jsx("svg", { className: "h-10 w-10 mx-auto", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Error Loading Strategies" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "We encountered a problem loading your strategies." }), _jsxs(Button, { onClick: refetch, variant: "outline", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Try Again"] })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto", children: [_jsxs("div", { className: "relative w-full sm:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search strategies...", className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Select, { value: riskFilter, onValueChange: setRiskFilter, children: [_jsxs(SelectTrigger, { className: "w-full sm:w-36", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), _jsx(SelectValue, { placeholder: "Filter" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Risks" }), _jsx(SelectItem, { value: "low", children: "Low Risk" }), _jsx(SelectItem, { value: "medium", children: "Medium Risk" }), _jsx(SelectItem, { value: "high", children: "High Risk" })] })] }), _jsxs(Select, { value: sortOrder, onValueChange: setSortOrder, children: [_jsxs(SelectTrigger, { className: "w-full sm:w-36", children: [_jsx(ArrowDownWideNarrow, { className: "mr-2 h-4 w-4" }), _jsx(SelectValue, { placeholder: "Sort" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "newest", children: "Newest First" }), _jsx(SelectItem, { value: "oldest", children: "Oldest First" }), _jsx(SelectItem, { value: "riskHigh", children: "Highest Risk" }), _jsx(SelectItem, { value: "riskLow", children: "Lowest Risk" })] })] })] })] }), _jsxs(Button, { onClick: handleNewStrategy, className: "shrink-0", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Strategy"] })] }), isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => (_jsx(Skeleton, { className: "h-64 w-full" }, i))) })) : filteredAndSortedStrategies.length === 0 ? (_jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-8 text-center", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "No strategies found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: searchQuery || riskFilter !== "all"
                            ? "No strategies match your search criteria. Try adjusting your filters."
                            : "Get started by creating your first business strategy." }), searchQuery || riskFilter !== "all" ? (_jsx(Button, { variant: "outline", onClick: () => {
                            setSearchQuery("");
                            setRiskFilter("all");
                        }, children: "Clear Filters" })) : (_jsxs(Button, { onClick: handleNewStrategy, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Strategy"] }))] })) : (_jsx(StrategyGrid, { strategies: filteredAndSortedStrategies, onDebate: handleDebate, onExport: handleExport, onViewStrategy: handleViewStrategy })), selectedStrategy && (_jsx(Dialog, { open: showStrategyDialog, onOpenChange: setShowStrategyDialog, children: _jsxs(DialogContent, { className: "max-w-3xl", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: selectedStrategy.title }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: "Description" }), _jsx("p", { className: "text-muted-foreground mt-1", children: selectedStrategy.description })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: "Risk Level" }), _jsx("p", { className: "text-muted-foreground mt-1", children: selectedStrategy.risk ||
                                                        selectedStrategy.risk_level ||
                                                        "Medium" })] }), selectedStrategy.timeframe && (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: "Timeframe" }), _jsx("p", { className: "text-muted-foreground mt-1", children: selectedStrategy.timeframe })] })), selectedStrategy.impact && (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: "Expected Impact" }), _jsx("p", { className: "text-muted-foreground mt-1", children: selectedStrategy.impact })] })), selectedStrategy.executiveBot && (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: "Proposed By" }), _jsx("p", { className: "text-muted-foreground mt-1", children: selectedStrategy.executiveBot })] }))] }), _jsxs("div", { className: "flex justify-between mt-6", children: [_jsx(Button, { variant: "outline", onClick: () => setShowStrategyDialog(false), children: "Close" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", onClick: () => handleDebate(selectedStrategy), children: "Discuss in AI Boardroom" }), _jsx(Button, { onClick: () => handleExport(selectedStrategy), children: "Export Strategy" })] })] })] })] }) }))] }));
}
