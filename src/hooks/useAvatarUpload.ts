
import { useState } from 'react';
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

export function useAvatarUpload() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Uploads avatar to Supabase storage and updates the user profile
   */
  const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
    if (!userId || !file) return null;
    
    setIsUploading(true);
    
    try {
      // Generate a unique file path
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${userId}-${Date.now()}.${fileExt}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      // Update the avatar URL state
      setAvatarUrl(publicUrl);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    avatarUrl,
    setAvatarUrl,
    avatarFile,
    setAvatarFile,
    isUploading,
    uploadAvatar
  };
}
