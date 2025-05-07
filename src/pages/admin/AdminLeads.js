var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Phone, Mail, ArrowUpDown, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeadOperations } from "@/hooks/admin/useLeadOperations";
import { useAdvancedLeadScoring } from "@/hooks/useAdvancedLeadScoring";
export default function AdminLeads() {
    const { fetchLeads, updateLeadStatus, deleteLead, isLoading } = useLeadOperations();
    const { getLeadScoreCategory, getNextBestAction } = useAdvancedLeadScoring();
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [sortBy, setSortBy] = useState("score");
    const [sortOrder, setSortOrder] = useState("desc");
    useEffect(() => {
        const loadLeads = () => __awaiter(this, void 0, void 0, function* () {
            const fetchedLeads = yield fetchLeads();
            setLeads(fetchedLeads);
            setFilteredLeads(fetchedLeads);
        });
        loadLeads();
    }, [fetchLeads]);
    useEffect(() => {
        let result = [...leads];
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((lead) => {
                var _a, _b;
                return lead.name.toLowerCase().includes(query) ||
                    ((_a = lead.email) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query)) ||
                    ((_b = lead.company) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(query));
            });
        }
        // Apply status filter
        if (activeFilter !== "all") {
            result = result.filter((lead) => lead.status === activeFilter);
        }
        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "name") {
                comparison = a.name.localeCompare(b.name);
            }
            else if (sortBy === "score") {
                const scoreA = a.score || 0;
                const scoreB = b.score || 0;
                comparison = scoreA - scoreB;
            }
            else if (sortBy === "created_at") {
                comparison =
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            }
            return sortOrder === "asc" ? comparison : -comparison;
        });
        setFilteredLeads(result);
    }, [leads, searchQuery, activeFilter, sortBy, sortOrder]);
    // Explicitly type the handleSort parameter
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
        else {
            setSortBy(column);
            setSortOrder("desc");
        }
    };
    // Explicitly type the parameters for handleStatusUpdate
    const handleStatusUpdate = (leadId, status) => __awaiter(this, void 0, void 0, function* () {
        const success = yield updateLeadStatus(leadId, status);
        if (success) {
            setLeads((prev) => prev.map((lead) => (lead.id === leadId ? Object.assign(Object.assign({}, lead), { status }) : lead)));
        }
        return success;
    });
    // Explicitly type the parameters for handleDelete
    const handleDelete = (leadId) => __awaiter(this, void 0, void 0, function* () {
        const success = yield deleteLead(leadId);
        if (success) {
            setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
        }
        return success;
    });
    // Fix the spread type issue by ensuring the object is of the correct type
    const handleUpdateLead = (leadId, updatedData) => {
        setLeads((prevLeads) => prevLeads.map((lead) => lead.id === leadId ? Object.assign(Object.assign({}, lead), updatedData) : lead));
    };
    // Explicitly type the parameters
    const handleDeleteLead = (leadId) => {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    };
    const handleStatusChange = (status) => {
        // ...existing code...
    };
    // Explicitly type the renderStatusBadge parameter
    const renderStatusBadge = (status) => {
        switch (status) {
            case "new":
                return (_jsx(Badge, { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30", children: status }));
            case "contacted":
                return (_jsx(Badge, { className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30", children: status }));
            case "qualified":
                return (_jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30", children: status }));
            case "proposal":
                return (_jsx(Badge, { className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30", children: status }));
            case "negotiation":
                return (_jsx(Badge, { className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30", children: status }));
            case "closed":
                return _jsx(Badge, { variant: "secondary", children: status });
            case "lost":
                return (_jsx(Badge, { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30", children: status }));
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    // Explicitly type the renderLeadScore parameter
    const renderLeadScore = (lead) => {
        const scoreCategory = getLeadScoreCategory(lead);
        let colorClass = "";
        if (scoreCategory === "hot") {
            colorClass = "text-red-600 dark:text-red-400";
        }
        else if (scoreCategory === "warm") {
            colorClass = "text-yellow-600 dark:text-yellow-400";
        }
        else {
            colorClass = "text-blue-600 dark:text-blue-400";
        }
        return (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: `font-medium ${colorClass}`, children: scoreCategory.toUpperCase() }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [lead.score || 0, " pts"] })] }));
    };
    const scoreHeaderRender = () => (_jsxs("div", { className: "flex items-center cursor-pointer", onClick: () => handleSort("score"), children: ["Score", _jsx(ArrowUpDown, { className: "ml-1 h-4 w-4" })] }));
    const columns = [
        {
            key: "name",
            title: "Name",
            sortable: true,
            render: (item) => (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: item.name }), item.company && (_jsx("span", { className: "text-xs text-muted-foreground", children: item.company }))] })),
        },
        {
            key: "email",
            title: "Contact",
            hideOnMobile: true,
            render: (item) => (_jsxs("div", { className: "flex flex-col", children: [item.email && _jsx("span", { className: "text-sm", children: item.email }), item.phone && (_jsx("span", { className: "text-xs text-muted-foreground", children: item.phone }))] })),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => renderStatusBadge(item.status),
        },
        {
            key: "score",
            title: "Score",
            titleRender: scoreHeaderRender,
            sortable: true,
            render: (item) => renderLeadScore(item),
        },
        {
            key: "action",
            title: "Next Action",
            hideOnMobile: true,
            render: (item) => (_jsx("div", { className: "max-w-[200px] truncate text-sm", children: getNextBestAction(item) })),
        },
    ];
    const mobileColumns = [
        {
            key: "name",
            title: "Lead",
            render: (item) => (_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: item.name }), _jsx("div", { className: "text-xs text-muted-foreground", children: item.company })] })),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => renderStatusBadge(item.status),
        },
        {
            key: "score",
            title: "Score",
            render: (item) => renderLeadScore(item),
        },
    ];
    // Explicitly type the actions parameter
    const actions = (item) => (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { size: "icon", variant: "ghost", children: _jsx(Phone, { className: "h-4 w-4" }) }), _jsx(Button, { size: "icon", variant: "ghost", children: _jsx(Mail, { className: "h-4 w-4" }) }), _jsx(Button, { size: "icon", variant: "ghost", children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { size: "icon", variant: "ghost", className: "text-destructive hover:text-destructive", onClick: () => handleDelete(item.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] }));
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(TypographyH1, { children: "Lead Management" }), _jsxs(Button, { variant: "primary", className: "w-full sm:w-auto", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Lead"] })] }), _jsxs(Tabs, { defaultValue: "all", value: activeFilter, onValueChange: setActiveFilter, children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center", children: [_jsxs("div", { className: "relative w-full max-w-md", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search leads...", className: "pl-8", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "new", children: "New" }), _jsx(TabsTrigger, { value: "contacted", children: "Contacted" }), _jsx(TabsTrigger, { value: "qualified", children: "Qualified" }), _jsx(TabsTrigger, { value: "proposal", children: "Proposal" })] })] }), _jsx(TabsContent, { value: activeFilter, className: "mt-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: activeFilter === "all"
                                                    ? "All Leads"
                                                    : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Leads` }), isLoading && (_jsx("span", { className: "text-sm text-muted-foreground", children: "Loading..." }))] }) }), _jsx(CardContent, { children: _jsx(ResponsiveTable, { data: filteredLeads, columns: columns, mobileColumns: mobileColumns, actions: actions, emptyState: _jsx("div", { className: "py-8 text-center", children: _jsx(TypographyP, { children: "No leads found matching your criteria." }) }) }) })] }) })] })] }));
}
