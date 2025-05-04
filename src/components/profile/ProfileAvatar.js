import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
const ProfileAvatar = ({ avatarUrl, setAvatarUrl, avatarFile, setAvatarFile, profileName, userEmail }) => {
    const handleAvatarChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        setAvatarFile(file);
        // Create a preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (<div className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || ''}/>
        <AvatarFallback className="text-2xl">
          {profileName?.charAt(0) || userEmail?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-medium">Profile Picture</h3>
        <p className="text-sm text-muted-foreground">
          Upload a profile picture to personalize your account
        </p>
        <div className="flex items-center gap-2">
          <Label htmlFor="avatar" className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors">
            <Upload className="h-4 w-4"/>
            <span>Upload</span>
          </Label>
          <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden"/>
          {avatarUrl && (<Button type="button" variant="outline" onClick={() => {
                setAvatarUrl(null);
                setAvatarFile(null);
            }}>
              Remove
            </Button>)}
        </div>
      </div>
    </div>);
};
export default ProfileAvatar;
