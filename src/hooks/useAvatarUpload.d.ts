export declare function useAvatarUpload(): {
    avatarUrl: string;
    setAvatarUrl: import("react").Dispatch<import("react").SetStateAction<string>>;
    avatarFile: File;
    setAvatarFile: import("react").Dispatch<import("react").SetStateAction<File>>;
    isUploading: boolean;
    uploadAvatar: (userId: string, file: File) => Promise<string | null>;
};
