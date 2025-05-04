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
export declare const generateVideo: (text: string, avatarId: string, voiceId: string, companyName: string, campaignId?: string, strategyId?: string) => Promise<{
    success: boolean;
    videoId?: string;
    status?: string;
    dbRecordId?: string;
    message?: string;
}>;
/**
 * Checks the status of a generated video
 * @param videoId The Heygen video ID to check
 * @returns A promise with the status information
 */
export declare const getVideoStatus: (videoId: string) => Promise<{
    success: boolean;
    status?: string;
    videoUrl?: string;
    message?: string;
}>;
/**
 * Lists available avatars from Heygen
 * @returns A promise with the list of avatars
 */
export declare const listAvatars: () => Promise<any>;
/**
 * Lists available voices from Heygen
 * @returns A promise with the list of voices
 */
export declare const listVoices: () => Promise<any>;
