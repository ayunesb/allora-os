import React from "react";
interface Column<T> {
  key: string;
  title: string;
  hideOnMobile?: boolean;
  render?: (item: T) => React.ReactNode;
}
interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  mobileColumns?: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}
export declare function ResponsiveTable<T>({
  data,
  columns,
  mobileColumns,
  actions,
  emptyState,
  className,
}: ResponsiveTableProps<T>): JSX.Element;
export {};
