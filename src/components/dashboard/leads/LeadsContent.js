"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsContent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var LeadFilterBar_1 = require("./LeadFilterBar");
var LeadsTable_1 = require("./LeadsTable");
var MobileLeadCards_1 = require("./MobileLeadCards");
var LeadBulkActions_1 = require("./LeadBulkActions");
var AddLeadDialog_1 = require("@/components/admin/leads/AddLeadDialog");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var LeadsContent = function (_a) {
  var leads = _a.leads,
    isMobileView = _a.isMobileView,
    filteredLeads = _a.filteredLeads,
    searchQuery = _a.searchQuery,
    setSearchQuery = _a.setSearchQuery,
    activeFilter = _a.activeFilter,
    setActiveFilter = _a.setActiveFilter,
    selectedLeads = _a.selectedLeads,
    handleLeadSelect = _a.handleLeadSelect,
    handleSelectAll = _a.handleSelectAll,
    handleBulkStatusUpdate = _a.handleBulkStatusUpdate,
    handleViewLead = _a.handleViewLead,
    handleLeadStatusUpdate = _a.handleLeadStatusUpdate,
    handleLeadDelete = _a.handleLeadDelete,
    refetchLeads = _a.refetchLeads,
    sortBy = _a.sortBy,
    sortOrder = _a.sortOrder,
    toggleSort = _a.toggleSort,
    getLeadScore = _a.getLeadScore,
    getNextBestAction = _a.getNextBestAction,
    campaigns = _a.campaigns;
  return (0, jsx_runtime_1.jsxs)(ErrorBoundary_1.default, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ".concat(
            isMobileView ? "px-4" : "",
          ),
        children: [
          (0, jsx_runtime_1.jsx)(LeadFilterBar_1.LeadFilterBar, {
            searchQuery: searchQuery,
            onSearchChange: setSearchQuery,
            activeFilter: activeFilter,
            onFilterChange: setActiveFilter,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              selectedLeads.length > 0 &&
                (0, jsx_runtime_1.jsx)(LeadBulkActions_1.LeadBulkActions, {
                  selectedCount: selectedLeads.length,
                  onStatusUpdate: handleBulkStatusUpdate,
                }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.UploadCloud, {
                    className: "h-4 w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "hidden sm:inline",
                    children: "Import",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(AddLeadDialog_1.AddLeadDialog, {
                onLeadAdded: refetchLeads,
                isMobileView: isMobileView,
                campaigns: campaigns,
              }),
            ],
          }),
        ],
      }),
      !isMobileView &&
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.default, {
          children: (0, jsx_runtime_1.jsx)(LeadsTable_1.LeadsTable, {
            leads: filteredLeads,
            sortBy: sortBy,
            sortOrder: sortOrder,
            onSort: toggleSort,
            onViewLead: handleViewLead,
            onStatusUpdate: handleLeadStatusUpdate,
            onDelete: handleLeadDelete,
            selectedLeads: selectedLeads,
            onLeadSelect: handleLeadSelect,
            onSelectAll: function (isSelected) {
              return handleSelectAll(filteredLeads, isSelected);
            },
            getLeadScore: getLeadScore,
            getNextBestAction: getNextBestAction,
          }),
        }),
      isMobileView &&
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.default, {
          children: (0, jsx_runtime_1.jsx)(MobileLeadCards_1.MobileLeadCards, {
            leads: filteredLeads,
            onViewLead: handleViewLead,
            onStatusUpdate: handleLeadStatusUpdate,
            onDelete: handleLeadDelete,
            getLeadScore: getLeadScore,
            getNextBestAction: getNextBestAction,
          }),
        }),
    ],
  });
};
exports.LeadsContent = LeadsContent;
