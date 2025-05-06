import React from "react";
interface MobileAdminTableProps {
  data: any[];
  columns: {
    key: string;
    title: string;
    render?: (item: any) => React.ReactNode;
  }[];
  actions?: (item: any) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}
export declare function MobileAdminTable({
  data,
  columns,
  actions,
  emptyState,
  className,
}: MobileAdminTableProps): JSX.Element;
export {};
