/**
 * Generates a video using the Heygen API with retry capability
 */
export declare function generateVideo(text: string, avatarId: string, voiceId: string, companyName: string, campaignId?: string, strategyId?: string, retryCount?: number): Promise<{
    success: boolean;
    videoId: any;
    status: any;
    dbRecordId: any;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    videoId?: undefined;
    status?: undefined;
    dbRecordId?: undefined;
}>;
export declare function getVideoStatus(videoId: string, retryCount?: number): Promise<{
    success: boolean;
    status: any;
    videoUrl: any;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    status?: undefined;
    videoUrl?: undefined;
}>;
/**
 * Polls the video status until it's completed or fails
 */
export declare function pollVideoStatus(videoId: string, onStatusChange?: (status: string, url?: string) => void): Promise<void>;
export declare function listHeygenAvatars(): Promise<any>;
export declare function listHeygenVoices(): Promise<any>;
