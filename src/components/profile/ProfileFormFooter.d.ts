import React from "react";
interface ProfileFormFooterProps {
  isLoading: boolean;
  isDirty: boolean;
  avatarFile: File | null;
  onReset: () => void;
}
declare const ProfileFormFooter: React.FC<ProfileFormFooterProps>;
export default ProfileFormFooter;
