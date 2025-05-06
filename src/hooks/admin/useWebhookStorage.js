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
 * Custom hook for persisting webhook settings to Supabase
 */
export function useWebhookStorage() {
    /**
     * Save webhook settings to database
     */
    const saveWebhookSettings = (settings) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("system_settings").upsert({
                key: "webhook_settings",
                value: settings,
                updated_at: new Date().toISOString(),
            }, { onConflict: "key" });
            if (error) {
                console.error("Error saving webhook settings:", error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Exception saving webhook settings:", error);
            return false;
        }
    });
    /**
     * Load webhook settings from database
     */
    const loadWebhookSettings = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("system_settings")
                .select("value")
                .eq("key", "webhook_settings")
                .single();
            if (error) {
                if (error.code !== "PGRST116") {
                    // Not found error code
                    console.error("Error loading webhook settings:", error);
                }
                return null;
            }
            return (data === null || data === void 0 ? void 0 : data.value) || null;
        }
        catch (error) {
            console.error("Exception loading webhook settings:", error);
            return null;
        }
    });
    return {
        saveWebhookSettings,
        loadWebhookSettings,
    };
}
