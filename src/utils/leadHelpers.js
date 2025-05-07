var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { handleApiError } from "@/utils/api/errorHandling";
/**
 * Fetch leads for a specific campaign
 */
export function fetchCompanyLeads(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("leads")
                .select("*, campaigns(name)")
                .eq("campaigns.company_id", companyId)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            handleApiError(error, {
                customMessage: "Failed to fetch company leads",
                rethrow: false,
            });
            return [];
        }
    });
}
/**
 * Update the status of a lead
 */
export function updateLeadStatus(leadId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("leads")
                .update({ status })
                .eq("id", leadId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            handleApiError(error, {
                customMessage: "Failed to update lead status",
                rethrow: false,
            });
            return false;
        }
    });
}
/**
 * Delete a lead
 */
export function deleteLead(leadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("leads").delete().eq("id", leadId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            handleApiError(error, {
                customMessage: "Failed to delete lead",
                rethrow: false,
            });
            return false;
        }
    });
}
/**
 * Create a new lead
 */
export function createLead(leadData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("leads")
                .insert([leadData])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            handleApiError(error, {
                customMessage: "Failed to create new lead",
                rethrow: false,
            });
            return null;
        }
    });
}
// Example function using LeadStatus
export function getStatusColor(status) {
    switch (status) {
        case "new":
            return "blue";
        case "contacted":
            return "orange";
        case "qualified":
            return "green";
        case "proposal":
            return "purple";
        case "negotiation":
            return "yellow";
        case "closed":
            return "emerald";
        case "lost":
            return "red";
        default:
            return "gray";
    }
}
// Other lead helper functions
export function formatLeadData(lead) {
    var _a;
    return Object.assign(Object.assign({}, lead), { status: lead.status || "new", campaignName: ((_a = lead.campaigns) === null || _a === void 0 ? void 0 : _a.name) ?? "Unknown Campaign" }); // Use nullish coalescing
}
