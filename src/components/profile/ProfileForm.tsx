
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProfileForm } from '@/hooks/useProfileForm';
import { useAuthState } from '@/hooks/useAuthState';
import ProfileAvatar from './ProfileAvatar';
import PersonalInfoForm from './PersonalInfoForm';
import ApiKeysSection from './ApiKeysSection';
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
  const { 
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
  } = useProfileForm();

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
