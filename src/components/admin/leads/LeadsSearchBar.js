import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export const LeadsSearchBar = ({ searchQuery, onSearchChange }) => {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search leads...", className: "pl-9 w-full", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }));
};
