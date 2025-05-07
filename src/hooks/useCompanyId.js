var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
export function useCompanyId() {
    const [companyId, setCompanyId] = useState(undefined);
    const { user } = useAuth();
    useEffect(() => {
        const fetchCompanyId = () => __awaiter(this, void 0, void 0, function* () {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return;
            try {
                // First check if the user has a profile with tenant_id
                const { data: profile, error: profileError } = yield supabase
                    .from("profiles")
                    .select("tenant_id")
                    .eq("id", user.id)
                    .maybeSingle();
                if (profileError) {
                    console.error("Error fetching profile:", profileError);
                    return;
                }
                if (profile === null || profile === void 0 ? void 0 : profile.tenant_id) {
                    setCompanyId(profile.tenant_id);
                    return;
                }
                // If no tenant_id in profile, check tenant_users table
                const { data: tenantUser, error: tenantError } = yield supabase
                    .from("tenant_users")
                    .select("tenant_id")
                    .eq("user_id", user.id)
                    .maybeSingle();
                if (tenantError) {
                    console.error("Error fetching tenant user:", tenantError);
                    return;
                }
                if (tenantUser === null || tenantUser === void 0 ? void 0 : tenantUser.tenant_id) {
                    setCompanyId(tenantUser.tenant_id);
                    return;
                }
            }
            catch (error) {
                console.error("Error in useCompanyId:", error);
            }
        });
        fetchCompanyId();
    }, [user === null || user === void 0 ? void 0 : user.id]);
    return companyId;
}
export default useCompanyId;
