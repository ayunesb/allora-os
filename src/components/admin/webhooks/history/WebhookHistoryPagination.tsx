
import React from 'react';
import Pagination from '@/components/ui/pagination';

interface WebhookHistoryPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const WebhookHistoryPagination: React.FC<WebhookHistoryPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};
