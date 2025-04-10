import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useBreakpoint } from "@/hooks/use-mobile";
import { MobileAdminTable } from "@/components/admin/MobileAdminTable";

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

export function ResponsiveTable<T>({ 
  data, 
  columns, 
  mobileColumns, 
  actions,
  emptyState,
  className 
}: ResponsiveTableProps<T>) {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  // If mobile view and mobileColumns are provided, use the mobile table
  if (isMobileView) {
    const columnsToUse = mobileColumns || columns.filter(col => !col.hideOnMobile);
    
    const defaultEmptyState = (
      <div className="text-center py-8 bg-muted/20 rounded-md">
        No data to display
      </div>
    );
    
    return (
      <MobileAdminTable 
        data={data} 
        columns={columnsToUse} 
        actions={actions}
        emptyState={emptyState || defaultEmptyState}
        className={className}
      />
    );
  }
  
  // Otherwise use the standard table
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.key}
                className={column.hideOnMobile ? "hidden md:table-cell" : undefined}
              >
                {column.title}
              </TableHead>
            ))}
            {actions && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell 
                    key={column.key}
                    className={column.hideOnMobile ? "hidden md:table-cell" : undefined}
                  >
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="text-right">
                    {actions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                {emptyState || "No data available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
