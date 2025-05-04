import React from 'react';
interface WebhookHistoryPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const WebhookHistoryPagination: React.FC<WebhookHistoryPaginationProps>;
export {};
