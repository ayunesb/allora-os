export declare function useDashboardNavigation(): {
  user: import("../types").User;
  isLoading: boolean;
  navItems: {
    label: string;
    path: string;
  }[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: import("react").Dispatch<
    import("react").SetStateAction<boolean>
  >;
  needsSessionRefresh: () => boolean;
  handleRefreshSession: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleNavigateToProfile: () => void;
};
