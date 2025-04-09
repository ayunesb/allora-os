
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { updateUserProfile } from '@/utils/profileHelpers';
import { ApiKeys, ProfileFormData } from '@/components/profile/ProfileForm';

export function useProfileForm() {
  const { user, profile } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [personalApiKeys, setPersonalApiKeys] = useState<ApiKeys>({
    stripe: '',
    twilio_sid: '',
    twilio_token: '',
    heygen: ''
  });
  
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      phone: '',
      location: '',
      website: '',
      bio: '',
      stripe_key: '',
      twilio_sid: '',
      twilio_token: '',
      heygen_key: ''
    }
  });

  // Load profile data
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        email: user?.email || '',
        company: profile.company || '',
        role: profile.role || '',
        phone: profile.phone || '',
        location: profile.location || '',
        website: profile.website || '',
        bio: profile.bio || ''
      });
      
      // Load avatar if exists
      if (profile.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
      
      // Load personal API keys if they exist
      if (profile.personal_api_keys) {
        const keys = typeof profile.personal_api_keys === 'string' 
          ? JSON.parse(profile.personal_api_keys) 
          : profile.personal_api_keys;
        
        setPersonalApiKeys({
          stripe: keys.stripe || '',
          twilio_sid: keys.twilio_sid || '',
          twilio_token: keys.twilio_token || '',
          heygen: keys.heygen || ''
        });
      }
    }
  }, [profile, user, reset]);

  const uploadAvatar = async (userId: string, file: File) => {
    const { supabase } = await import('@/backend/supabase');
    
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
      
    // Update profile with avatar URL
    const { error: avatarError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);
      
    if (avatarError) throw avatarError;
    
    setAvatarUrl(publicUrl);
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Update profile data including personal API keys
      const success = await updateUserProfile(user.id, {
        name: data.name,
        company: data.company,
        role: data.role as 'admin' | 'user',
        phone: data.phone,
        location: data.location,
        website: data.website,
        bio: data.bio,
        personal_api_keys: {
          stripe: personalApiKeys.stripe,
          twilio_sid: personalApiKeys.twilio_sid,
          twilio_token: personalApiKeys.twilio_token,
          heygen: personalApiKeys.heygen
        }
      });
      
      if (!success) throw new Error("Failed to update profile");
      
      // Upload avatar if selected
      if (avatarFile) {
        await uploadAvatar(user.id, avatarFile);
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyChange = (key: keyof ApiKeys, value: string) => {
    setPersonalApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    isLoading,
    isDirty,
    errors,
    avatarUrl,
    setAvatarUrl,
    avatarFile,
    setAvatarFile,
    personalApiKeys, 
    handleApiKeyChange,
    register,
    handleSubmit,
    reset,
    onSubmit
  };
}
