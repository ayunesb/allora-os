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
import { toast } from "sonner";
import { handleApiError } from "@/utils/api/errorHandling";
/**
 * Initiate Meta auth flow
 */
export function initiateMetaAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("meta-auth", {
                body: { action: "authorize" },
            });
            if (error)
                throw error;
            if (data.url) {
                window.location.href = data.url;
                return { success: true };
            }
            else {
                throw new Error("Failed to get authorization URL");
            }
        }
        catch (error) {
            handleApiError(error, {
                customMessage: "Meta authorization failed",
                showToast: true,
            });
            return { success: false, error: error.message };
        }
    });
}
/**
 * Initiate TikTok auth flow
 */
export function initiateTikTokAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("tiktok-auth", {
                body: { action: "authorize" },
            });
            if (error) {
                throw error;
            }
            if (data === null || data === void 0 ? void 0 : data.url) {
                window.location.href = data.url;
                return { success: true };
            }
            else {
                console.error("TikTok auth response:", data);
                throw new Error("Failed to get TikTok authorization URL");
            }
        }
        catch (error) {
            console.error("TikTok auth error:", error);
            toast.error(`TikTok authorization failed: ${error.message || "Unknown error"}`);
            return { success: false, error: error.message };
        }
    });
}
/**
 * Get all ad platform connections for the company
 */
export function getAdPlatformConnections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("ad_platform_connections")
                .select("*")
                .eq("is_active", true)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error("Error fetching ad platform connections:", error);
            return [];
        }
    });
}
/**
 * Disconnect an ad platform
 */
export function disconnectAdPlatform(platform) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const endpoint = platform === "meta" ? "meta-auth" : "tiktok-auth";
            const { data, error } = yield supabase.functions.invoke(endpoint, {
                body: { action: "revoke" },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success(`${platform === "meta" ? "Meta" : "TikTok"} account disconnected successfully`);
                return { success: true };
            }
            else {
                throw new Error(data.error || "Failed to disconnect account");
            }
        }
        catch (error) {
            handleApiError(error, {
                customMessage: `Failed to disconnect ${platform} account`,
                showToast: true,
            });
            return { success: false, error: error.message };
        }
    });
}
