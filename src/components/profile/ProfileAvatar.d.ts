import React from "react";
interface ProfileAvatarProps {
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
  avatarFile: File | null;
  setAvatarFile: (file: File | null) => void;
  profileName?: string;
  userEmail?: string;
}
declare const ProfileAvatar: React.FC<ProfileAvatarProps>;
export default ProfileAvatar;
