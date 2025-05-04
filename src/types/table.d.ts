import { ReactNode } from 'react';
/**
 * Generic column definition for tables
 */
export interface Column<T> {
    key: string;
    title: string | ReactNode;
    titleRender?: () => ReactNode;
    render: (item: T) => ReactNode;
    sortable?: boolean;
    hideOnMobile?: boolean;
}
/**
 * Interface for table filters
 */
export interface TableFilters {
    search?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    status?: string;
    dateRange?: {
        from: Date | null;
        to: Date | null;
    };
    [key: string]: any;
}
/**
 * Interface for pagination state
 */
export interface PaginationState {
    page: number;
    perPage: number;
    total: number;
}
/**
 * Interface for table component props
 */
export interface ResponsiveTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
    pagination?: PaginationState;
    onPageChange?: (page: number) => void;
    keyField?: string;
    className?: string;
}
/**
 * Interface for mobile card view of table data
 */
export interface MobileCardProps<T> {
    item: T;
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    keyField?: string;
}
