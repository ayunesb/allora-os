import React from "react";
interface UserMenuProps {
  avatarUrl?: string;
  name?: string;
  email?: string;
  onSignOut: () => void;
  isSigningOut: boolean;
  hasActiveSubscription: boolean;
}
declare const UserMenu: React.FC<UserMenuProps>;
export default UserMenu;
