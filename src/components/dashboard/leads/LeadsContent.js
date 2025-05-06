import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFilterBar } from "./LeadFilterBar";
import { LeadsTable } from "./LeadsTable";
import { MobileLeadCards } from "./MobileLeadCards";
import { LeadBulkActions } from "./LeadBulkActions";
import { AddLeadDialog } from "@/components/admin/leads/AddLeadDialog";
import ErrorBoundary from "@/components/ErrorBoundary";
export const LeadsContent = ({ leads, isMobileView, filteredLeads, searchQuery, setSearchQuery, activeFilter, setActiveFilter, selectedLeads, handleLeadSelect, handleSelectAll, handleBulkStatusUpdate, handleViewLead, handleLeadStatusUpdate, handleLeadDelete, refetchLeads, sortBy, sortOrder, toggleSort, getLeadScore, getNextBestAction, campaigns, }) => {
    return (_jsxs(ErrorBoundary, { children: [_jsxs("div", { className: `flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${isMobileView ? "px-4" : ""}`, children: [_jsx(LeadFilterBar, { searchQuery: searchQuery, onSearchChange: setSearchQuery, activeFilter: activeFilter, onFilterChange: setActiveFilter }), _jsxs("div", { className: "flex gap-2", children: [selectedLeads.length > 0 && (_jsx(LeadBulkActions, { selectedCount: selectedLeads.length, onStatusUpdate: handleBulkStatusUpdate })), _jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [_jsx(UploadCloud, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Import" })] }), _jsx(AddLeadDialog, { onLeadAdded: refetchLeads, isMobileView: isMobileView, campaigns: campaigns })] })] }), !isMobileView && (_jsx(ErrorBoundary, { children: _jsx(LeadsTable, { leads: filteredLeads, sortBy: sortBy, sortOrder: sortOrder, onSort: toggleSort, onViewLead: handleViewLead, onStatusUpdate: handleLeadStatusUpdate, onDelete: handleLeadDelete, selectedLeads: selectedLeads, onLeadSelect: handleLeadSelect, onSelectAll: (isSelected) => handleSelectAll(filteredLeads, isSelected), getLeadScore: getLeadScore, getNextBestAction: getNextBestAction }) })), isMobileView && (_jsx(ErrorBoundary, { children: _jsx(MobileLeadCards, { leads: filteredLeads, onViewLead: handleViewLead, onStatusUpdate: handleLeadStatusUpdate, onDelete: handleLeadDelete, getLeadScore: getLeadScore, getNextBestAction: getNextBestAction }) }))] }));
};
