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
 * Generates an AI video using Heygen API with company metadata
 * @param text The text content for the video
 * @param avatarId The Heygen avatar ID to use
 * @param voiceId The Heygen voice ID to use
 * @param companyName The company name for tracking
 * @param campaignId Optional campaign ID to associate the video with
 * @param strategyId Optional strategy ID to associate the video with
 * @returns A promise with the result of the operation
 */
export const generateVideo = (text, avatarId, voiceId, companyName, campaignId, strategyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to generate video");
        }
        // Call the Heygen edge function
        const { data, error } = yield supabase.functions.invoke("heygen", {
            body: {
                action: "generate-video",
                text,
                avatarId,
                voiceId,
                campaignId,
                strategyId,
                companyName, // Add company metadata
            },
        });
        if (error) {
            console.error("Error generating video:", error);
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: true,
            videoId: data.videoId,
            status: data.status,
            dbRecordId: data.dbRecordId,
        };
    }
    catch (error) {
        console.error("Failed to generate video:", error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error generating video",
        };
    }
});
/**
 * Checks the status of a generated video
 * @param videoId The Heygen video ID to check
 * @returns A promise with the status information
 */
export const getVideoStatus = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the Heygen edge function
        const { data, error } = yield supabase.functions.invoke("heygen", {
            body: {
                action: "get-video-status",
                text: videoId, // The parameter is named 'text' in the edge function
            },
        });
        if (error) {
            console.error("Error checking video status:", error);
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: true,
            status: data.status,
            videoUrl: data.videoUrl,
        };
    }
    catch (error) {
        console.error("Failed to check video status:", error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error checking video status",
        };
    }
});
/**
 * Lists available avatars from Heygen
 * @returns A promise with the list of avatars
 */
export const listAvatars = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the Heygen edge function
        const { data, error } = yield supabase.functions.invoke("heygen", {
            body: {
                action: "list-avatars",
            },
        });
        if (error) {
            console.error("Error listing avatars:", error);
            throw error;
        }
        return data.avatars || [];
    }
    catch (error) {
        console.error("Failed to list avatars:", error);
        return [];
    }
});
/**
 * Lists available voices from Heygen
 * @returns A promise with the list of voices
 */
export const listVoices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the Heygen edge function
        const { data, error } = yield supabase.functions.invoke("heygen", {
            body: {
                action: "list-voices",
            },
        });
        if (error) {
            console.error("Error listing voices:", error);
            throw error;
        }
        return data.voices || [];
    }
    catch (error) {
        console.error("Failed to list voices:", error);
        return [];
    }
});
