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
import { createCustomer as createStripeCustomerUtil } from "@/backend/stripe";
/**
 * Creates integration records for a new company in all master service accounts
 * This function is called during the onboarding process to set up a company with all integrations
 */
export function setupCompanyIntegrations(companyId, companyName, industry, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Setting up integrations for company:", companyName);
            // Create integration mappings object to store external IDs
            const integrationIds = {};
            // 1. Create Stripe customer
            const stripeResult = yield createStripeCustomer(companyName, email, industry);
            if (stripeResult.success && stripeResult.customerId) {
                integrationIds.stripe_customer_id = stripeResult.customerId;
                console.log("Created Stripe customer:", stripeResult.customerId);
            }
            else {
                console.warn("Failed to create Stripe customer:", stripeResult.error);
            }
            // 2. Store all integration IDs in Supabase
            yield storeIntegrationIds(companyId, integrationIds);
            console.log("Successfully set up company integrations");
            return { success: true };
        }
        catch (error) {
            console.error("Failed to set up company integrations:", error);
            return {
                success: false,
                error: error.message ||
                    "An unexpected error occurred during integration setup",
            };
        }
    });
}
/**
 * Creates a Stripe customer for a company in the master Stripe account
 */
function createStripeCustomer(companyName, email, industry) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log("Creating Stripe customer for:", companyName, email);
            // Call the createCustomer function from our stripe.ts utility
            const customerId = companyName; // Assuming companyName is used as customerId
            const customerData = {
                email,
                industry,
                source: "allora_platform",
            };
            yield createStripeCustomerUtil(String(customerId));
            if (!response.success) {
                throw new Error((_a = response.message) !== null && _a !== void 0 ? _a : "Unknown error"); // Ensure `message` is accessed correctly
            }
            return {
                success: true,
                customerId: response.customerId,
            };
        }
        catch (error) {
            console.error("Failed to create Stripe customer:", error);
            return {
                success: false,
                error: error.message || "Failed to create Stripe customer",
            };
        }
    });
}
/**
 * Stores integration IDs in the company_integrations table
 */
function storeIntegrationIds(companyId, integrationIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Storing integration IDs for company:", companyId, integrationIds);
            // First check if a record already exists
            const { data, error: fetchError } = yield supabase
                .from("company_integrations")
                .select("*")
                .eq("company_id", companyId)
                .maybeSingle();
            if (fetchError) {
                console.error("Error fetching existing integration record:", fetchError);
                throw fetchError;
            }
            if (data) {
                console.log("Updating existing integration record");
                // Update existing record
                const { error: updateError } = yield supabase
                    .from("company_integrations")
                    .update({
                    integration_ids: integrationIds,
                })
                    .eq("company_id", companyId);
                if (updateError) {
                    console.error("Error updating integration record:", updateError);
                    throw updateError;
                }
            }
            else {
                console.log("Creating new integration record");
                // Create new record
                const { error: insertError } = yield supabase
                    .from("company_integrations")
                    .insert({
                    company_id: companyId,
                    integration_ids: integrationIds,
                });
                if (insertError) {
                    console.error("Error inserting integration record:", insertError);
                    throw insertError;
                }
            }
            console.log("Successfully stored integration IDs");
        }
        catch (error) {
            console.error("Failed to store integration IDs:", error);
            throw error;
        }
    });
}
/**
 * Retrieves the integration IDs for a company
 */
export function getCompanyIntegrationIds(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Getting integration IDs for company:", companyId);
            const { data, error } = yield supabase
                .from("company_integrations")
                .select("integration_ids")
                .eq("company_id", companyId)
                .maybeSingle();
            if (error) {
                console.error("Error fetching integration IDs:", error);
                throw error;
            }
            // Ensure we're returning a Record<string, string> or null
            if (data === null || data === void 0 ? void 0 : data.integration_ids) {
                const typedIntegrationIds = {};
                // Convert the JSONB data to the expected type
                if (typeof data.integration_ids === "object") {
                    Object.entries(data.integration_ids).forEach(([key, value]) => {
                        if (typeof value === "string") {
                            typedIntegrationIds[key] = value;
                        }
                    });
                }
                console.log("Found integration IDs:", typedIntegrationIds);
                return typedIntegrationIds;
            }
            console.log("No integration IDs found");
            return null;
        }
        catch (error) {
            console.error("Failed to get company integration IDs:", error.message);
            return null;
        }
    });
}
export function createLocalCustomer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // ...existing code...
    });
}
