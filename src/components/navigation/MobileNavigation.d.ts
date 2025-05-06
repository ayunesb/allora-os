import React from "react";
interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: Array<{
    name: string;
    href: string;
    icon: React.FC<{
      className?: string;
    }>;
  }>;
  onSignOut: () => void;
  isSigningOut: boolean;
  userName?: string;
  userEmail?: string;
}
declare const MobileNavigation: React.FC<MobileNavigationProps>;
export default MobileNavigation;
