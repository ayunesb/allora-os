var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect, useCallback, useTransition } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/context/AuthContext";
import { useAdvancedLeadScoring } from "@/hooks/useAdvancedLeadScoring";
export function useLeadsPage() {
    const { user, profile } = useAuth();
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [leadsError, setLeadsError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formattedCampaigns, setFormattedCampaigns] = useState([]);
    const [isPending, startTransition] = useTransition();
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const { calculateAdvancedScore, getLeadScoreCategory, getNextBestAction, getLeadPriority, } = useAdvancedLeadScoring();
    // Fetch leads
    const fetchLeads = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(profile === null || profile === void 0 ? void 0 : profile.company_id)) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setLeadsError(null);
        try {
            // First, check the Supabase connection
            const response = yield supabase.functions
                .invoke("check-connection", {
                body: { silent: true },
            })
                .catch(() => ({
                data: {
                    connected: false,
                    error: new Error("Connection check failed"),
                },
            }));
            // Check if we have a valid response and connection
            const connectionInfo = response.data || {
                connected: false,
                error: new Error("Invalid connection response"),
            };
            if (!connectionInfo.connected) {
                throw (connectionInfo.error || new Error("Unable to connect to database"));
            }
            const { data, error } = yield supabase
                .from("leads")
                .select("*, campaigns(name)")
                .eq("campaigns.company_id", profile.company_id)
                .order(sortBy, { ascending: sortOrder === "asc" });
            if (error)
                throw error;
            startTransition(() => {
                setLeads(data || []);
            });
            // Fetch campaigns for the filters
            const { data: campaigns, error: campaignsError } = yield supabase
                .from("campaigns")
                .select("id, name")
                .eq("company_id", profile.company_id);
            if (campaignsError) {
                console.error("Error fetching campaigns:", campaignsError);
            }
            else if (campaigns) {
                startTransition(() => {
                    setFormattedCampaigns(campaigns.map((c) => ({ value: c.id, label: c.name })));
                });
            }
        }
        catch (error) {
            console.error("Error fetching leads:", error);
            setLeadsError(error);
            toast.error("Failed to load leads", {
                description: error.message || "Database connection error",
            });
        }
        finally {
            setIsLoading(false);
        }
    }), [profile === null || profile === void 0 ? void 0 : profile.company_id, sortBy, sortOrder, startTransition]);
    useEffect(() => {
        // Wrap the effect body in startTransition to prevent suspension during updates
        startTransition(() => {
            fetchLeads();
        });
    }, [fetchLeads]);
    const toggleSort = useCallback((column) => {
        startTransition(() => {
            setSortBy(column);
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        });
    }, [startTransition]);
    // Apply filters and search - moved inside a memoized function
    const getFilteredLeads = useCallback(() => {
        if (!leads)
            return [];
        return leads.filter((lead) => {
            // Apply search filter
            const matchesSearch = !debouncedSearchQuery ||
                lead.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                (lead.email &&
                    lead.email
                        .toLowerCase()
                        .includes(debouncedSearchQuery.toLowerCase())) ||
                (lead.phone && lead.phone.includes(debouncedSearchQuery));
            // Apply campaign filter
            const matchesFilter = !activeFilter || lead.campaign_id === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [leads, debouncedSearchQuery, activeFilter]);
    // Compute filtered leads using the memoized function
    const filteredLeads = getFilteredLeads();
    // Lead selection
    const handleLeadSelect = useCallback((leadId, isSelected) => {
        startTransition(() => {
            setSelectedLeads((prev) => {
                if (isSelected) {
                    return [...prev, leadId];
                }
                else {
                    return prev.filter((id) => id !== leadId);
                }
            });
        });
    }, [startTransition]);
    const handleSelectAll = useCallback((isSelected) => {
        startTransition(() => {
            if (isSelected) {
                setSelectedLeads(filteredLeads.map((lead) => lead.id));
            }
            else {
                setSelectedLeads([]);
            }
        });
    }, [filteredLeads, startTransition]);
    // Bulk actions
    const handleBulkStatusUpdate = useCallback((newStatus) => __awaiter(this, void 0, void 0, function* () {
        if (selectedLeads.length === 0)
            return;
        try {
            const { error } = yield supabase
                .from("leads")
                .update({ status: newStatus })
                .in("id", selectedLeads);
            if (error)
                throw error;
            toast.success(`Updated ${selectedLeads.length} leads to ${newStatus}`);
            startTransition(() => {
                fetchLeads();
                setSelectedLeads([]);
            });
            return true;
        }
        catch (error) {
            console.error("Error updating leads:", error);
            toast.error("Failed to update leads");
            return false;
        }
    }), [selectedLeads, fetchLeads, startTransition]);
    // Lead detail view
    const handleViewLead = useCallback((lead) => {
        startTransition(() => {
            setSelectedLead(lead);
            setIsDrawerOpen(true);
        });
    }, [startTransition]);
    // Lead actions
    const handleLeadStatusUpdate = useCallback((leadId, newStatus) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("leads")
                .update({ status: newStatus })
                .eq("id", leadId);
            if (error)
                throw error;
            toast.success(`Lead status updated to ${newStatus}`);
            startTransition(() => {
                fetchLeads();
                // Update the selected lead if it's open
                if (selectedLead && selectedLead.id === leadId) {
                    setSelectedLead((prev) => prev ? Object.assign(Object.assign({}, prev), { status: newStatus }) : null);
                }
            });
            return true;
        }
        catch (error) {
            console.error("Error updating lead status:", error);
            toast.error("Failed to update lead status");
            return false;
        }
    }), [fetchLeads, selectedLead, startTransition]);
    const handleLeadDelete = useCallback((leadId) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("leads")
                .delete()
                .eq("id", leadId);
            if (error)
                throw error;
            toast.success("Lead deleted successfully");
            startTransition(() => {
                fetchLeads();
                // Close the drawer if the deleted lead was selected
                if (selectedLead && selectedLead.id === leadId) {
                    setIsDrawerOpen(false);
                    setSelectedLead(null);
                }
            });
            return true;
        }
        catch (error) {
            console.error("Error deleting lead:", error);
            toast.error("Failed to delete lead");
            return false;
        }
    }), [fetchLeads, selectedLead, startTransition]);
    return {
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
        refetchLeads: fetchLeads,
        getLeadScore: getLeadScoreCategory,
        getNextBestAction,
        getLeadPriority,
    };
}
