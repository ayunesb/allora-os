export interface SocialPost {
    id: string;
    title: string;
    content: string;
    platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | string;
    status: 'draft' | 'scheduled' | 'published' | string;
    scheduled_date?: string;
    published_date?: string;
    media_urls?: string[];
    author_id?: string;
    created_at: string;
    updated_at: string;
}
export declare function usePostOperations(): {
    isLoading: boolean;
    error: string;
    createPost: (postData: Omit<SocialPost, "id" | "created_at" | "updated_at">) => Promise<SocialPost>;
    updatePost: (id: string, postData: Partial<SocialPost>) => Promise<SocialPost>;
    deletePost: (id: string) => Promise<void>;
    uploadMedia: (file: File) => Promise<string>;
    schedulePost: (id: string, scheduledDate: string) => Promise<SocialPost>;
    publishPost: (id: string) => Promise<SocialPost>;
    getPresignedUrl: (filename: string, contentType: string) => Promise<string>;
};
