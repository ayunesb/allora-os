import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Search, Plus } from "lucide-react";
import StrategyCard from "@/components/strategies/StrategyCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
const StrategyContent = ({ isLoading, error, refetch, filteredAndSortedStrategies, searchQuery, riskFilter, setSearchQuery, setRiskFilter, handleNewStrategy, handleEditStrategy, handleDeleteStrategy, handleViewStrategy, }) => {
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 animate-pulse", children: [1, 2, 3, 4].map((_, index) => (_jsxs("div", { className: "strategy-card", children: [_jsx(Skeleton, { className: "h-6 w-3/4 mb-2" }), _jsx(Skeleton, { className: "h-4 w-1/4 mb-4" }), _jsx(Skeleton, { className: "h-20 w-full mb-4" }), _jsx(Skeleton, { className: "h-10 w-full" })] }, index))) }));
    }
    if (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : typeof error === "string"
                ? error
                : "An unknown error occurred";
        return (_jsxs("div", { className: "bg-secondary/40 backdrop-blur-md rounded-xl border border-border/50 p-4 sm:p-6 text-center mb-10 animate-fadeIn", children: [_jsx(AlertCircle, { className: "h-12 w-12 text-destructive mx-auto mb-4 animate-pulse-slow" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Error Loading Strategies" }), _jsx(Alert, { variant: "destructive", className: "mb-6", children: _jsx(AlertDescription, { children: errorMessage }) }), _jsx("p", { className: "text-muted-foreground mb-6", children: "We're having trouble loading your strategies. This could be due to a connection issue or database problem." }), _jsxs(Button, { onClick: () => refetch(), className: "min-w-[120px] animate-pulse-once button-glow", variant: "default", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Retry"] })] }));
    }
    if (filteredAndSortedStrategies.length === 0) {
        if (searchQuery || riskFilter !== "all") {
            return (_jsxs("div", { className: "glassmorphism p-6 sm:p-8 text-center mb-10 animate-fadeIn", children: [_jsx(Search, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "No Results Found" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "No strategies match your current filters. Try adjusting your search criteria." }), _jsx(Button, { variant: "outline", onClick: () => {
                            setSearchQuery("");
                            setRiskFilter("all");
                        }, className: "hover-glow", children: "Clear Filters" })] }));
        }
        return (_jsx("div", { className: "glassmorphism p-8 sm:p-10 text-center mb-10 animate-fadeIn", children: _jsxs("div", { className: "flex flex-col items-center max-w-2xl mx-auto", children: [_jsx("div", { className: "bg-primary/10 rounded-full p-6 mb-6", children: _jsx(Plus, { className: "h-12 w-12 text-primary/70" }) }), _jsx("h3", { className: "text-2xl font-bold mb-3 gradient-text", children: "Create Your First Strategy" }), _jsx("p", { className: "text-muted-foreground mb-8 max-w-lg", children: "Develop strategic plans for your business with the help of our AI executive advisors. Get started by creating your first strategy." }), _jsxs(Button, { onClick: handleNewStrategy, variant: "gradient", size: "lg", className: "shadow-lg hover:shadow-primary/20", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Create New Strategy"] })] }) }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10", children: filteredAndSortedStrategies.map((strategy) => (_jsx(StrategyCard, { strategy: strategy, onEdit: handleEditStrategy, onDelete: handleDeleteStrategy, onView: () => handleViewStrategy(strategy.id, strategy.title) }, strategy.id))) }));
};
export default StrategyContent;
