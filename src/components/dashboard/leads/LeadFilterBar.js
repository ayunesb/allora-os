import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const LeadFilterBar = ({ searchQuery, onSearchChange, activeFilter, onFilterChange, }) => {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto", children: [_jsxs("div", { className: "relative w-full sm:w-72", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search leads...", className: "pl-8", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsx(Tabs, { value: activeFilter, onValueChange: onFilterChange, className: "w-full sm:w-auto", children: _jsxs(TabsList, { className: "grid grid-cols-4 w-full sm:w-auto", children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "new", children: "New" }), _jsx(TabsTrigger, { value: "contacted", children: "Contacted" }), _jsx(TabsTrigger, { value: "qualified", children: "Qualified" })] }) })] }));
};
