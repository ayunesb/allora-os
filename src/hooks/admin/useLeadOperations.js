var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export function useLeadOperations(companyId) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchLeads = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            let query = supabase
                .from("leads")
                .select("*, campaigns(name)")
                .order("created_at", { ascending: false });
            // Add company filter if provided
            if (companyId) {
                query = query.eq("campaigns.company_id", companyId);
            }
            const { data, error } = yield query;
            if (error)
                throw error;
            return data || [];
        }
        catch (err) {
            console.error("Error fetching leads:", err);
            setError(err.message || "Failed to fetch leads");
            toast.error(`Failed to fetch leads: ${err.message || "Unknown error"}`);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }), [companyId]);
    const updateLeadStatus = (leadId, status) => __awaiter(this, void 0, void 0, function* () {
        setError(null);
        try {
            const { error } = yield supabase
                .from("leads")
                .update({ status })
                .eq("id", leadId);
            if (error)
                throw error;
            toast.success("Lead status updated successfully");
            return true;
        }
        catch (err) {
            console.error("Error updating lead status:", err);
            setError(err.message || "Failed to update lead status");
            toast.error(`Failed to update lead status: ${err.message || "Unknown error"}`);
            return false;
        }
    });
    const deleteLead = (leadId) => __awaiter(this, void 0, void 0, function* () {
        setError(null);
        try {
            const { error } = yield supabase.from("leads").delete().eq("id", leadId);
            if (error)
                throw error;
            toast.success("Lead deleted successfully");
            return true;
        }
        catch (err) {
            console.error("Error deleting lead:", err);
            setError(err.message || "Failed to delete lead");
            toast.error(`Failed to delete lead: ${err.message || "Unknown error"}`);
            return false;
        }
    });
    const createLead = (data) => __awaiter(this, void 0, void 0, function* () {
        setError(null);
        try {
            if (!data.name || !data.email || !data.campaign_id) {
                throw new Error("Name, email, and campaign_id are required to create a lead.");
            }
            const { data: lead, error } = yield supabase
                .from("leads")
                .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    status: data.status || "new",
                    campaign_id: data.campaign_id,
                },
            ])
                .select()
                .single();
            if (error)
                throw error;
            toast.success("Lead created successfully");
            return lead;
        }
        catch (err) {
            console.error("Error creating lead:", err);
            setError(err.message || "Failed to create lead");
            toast.error(`Failed to create lead: ${err.message || "Unknown error"}`);
            return null;
        }
    });
    return {
        isLoading,
        error,
        fetchLeads,
        updateLeadStatus,
        deleteLead,
        createLead,
    };
}
