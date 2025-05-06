var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
/**
 * Check if the current tenant is the demo tenant
 * @param tenantId The tenant ID to check
 */
export function isDemoTenant(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!tenantId)
            return false;
        const demoTenantId = import.meta.env.VITE_DEMO_TENANT_ID;
        if (demoTenantId && tenantId === demoTenantId) {
            return true;
        }
        try {
            // Additional check against database if needed
            const { data, error } = yield supabase
                .from("tenant_profiles")
                .select("settings")
                .eq("id", tenantId)
                .single();
            if (error)
                throw error;
            return ((_a = data === null || data === void 0 ? void 0 : data.settings) === null || _a === void 0 ? void 0 : _a.is_demo) === true;
        }
        catch (error) {
            console.error("Error checking demo tenant status:", error);
            return false;
        }
    });
}
/**
 * Reset the demo tenant to its initial state
 * @param tenantId The tenant ID to reset
 */
export function resetDemoTenant(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tenantId)
            return false;
        try {
            // Check if this is actually a demo tenant first
            const isDemo = yield isDemoTenant(tenantId);
            if (!isDemo) {
                console.error("Cannot reset non-demo tenant");
                return false;
            }
            // Call the edge function to reset the demo tenant
            const { data, error } = yield supabase.functions.invoke("reset-demo-tenant", {
                body: { tenant_id: tenantId },
            });
            if (error)
                throw error;
            return (data === null || data === void 0 ? void 0 : data.success) === true;
        }
        catch (error) {
            console.error("Error resetting demo tenant:", error);
            return false;
        }
    });
}
