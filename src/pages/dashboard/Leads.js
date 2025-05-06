"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLeads;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var use_mobile_1 = require("@/hooks/use-mobile");
var LeadsHeader_1 = require("@/components/dashboard/leads/LeadsHeader");
var LeadsEmptyState_1 = require("@/components/dashboard/leads/LeadsEmptyState");
var LeadsLoading_1 = require("@/components/dashboard/leads/LeadsLoading");
var LeadsErrorState_1 = require("@/components/dashboard/leads/LeadsErrorState");
var LeadsContent_1 = require("@/components/dashboard/leads/LeadsContent");
var LeadProfileDrawer_1 = require("@/components/dashboard/leads/LeadProfileDrawer");
var useLeadsPage_1 = require("@/hooks/dashboard/useLeadsPage");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
function DashboardLeads() {
  var _a = (0, react_1.useTransition)(),
    isPending = _a[0],
    startTransition = _a[1];
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.default, {
    children: (0, jsx_runtime_1.jsx)(react_1.Suspense, {
      fallback: (0, jsx_runtime_1.jsx)(LeadsLoading_1.LeadsLoading, {}),
      children: (0, jsx_runtime_1.jsx)(LeadsPageContent, {
        startTransition: startTransition,
        isPending: isPending,
      }),
    }),
  });
}
// Renamed to LeadsPageContent to avoid naming conflict with imported component
function LeadsPageContent(_a) {
  var startTransition = _a.startTransition,
    transitionPending = _a.isPending;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _b = (0, useLeadsPage_1.useLeadsPage)(),
    leads = _b.leads,
    isLoading = _b.isLoading,
    leadsError = _b.leadsError,
    searchQuery = _b.searchQuery,
    sortBy = _b.sortBy,
    sortOrder = _b.sortOrder,
    activeFilter = _b.activeFilter,
    filteredLeads = _b.filteredLeads,
    selectedLeads = _b.selectedLeads,
    selectedLead = _b.selectedLead,
    isDrawerOpen = _b.isDrawerOpen,
    formattedCampaigns = _b.formattedCampaigns,
    isPending = _b.isPending,
    setSearchQuery = _b.setSearchQuery,
    toggleSort = _b.toggleSort,
    setActiveFilter = _b.setActiveFilter,
    handleLeadSelect = _b.handleLeadSelect,
    handleSelectAll = _b.handleSelectAll,
    handleBulkStatusUpdate = _b.handleBulkStatusUpdate,
    handleViewLead = _b.handleViewLead,
    setIsDrawerOpen = _b.setIsDrawerOpen,
    handleLeadStatusUpdate = _b.handleLeadStatusUpdate,
    handleLeadDelete = _b.handleLeadDelete,
    refetchLeads = _b.refetchLeads,
    getLeadScore = _b.getLeadScore,
    getNextBestAction = _b.getNextBestAction;
  // Use both pending states
  var isAnyPending = isPending || transitionPending;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "animate-fadeIn space-y-6 ".concat(isMobileView ? "px-0" : ""),
    children: [
      (0, jsx_runtime_1.jsx)(LeadsHeader_1.LeadsHeader, {
        isMobileView: isMobileView,
      }),
      isLoading || isAnyPending
        ? (0, jsx_runtime_1.jsx)(LeadsLoading_1.LeadsLoading, {})
        : leadsError
          ? (0, jsx_runtime_1.jsx)(LeadsErrorState_1.LeadsErrorState, {
              onRetry: function () {
                return startTransition(function () {
                  return refetchLeads();
                });
              },
            })
          : leads.length === 0
            ? (0, jsx_runtime_1.jsx)(LeadsEmptyState_1.LeadsEmptyState, {})
            : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(LeadsContent_1.LeadsContent, {
                    leads: leads,
                    isMobileView: isMobileView,
                    filteredLeads: filteredLeads,
                    searchQuery: searchQuery,
                    setSearchQuery: function (query) {
                      return startTransition(function () {
                        return setSearchQuery(query);
                      });
                    },
                    activeFilter: activeFilter,
                    setActiveFilter: function (filter) {
                      return startTransition(function () {
                        return setActiveFilter(filter);
                      });
                    },
                    selectedLeads: selectedLeads,
                    handleLeadSelect: function (leadId, isSelected) {
                      return startTransition(function () {
                        return handleLeadSelect(leadId, isSelected);
                      });
                    },
                    handleSelectAll: function (leads, isSelected) {
                      return startTransition(function () {
                        return handleSelectAll(isSelected);
                      });
                    },
                    handleBulkStatusUpdate: function (status) {
                      return startTransition(function () {
                        return handleBulkStatusUpdate(status);
                      });
                    },
                    handleViewLead: function (lead) {
                      return startTransition(function () {
                        return handleViewLead(lead);
                      });
                    },
                    handleLeadStatusUpdate: function (leadId, status) {
                      return startTransition(function () {
                        return handleLeadStatusUpdate(leadId, status);
                      });
                    },
                    handleLeadDelete: function (leadId) {
                      return startTransition(function () {
                        return handleLeadDelete(leadId);
                      });
                    },
                    refetchLeads: function () {
                      return startTransition(function () {
                        return refetchLeads();
                      });
                    },
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    toggleSort: function (column) {
                      return startTransition(function () {
                        return toggleSort(column);
                      });
                    },
                    getLeadScore: getLeadScore,
                    getNextBestAction: getNextBestAction,
                    campaigns: formattedCampaigns.map(function (c) {
                      return { id: c.value, name: c.label };
                    }),
                  }),
                  selectedLead &&
                    (0, jsx_runtime_1.jsx)(
                      LeadProfileDrawer_1.LeadProfileDrawer,
                      {
                        open: isDrawerOpen,
                        onOpenChange: function (open) {
                          return startTransition(function () {
                            return setIsDrawerOpen(open);
                          });
                        },
                        lead: selectedLead,
                        onStatusUpdate: function (leadId, status) {
                          return startTransition(function () {
                            return handleLeadStatusUpdate(leadId, status);
                          });
                        },
                        onDelete: function (leadId) {
                          return startTransition(function () {
                            return handleLeadDelete(leadId);
                          });
                        },
                        getLeadScore: getLeadScore,
                        getNextBestAction: getNextBestAction,
                      },
                    ),
                ],
              }),
    ],
  });
}
