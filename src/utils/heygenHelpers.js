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
// Maximum number of retries for API calls
const MAX_RETRIES = 3;
/**
 * Generates a video using the Heygen API with retry capability
 */
export function generateVideo(text_1, avatarId_1, voiceId_1, companyName_1, campaignId_1, strategyId_1) {
    return __awaiter(this, arguments, void 0, function* (text, avatarId, voiceId, companyName, campaignId, strategyId, retryCount = 0) {
        try {
            const { data, error } = yield supabase.functions.invoke("heygen", {
                body: {
                    action: "generate-video",
                    text,
                    avatarId,
                    voiceId,
                    campaignId,
                    strategyId,
                    companyName,
                },
            });
            if (error)
                throw error;
            if (data && data.videoId) {
                return {
                    success: true,
                    videoId: data.videoId,
                    status: data.status || "processing",
                    dbRecordId: data.dbRecordId,
                };
            }
            else {
                throw new Error((data === null || data === void 0 ? void 0 : data.error) || "Failed to generate video");
            }
            return { data, error }; // Ensure return in try block
        }
        catch (error) {
            console.error(`Video generation error (attempt ${retryCount + 1}):`, error.message);
            // Implement retry logic for transient errors
            if (retryCount < MAX_RETRIES) {
                // Exponential backoff: wait longer between each retry
                yield new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
                return generateVideo(text, avatarId, voiceId, companyName, campaignId, strategyId, retryCount + 1);
            }
            return {
                success: false,
                error: error.message,
            };
        }
    });
}
export function getVideoStatus(videoId_1) {
    return __awaiter(this, arguments, void 0, function* (videoId, retryCount = 0) {
        try {
            const { data, error } = yield supabase.functions.invoke("heygen", {
                body: { action: "get-video-status", text: videoId },
            });
            if (error)
                throw error;
            if (data) {
                return {
                    success: true,
                    status: data.status,
                    videoUrl: data.videoUrl,
                };
            }
            else {
                throw new Error("Failed to get video status");
            }
        }
        catch (error) {
            console.error(`Video status error (attempt ${retryCount + 1}):`, error.message);
            // Implement retry logic for transient errors
            if (retryCount < MAX_RETRIES) {
                // Only retry for network errors, not for application errors
                if (error.message.includes("network") ||
                    error.message.includes("timeout")) {
                    // Exponential backoff: wait longer between each retry
                    yield new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
                    return getVideoStatus(videoId, retryCount + 1);
                }
            }
            return {
                success: false,
                error: error.message,
            };
        }
    });
}
/**
 * Polls the video status until it's completed or fails
 */
export function pollVideoStatus(videoId, onStatusChange) {
    return __awaiter(this, void 0, void 0, function* () {
        let attempts = 0;
        const maxAttempts = 60; // Poll for up to 5 minutes (assuming 5s interval)
        const poll = () => __awaiter(this, void 0, void 0, function* () {
            if (attempts >= maxAttempts) {
                onStatusChange === null || onStatusChange === void 0 ? void 0 : onStatusChange("timeout", undefined);
                return;
            }
            attempts++;
            const result = yield getVideoStatus(videoId);
            if (!result.success) {
                // If there was an error, wait a bit longer before retrying
                onStatusChange === null || onStatusChange === void 0 ? void 0 : onStatusChange("error", undefined);
                setTimeout(poll, 10000); // 10 seconds
                return;
            }
            onStatusChange === null || onStatusChange === void 0 ? void 0 : onStatusChange(result.status || "unknown", result.videoUrl);
            if (result.status === "completed") {
                return;
            }
            // Continue polling
            setTimeout(poll, 5000); // 5 seconds
        });
        // Start polling
        yield poll();
    });
}
export function listHeygenAvatars() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("heygen", {
                body: { action: "list-avatars" },
            });
            if (error)
                throw error;
            if (data) {
                return data.avatars || [];
            }
            else {
                throw new Error("Failed to list avatars");
            }
        }
        catch (error) {
            console.error(`Error listing avatars:`, error.message);
            return [];
        }
    });
}
export function listHeygenVoices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("heygen", {
                body: { action: "list-voices" },
            });
            if (error)
                throw error;
            if (data) {
                return data.voices || [];
            }
            else {
                throw new Error("Failed to list voices");
            }
        }
        catch (error) {
            console.error(`Error listing voices:`, error.message);
            return [];
        }
    });
}
