var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
export function useAvatarUpload() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    /**
     * Uploads avatar to Supabase storage and updates the user profile
     */
    const uploadAvatar = (userId, file) => __awaiter(this, void 0, void 0, function* () {
        if (!userId || !file)
            return null;
        setIsUploading(true);
        try {
            // Generate a unique file path
            const fileExt = file.name.split(".").pop();
            const filePath = `avatars/${userId}-${Date.now()}.${fileExt}`;
            // Upload the file
            const { error: uploadError } = yield supabase.storage
                .from("profiles")
                .upload(filePath, file, {
                upsert: true,
                contentType: file.type,
            });
            if (uploadError)
                throw uploadError;
            // Get the public URL
            const { data: { publicUrl }, } = supabase.storage.from("profiles").getPublicUrl(filePath);
            // Update the avatar URL state
            setAvatarUrl(publicUrl);
            return publicUrl;
        }
        catch (error) {
            console.error("Error uploading avatar:", error);
            toast.error("Failed to upload avatar");
            return null;
        }
        finally {
            setIsUploading(false);
        }
    });
    return {
        avatarUrl,
        setAvatarUrl,
        avatarFile,
        setAvatarFile,
        isUploading,
        uploadAvatar,
    };
}
