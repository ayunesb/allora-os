
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from '@/backend/supabase';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  User, 
  AtSign, 
  Building, 
  Briefcase, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar, 
  Upload,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { updateUserProfile } from '@/utils/profileHelpers';
import APIKeyInput from '@/components/admin/APIKeyInput';

interface ProfileFormData {
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

const ProfileForm: React.FC = () => {
  const { user, profile } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showApiSection, setShowApiSection] = useState(false);
  const [personalApiKeys, setPersonalApiKeys] = useState({
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
        // Generate a unique file path
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;
        
        // Upload the file
        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(filePath, avatarFile, {
            upsert: true,
            contentType: avatarFile.type
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
          .eq('id', user.id);
          
        if (avatarError) throw avatarError;
        
        setAvatarUrl(publicUrl);
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setAvatarFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApiKeyChange = (key: keyof typeof personalApiKeys, value: string) => {
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
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || ''} />
              <AvatarFallback className="text-2xl">
                {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a profile picture to personalize your account
              </p>
              <div className="flex items-center gap-2">
                <Label 
                  htmlFor="avatar" 
                  className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </Label>
                <Input 
                  id="avatar" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  className="hidden" 
                />
                {avatarUrl && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setAvatarUrl(null);
                      setAvatarFile(null);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <AtSign className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  disabled
                  {...register('email')}
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  {...register('company')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Title
                </Label>
                <Input
                  id="role"
                  placeholder="Your job title"
                  {...register('role')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  {...register('phone')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  {...register('location')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  {...register('website')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="joinDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined
                </Label>
                <Input
                  id="joinDate"
                  value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us a bit about yourself"
              {...register('bio')}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This will be displayed on your public profile
            </p>
          </div>

          <Separator />
          
          {/* Personal API Keys Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Key className="h-5 w-5" />
                Personal API Keys
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowApiSection(!showApiSection)}
              >
                {showApiSection ? 'Hide' : 'Show'} API Keys
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Add your personal API keys to use instead of company-wide keys.
              These keys will override company keys for your account only.
            </p>
            
            {showApiSection && (
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <APIKeyInput
                  id="stripe-key"
                  label="Stripe API Key"
                  value={personalApiKeys.stripe}
                  onChange={(value) => handleApiKeyChange('stripe', value)}
                  placeholder="Enter your Stripe API key"
                />
                
                <APIKeyInput
                  id="twilio-sid"
                  label="Twilio SID"
                  value={personalApiKeys.twilio_sid}
                  onChange={(value) => handleApiKeyChange('twilio_sid', value)}
                  placeholder="Enter your Twilio SID"
                />
                
                <APIKeyInput
                  id="twilio-token"
                  label="Twilio Auth Token"
                  value={personalApiKeys.twilio_token}
                  onChange={(value) => handleApiKeyChange('twilio_token', value)}
                  placeholder="Enter your Twilio auth token"
                />
                
                <APIKeyInput
                  id="heygen-key"
                  label="HeyGen API Key"
                  value={personalApiKeys.heygen}
                  onChange={(value) => handleApiKeyChange('heygen', value)}
                  placeholder="Enter your HeyGen API key"
                />
                
                <p className="text-xs text-muted-foreground mt-2">
                  These keys are stored securely and used only for your account.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => reset()}
            disabled={isLoading || !isDirty}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || (!isDirty && !avatarFile)}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
