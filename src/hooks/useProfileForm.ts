
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { updateUserProfile } from '@/utils/profileHelpers';
import { ApiKeys, ProfileFormData } from '@/components/profile/ProfileForm';
import { useAvatarUpload } from './useAvatarUpload';

export function useProfileForm() {
  const { user, profile, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [personalApiKeys, setPersonalApiKeys] = useState<ApiKeys>({
    stripe: '',
    twilio_sid: '',
    twilio_token: '',
    heygen: ''
  });
  
  // Use the avatar upload hook
  const { 
    avatarUrl, 
    setAvatarUrl, 
    avatarFile, 
    setAvatarFile, 
    uploadAvatar 
  } = useAvatarUpload();
  
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
    console.log("useProfileForm - Loading profile data:", profile);
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
        try {
          const keys = typeof profile.personal_api_keys === 'string' 
            ? JSON.parse(profile.personal_api_keys) 
            : profile.personal_api_keys;
          
          setPersonalApiKeys({
            stripe: keys.stripe || '',
            twilio_sid: keys.twilio_sid || '',
            twilio_token: keys.twilio_token || '',
            heygen: keys.heygen || ''
          });
        } catch (error) {
          console.error('Error parsing personal API keys:', error);
          // Set default empty values if parsing fails
          setPersonalApiKeys({
            stripe: '',
            twilio_sid: '',
            twilio_token: '',
            heygen: ''
          });
        }
      }
    }
  }, [profile, user, reset, setAvatarUrl]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      console.log("Updating profile with data:", data);
      
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
        const uploadedAvatarUrl = await uploadAvatar(user.id, avatarFile);
        
        if (uploadedAvatarUrl) {
          // Update the avatar URL in the database
          await updateUserProfile(user.id, {
            avatar_url: uploadedAvatarUrl
          });
        }
      }
      
      // Refresh profile data after update
      await refreshProfile();
      
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
