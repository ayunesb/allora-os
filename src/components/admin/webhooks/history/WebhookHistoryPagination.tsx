
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 ? handlePageChange(currentPage - 1) : undefined}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => {
            const distance = Math.abs(page - currentPage);
            return distance === 0 || distance === 1 || page === 1 || page === totalPages;
          })
          .map((page, index, array) => {
            // Show ellipsis for skipped pages
            const prevPage = array[index - 1];
            const showEllipsis = prevPage && page - prevPage > 1;
            
            return (
              <React.Fragment key={page}>
                {showEllipsis && (
                  <PaginationItem>
                    <span className="flex h-9 w-9 items-center justify-center">...</span>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages ? handlePageChange(currentPage + 1) : undefined}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
