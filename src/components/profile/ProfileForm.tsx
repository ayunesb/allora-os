
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from '@/hooks/useAuthState';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { updateUserProfile } from '@/utils/profileHelpers';
import ProfileAvatar from './ProfileAvatar';
import PersonalInfoForm from './PersonalInfoForm';
import ApiKeysSection from './ApiKeysSection';
import DangerZone from './DangerZone';
import ProfileFormFooter from './ProfileFormFooter';

export type ProfileFormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  stripe_key: string;
  twilio_sid: string;
  twilio_token: string;
  heygen_key: string;
}

export type ApiKeys = {
  stripe: string;
  twilio_sid: string;
  twilio_token: string;
  heygen: string;
}

const ProfileForm: React.FC = () => {
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

  const handleApiKeyChange = (key: keyof ApiKeys, value: string) => {
    setPersonalApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information and avatar
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <ProfileAvatar 
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            avatarFile={avatarFile}
            setAvatarFile={setAvatarFile}
            profileName={profile?.name}
            userEmail={user?.email}
          />
          
          <Separator />
          
          {/* Personal Information */}
          <PersonalInfoForm 
            register={register} 
            errors={errors} 
            userCreatedAt={user?.created_at}
          />

          <Separator />
          
          {/* Personal API Keys Section */}
          <ApiKeysSection 
            personalApiKeys={personalApiKeys}
            handleApiKeyChange={handleApiKeyChange}
          />
        </CardContent>
        <ProfileFormFooter 
          isLoading={isLoading} 
          isDirty={isDirty} 
          avatarFile={avatarFile}
          onReset={() => reset()}
        />
      </form>
    </Card>
  );
};

export default ProfileForm;
