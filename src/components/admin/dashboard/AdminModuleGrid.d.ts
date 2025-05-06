import React from "react";
export interface AdminModule {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count?: string;
  highlight?: boolean;
}
interface AdminModuleGridProps {
  modules?: AdminModule[];
  isLoading?: boolean;
}
export declare function AdminModuleGrid({
  modules,
  isLoading,
}?: AdminModuleGridProps): JSX.Element;
export {};
