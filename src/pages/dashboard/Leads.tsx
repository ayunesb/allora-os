import React, { Suspense, useTransition } from "react";
import { useBreakpoint } from "@/hooks/use-mobile";
import { LeadsHeader } from "@/components/dashboard/leads/LeadsHeader";
import { LeadsEmptyState } from "@/components/dashboard/leads/LeadsEmptyState";
import { LeadsLoading } from "@/components/dashboard/leads/LeadsLoading";
import { LeadsErrorState } from "@/components/dashboard/leads/LeadsErrorState";
import { LeadsContent as LeadsContentComponent } from "@/components/dashboard/leads/LeadsContent";
import { LeadProfileDrawer } from "@/components/dashboard/leads/LeadProfileDrawer";
import { useLeadsPage } from "@/hooks/dashboard/useLeadsPage";
import ErrorBoundary from "@/components/ErrorBoundary";
export default function DashboardLeads() {
  const [isPending, startTransition] = useTransition();
  return (
    <ErrorBoundary>
      <Suspense fallback={<LeadsLoading />}>
        <LeadsPageContent
          startTransition={startTransition}
          isPending={isPending}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
// Renamed to LeadsPageContent to avoid naming conflict with imported component
function LeadsPageContent({ startTransition, isPending: transitionPending }) {
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  const {
    leads,
    isLoading,
    leadsError,
    searchQuery,
    sortBy,
    sortOrder,
    activeFilter,
    filteredLeads,
    selectedLeads,
    selectedLead,
    isDrawerOpen,
    formattedCampaigns,
    isPending,
    setSearchQuery,
    toggleSort,
    setActiveFilter,
    handleLeadSelect,
    handleSelectAll,
    handleBulkStatusUpdate,
    handleViewLead,
    setIsDrawerOpen,
    handleLeadStatusUpdate,
    handleLeadDelete,
    refetchLeads,
    getLeadScore,
    getNextBestAction,
  } = useLeadsPage();
  // Use both pending states
  const isAnyPending = isPending || transitionPending;
  return (
    <div className={`animate-fadeIn space-y-6 ${isMobileView ? "px-0" : ""}`}>
      <LeadsHeader isMobileView={isMobileView} />

      {isLoading || isAnyPending ? (
        <LeadsLoading />
      ) : leadsError ? (
        <LeadsErrorState
          onRetry={() => startTransition(() => refetchLeads())}
        />
      ) : leads.length === 0 ? (
        <LeadsEmptyState />
      ) : (
        <>
          <LeadsContentComponent
            leads={leads}
            isMobileView={isMobileView}
            filteredLeads={filteredLeads}
            searchQuery={searchQuery}
            setSearchQuery={(query) =>
              startTransition(() => setSearchQuery(query))
            }
            activeFilter={activeFilter}
            setActiveFilter={(filter) =>
              startTransition(() => setActiveFilter(filter))
            }
            selectedLeads={selectedLeads}
            handleLeadSelect={(leadId, isSelected) =>
              startTransition(() => handleLeadSelect(leadId, isSelected))
            }
            handleSelectAll={(leads, isSelected) =>
              startTransition(() => handleSelectAll(isSelected))
            }
            handleBulkStatusUpdate={(status) =>
              startTransition(() => handleBulkStatusUpdate(status))
            }
            handleViewLead={(lead) =>
              startTransition(() => handleViewLead(lead))
            }
            handleLeadStatusUpdate={(leadId, status) =>
              startTransition(() => handleLeadStatusUpdate(leadId, status))
            }
            handleLeadDelete={(leadId) =>
              startTransition(() => handleLeadDelete(leadId))
            }
            refetchLeads={() => startTransition(() => refetchLeads())}
            sortBy={sortBy}
            sortOrder={sortOrder}
            toggleSort={(column) => startTransition(() => toggleSort(column))}
            getLeadScore={getLeadScore}
            getNextBestAction={getNextBestAction}
            campaigns={formattedCampaigns.map((c) => ({
              id: c.value,
              name: c.label,
            }))}
          />

          {selectedLead && (
            <LeadProfileDrawer
              open={isDrawerOpen}
              onOpenChange={(open) =>
                startTransition(() => setIsDrawerOpen(open))
              }
              lead={selectedLead}
              onStatusUpdate={(leadId, status) =>
                startTransition(() => handleLeadStatusUpdate(leadId, status))
              }
              onDelete={(leadId) =>
                startTransition(() => handleLeadDelete(leadId))
              }
              getLeadScore={getLeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
        </>
      )}
    </div>
  );
}
