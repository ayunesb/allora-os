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
export const saveSecuritySettings = (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings, }) {
    try {
        const { data, error } = yield supabase.rpc("update_security_settings", {
            p_settings: settings,
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error("Error saving security settings:", error.message);
        throw new Error(error.message || "Failed to save security settings");
    }
});
export const fetchSecuritySettings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase.rpc("get_security_settings");
        if (error)
            throw error;
        return (data || {
            twoFactorEnabled: false,
            extendedSessionTimeout: false,
            strictContentSecurity: false,
            enhancedApiProtection: false,
        });
    }
    catch (error) {
        console.error("Error fetching security settings:", error.message);
        throw new Error("Failed to load security settings");
    }
});
