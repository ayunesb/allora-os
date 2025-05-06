import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
export const WebhookHistoryPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleFirstPage = () => onPageChange(1);
  const handlePrevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () =>
    onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => onPageChange(totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    // Always show first page
    items.push(1);
    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);
    // Adjust if we're at the end
    if (endPage - startPage < maxVisiblePages - 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push("ellipsis1");
    }
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push("ellipsis2");
    }
    // Always show last page if it's not the first page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    return items;
  };
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={handleFirstPage}
        disabled={!canGoPrev}
        className="h-8 w-8"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevPage}
        disabled={!canGoPrev}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 px-1">
        {getPaginationItems().map((item, index) => (
          <React.Fragment key={index}>
            {item === "ellipsis1" || item === "ellipsis2" ? (
              <div className="px-2 py-1">...</div>
            ) : (
              <Button
                variant={currentPage === item ? "default" : "outline"}
                size="sm"
                className="h-8 w-8"
                onClick={() => typeof item === "number" && onPageChange(item)}
              >
                {item}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextPage}
        disabled={!canGoNext}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleLastPage}
        disabled={!canGoNext}
        className="h-8 w-8"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
