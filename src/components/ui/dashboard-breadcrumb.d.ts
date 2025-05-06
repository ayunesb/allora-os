import React from "react";
export interface DashboardBreadcrumbProps {
  rootPath: string;
  rootLabel: string;
  rootIcon?: React.ReactNode;
  currentPath?: string;
  currentLabel?: string;
}
export declare function DashboardBreadcrumb({
  rootPath,
  rootLabel,
  rootIcon,
  currentPath,
  currentLabel,
}: DashboardBreadcrumbProps): JSX.Element;
